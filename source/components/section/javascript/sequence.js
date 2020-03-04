/*eslint max-lines-per-function: */

// import { body, html } from '@utilities/dom-elements'
// import Events from '@utilities/events'
// import RafThrottle from '@utilities/raf-throttle'
import ScreenDimensions from '@utilities/screen-dimensions'

let MAX_IMAGE_LOAD = ScreenDimensions.isTabletPortraitAndBigger ? 200 : 100
//const VISIBILITY_STATE = detectHiddenVisibilityProps()

class Sequence {
  constructor({ path, length, filetype, startFrame }) {
    this.path = path
    this.filetype = filetype

    this.sequenceLength = length
    this.sequenceStart = 1
    this.sequenceEnd = this.sequenceLength

    // Set startframe to load the sequence frm
    this.currentFrame = startFrame || 0

    this.prevFramesLoaded = this.currentFrame
    this.nextFramesLoaded = this.currentFrame
  }

  getFrame(scrollPercentage) {
    this.previousFrame = this.currentFrame
    this.currentFrame = Math.round((scrollPercentage * this.sequenceLength) / 100)

    this.checkLoadedFrames()

    if (this.currentFrame !== this.previousFrame || this.firstLoad) {
      return this.frames[this.currentFrame]
    }
  }

  addLeadingZeros(n) {
    // const length = this.sequenceEnd.toString().length;
    const length = 4
    const str = (n > 0 ? n : -n) + ''
    let zeros = ''
    for (let i = length - str.length; i > 0; i--) {
      zeros += '0'
    }
    zeros += str
    return n >= 0 ? zeros : '-' + zeros
  }

  checkLoadedFrames() {
    if (
      this.currentFrame > this.previousFrame &&
      this.currentFrame + MAX_IMAGE_LOAD > this.nextFramesLoaded
    ) {
      this.load()
    }

    if (
      this.currentFrame < this.previousFrame &&
      this.currentFrame - MAX_IMAGE_LOAD < this.prevFramesLoaded
    ) {
      this.load(1)
    }
  }

  load(prev) {
    const currentFrame = this.nextFramesLoaded
    let nextFrames = this.nextFramesLoaded + MAX_IMAGE_LOAD
    if (nextFrames > this.sequenceEnd) nextFrames = this.sequenceEnd

    let prevFrames = this.prevFramesLoaded - MAX_IMAGE_LOAD
    if (prevFrames < this.sequenceStart) prevFrames = this.sequenceStart

    let promises = []

    if (prev || this.firstLoad) {
      for (let i = currentFrame; i >= prevFrames; i--) {
        const frameNumber = this.addLeadingZeros(i)
        if (!this.sequence[frameNumber]) {
          const filename = this.sequencePath + frameNumber + this.fileType

          const img = new Image()
          img.src = filename

          const promise = new Promise((resolve, reject) => {
            img.onload = resolve
            img.onerror = reject
            this.prevFramesLoaded--
          })

          promises.push(promise)

          this.frames[frameNumber] = img
        }
      }
    }

    if (!prev || this.firstLoad) {
      for (let i = currentFrame; i <= nextFrames; i++) {
        const frameNumber = this.addLeadingZeros(i)
        if (!this.frames[frameNumber]) {
          const filename = this.sequencePath + frameNumber + this.fileType

          const img = new Image()
          img.src = filename

          const promise = new Promise((resolve, reject) => {
            img.onload = resolve
            img.onerror = reject
            this.nextFramesLoaded++
          })

          promises.push(promise)

          this.frames[frameNumber] = img
        }
      }
    }

    if (ScreenDimensions.isTabletLandscapeAndBigger && this.firstLoad)
      MAX_IMAGE_LOAD = this.sequenceEnd

    Promise.all(promises)
      .then(() => {
        this.renderFrame()
        if (this.firstLoad) this.loadCallback()
        this.firstLoad = false
      })
      .catch(e => {
        console.log(e)
      })
  }
}

export default Sequence

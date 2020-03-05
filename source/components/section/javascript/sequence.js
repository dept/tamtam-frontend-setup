/*eslint max-lines-per-function: */
import Events from '@utilities/events'
import RafThrottle from '@utilities/raf-throttle'
import ScreenDimensions from '@utilities/screen-dimensions'

import Canvas from './canvas'

let MAX_IMAGE_LOAD = ScreenDimensions.isTabletPortraitAndBigger ? 200 : 100
const NUMBER_LENGTH = 3

const JS_HOOK_SEQUENCE_CANVAS = '[js-hook-sequence-canvas]'

class Sequence {
  constructor(element) {
    this.element = element
    this.firstLoad = true
    this.debug = this.element.hasAttribute('debug')

    const hasSequence = this.setupSequence()
    this.canvas = new Canvas(this.element.querySelector(JS_HOOK_SEQUENCE_CANVAS))

    if (!this.canvas.hasContext() || !hasSequence) return

    // Set initial scroll position

    this.loadCallback = function() {}

    this.loadSequence()
    this.bindEvents()
  }

  setupSequence() {
    const { sequencePath = false, sequenceLength = false, sequenceFiletype = false } =
      this.element.dataset || {}

    if (!sequencePath || !sequenceLength || !sequenceFiletype) return false

    this.sequence = new Map()
    this.sequencePath = sequencePath
    this.sequenceStart = 1
    this.sequenceEnd = +sequenceLength
    this.sequenceLength = +sequenceLength
    this.fileType = sequenceFiletype || '.png'

    // Set startframe to load the sequence frm
    this.startFrame = Math.max(
      Math.min(this.sequenceEnd, this.getNextFrameNumber()),
      this.sequenceStart,
    )

    this.prevFramesLoaded = this.startFrame
    this.nextFramesLoaded = this.startFrame

    return true
  }

  bindEvents() {
    Events.$on('visibility::change', (_, { isVisible }) => this.handleVisibilityChange(isVisible))

    RafThrottle.set([
      {
        element: window,
        event: 'resize',
        namespace: `Sequence-Resize`,
        fn: () => this.setCanvasSize(),
      },
    ])
  }

  handleVisibilityChange(isVisible) {
    if (isVisible) {
      this.renderFrame()
    } else {
      if (this.rafId) cancelAnimationFrame(this.rafId)
    }
  }

  setCanvasSize() {
    this.canvas.setSize()
    this.drawImage(this.currentFrame)
  }

  addLeadingZeros(n) {
    // const length = this.sequenceEnd.toString().length;
    const length = NUMBER_LENGTH
    const str = (n > 0 ? n : -n) + ''
    let output = ''
    for (let i = length - str.length; i > 0; i--) {
      output += '0'
    }
    output += str
    return output
  }

  getNextFrames() {
    return this.nextFramesLoaded + MAX_IMAGE_LOAD > this.sequenceEnd
      ? this.sequenceEnd
      : this.nextFramesLoaded + MAX_IMAGE_LOAD
  }

  getPrevFrames() {
    return this.prevFramesLoaded - MAX_IMAGE_LOAD < this.sequenceStart
      ? this.sequenceStart
      : this.prevFramesLoaded - MAX_IMAGE_LOAD
  }

  getPromises(prev) {
    const currentFrame = this.nextFramesLoaded
    const output = []

    // Previous
    if (prev) {
      let prevFrames = this.getPrevFrames()
      for (let i = currentFrame; i >= prevFrames; i--) {
        if (!this.sequence.has(i) && i <= this.sequenceEnd) {
          output.push(this.loadImage(i))
        }
      }

      return output
    }

    // Next
    if (!prev) {
      let nextFrames = this.getNextFrames()
      for (let i = currentFrame; i <= nextFrames; i++) {
        if (!this.sequence.has(i) && i >= this.sequenceStart) {
          output.push(this.loadImage(i))
        }
      }

      return output
    }
  }

  loadSequence(prev) {
    let promises = this.getPromises(prev)

    if (ScreenDimensions.isTabletLandscapeAndBigger && this.firstLoad)
      MAX_IMAGE_LOAD = this.sequenceEnd

    Promise.all(promises)
      .then(e => {
        this.renderFrame()
        if (this.firstLoad) this.loadCallback()
        this.firstLoad = false
      })
      .catch(e => {
        console.log(e)
      })
  }

  createPromise(img) {
    return new Promise((resolve, reject) => {
      this.nextFramesLoaded++
      if (img.complete) {
        resolve()
      } else {
        img.onload = resolve
        img.onerror = reject
      }
    })
  }

  loadImage(i) {
    const fileNumber = this.addLeadingZeros(i)
    const filename = `${this.sequencePath}${fileNumber}${this.fileType}`
    const img = new Image()
    img.src = filename

    this.sequence.set(i, img)
    return this.createPromise(img)
  }

  set scrollPercentage(percentage) {
    this._scrollPercentage = percentage
  }

  get scrollPercentage() {
    return this._scrollPercentage || 0
  }

  getNextFrameNumber() {
    if (this.scrollPercentage <= 0) return this.sequenceStart
    if (this.scrollPercentage >= 100) return this.sequenceEnd

    return Math.round((this.scrollPercentage * this.sequenceLength) / 100)
  }

  drawImage(frameNumber) {
    if (frameNumber > this.sequenceEnd) return

    if (this.sequence.has(frameNumber) && this.sequence.get(frameNumber).complete) {
      this.canvas.renderFrame(this.sequence.get(frameNumber))
      Events.$trigger('canvas-sequence::frameupdate', { data: frameNumber })
    }
  }

  canLoadNext() {
    return (
      this.currentFrame > this.previousFrame &&
      this.currentFrame + MAX_IMAGE_LOAD > this.nextFramesLoaded &&
      this.sequence.size < this.sequenceEnd
    )
  }

  canLoadPrev() {
    return (
      this.currentFrame < this.previousFrame &&
      this.currentFrame - MAX_IMAGE_LOAD < this.prevFramesLoaded &&
      this.sequence.size < this.sequenceEnd
    )
  }

  renderFrame() {
    this.previousFrame = this.currentFrame
    this.currentFrame = this.getNextFrameNumber()

    if (this.canLoadNext()) this.loadSequence()
    if (this.canLoadPrev()) this.loadSequence(1)

    if (this.currentFrame !== this.previousFrame || this.firstLoad) {
      this.drawImage(this.currentFrame)
    } else {
      cancelAnimationFrame(this.rafId)
    }

    this.rafId = requestAnimationFrame(() => {
      this.renderFrame()
    })
  }

  scaleCanvas() {
    this.canvas.width = this.size.width
    this.canvas.height = this.size.height
    this.context.scale(this.size.ratio, this.size.ratio)
  }
}

function detectHiddenVisibilityProps() {
  const obj = { hidden: false, visibilityChange: false }

  // Set the name of the hidden property and the change event for visibility
  if (typeof document.hidden !== 'undefined') {
    // Opera 12.10 and Firefox 18 and later support
    obj.hidden = 'hidden'
    obj.visibilityChange = 'visibilitychange'
  } else if (typeof document.msHidden !== 'undefined') {
    obj.hidden = 'msHidden'
    obj.visibilityChange = 'msvisibilitychange'
  } else if (typeof document.webkitHidden !== 'undefined') {
    obj.hidden = 'webkitHidden'
    obj.visibilityChange = 'webkitvisibilitychange'
  }

  return obj
}

export default Sequence

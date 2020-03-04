/*eslint max-lines-per-function: */

import { body, html } from '@utilities/dom-elements'
import Events from '@utilities/events'
import RafThrottle from '@utilities/raf-throttle'
import ScreenDimensions from '@utilities/screen-dimensions'

import Canvas from './canvas'

let MAX_IMAGE_LOAD = ScreenDimensions.isTabletPortraitAndBigger ? 200 : 100
const VISIBILITY_STATE = detectHiddenVisibilityProps()
const NUMBER_LENGTH = 3

const JS_HOOK_SEQUENCE_CANVAS = '[js-hook-sequence-canvas]'

class CanvasSequence {
  constructor(element) {
    this.element = element
    this.sequence = new Map()
    this.firstLoad = true
    this.debug = this.element.hasAttribute('debug')

    this.scrollHeight = this.element.clientHeight
    this.clientHeight = window.clientHeight

    const { sequencePath = false, sequenceLength = false, sequenceFiletype = false } =
      this.element.dataset || {}

    this.canvas = new Canvas(this.element.querySelector(JS_HOOK_SEQUENCE_CANVAS))

    if (!this.canvas.hasContext() || !sequencePath || !sequenceLength || !sequenceFiletype) return

    if (this.debug) console.log(element)

    this.sequencePath = sequencePath
    this.sequenceStart = 1
    this.sequenceEnd = +sequenceLength
    this.sequenceLength = +sequenceLength

    this.fileType = sequenceFiletype || '.png'

    // Set initial scroll position
    this.syncScrollPosition()

    this.loadCallback = function() {}

    // Set startframe to load the sequence frm
    this.startFrame = Math.max(
      Math.min(this.sequenceEnd, this.getNextFrameNumber()),
      this.sequenceStart,
    )

    this.prevFramesLoaded = this.startFrame
    this.nextFramesLoaded = this.startFrame

    this.loadSequence()
    this.bindEvents()
  }

  bindEvents() {
    if (typeof document.addEventListener !== 'undefined' && VISIBILITY_STATE.hidden !== false) {
      document.addEventListener(
        VISIBILITY_STATE.visibilityChange,
        () => this.handleVisibilityChange,
        false,
      )
    }

    RafThrottle.set([
      {
        element: window,
        event: 'resize',
        namespace: `CanvasSequence-Resize`,
        fn: () => this.setCanvasSize(),
      },
    ])
  }

  handleVisibilityChange() {
    if (document[VISIBILITY_STATE.hidden]) {
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
    const frameNumber = this.addLeadingZeros(i)
    const filename = this.sequencePath + frameNumber + this.fileType
    const img = new Image()
    img.src = filename

    this.sequence.set(i, img)
    return this.createPromise(img)
  }

  getNextFrameNumber() {
    this.scrollHeight = this.element.clientHeight
    this.offsetTop = this.element.offsetTop
    this.clientHeight = window.innerHeight

    const scrollPercentage = ((this.scrollY - this.offsetTop) / this.scrollHeight) * 100
    const currentFrameNumber = Math.max(
      Math.round((scrollPercentage * this.sequenceLength) / 100),
      this.sequenceStart,
    )

    return currentFrameNumber
  }

  syncScrollPosition() {
    this.scrollY = Math.max(
      this.element.scrollTop,
      body.scrollTop,
      html.scrollTop,
      window.pageYOffset,
      window.scrollY,
    )
  }

  drawImage(frameNumber) {
    if (frameNumber > this.sequenceEnd) return

    console.log('drawImage', frameNumber, this.sequence.has(frameNumber))
    if (this.sequence.has(frameNumber) && this.sequence.get(frameNumber).complete) {
      this.canvas.renderFrame(this.sequence.get(frameNumber))
      Events.$trigger('canvas-sequence::frameupdate', { data: frameNumber })
    }
  }

  renderFrame() {
    this.syncScrollPosition()

    this.previousFrame = this.currentFrame
    this.currentFrame = this.getNextFrameNumber()

    if (
      this.currentFrame > this.previousFrame &&
      this.currentFrame + MAX_IMAGE_LOAD > this.nextFramesLoaded &&
      this.sequence.size < this.sequenceEnd
    ) {
      if (this.debug) console.log(this.currentFrame, this.previousFrame)
      this.loadSequence()
    }

    if (
      this.currentFrame < this.previousFrame &&
      this.currentFrame - MAX_IMAGE_LOAD < this.prevFramesLoaded &&
      this.sequence.size < this.sequenceEnd
    ) {
      this.loadSequence(1)
    }

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

export default CanvasSequence

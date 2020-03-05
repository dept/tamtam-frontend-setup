import RafThrottle from '@utilities/raf-throttle'
import ScreenDimensions from '@utilities/screen-dimensions'

class Canvas {
  constructor(element) {
    if (!element) return

    this.element = element
    this.wrapper = this.element.parentNode
    this.context = this.element.getContext('2d') || false

    if (!this.context) return

    this.setSize()
    this.bindEvents()
  }

  bindEvents() {
    RafThrottle.set([
      {
        element: window,
        event: 'resize',
        namespace: `Sequence-Resize[${Math.random()}]`,
        fn: () => this.setSize(),
      },
    ])
  }

  hasContext() {
    return this.context
  }

  setSize() {
    this.scrollHeight = this.wrapper.scrollHeight
    this.clientHeight = window.innerHeight
    this.size = this.getRenderSize()
    this.scale()

    if (this.frame) this.renderFrame(this.frame)
  }

  getRenderSize() {
    // assume the device pixel ratio is 1 if the browser doesn't specify it
    const devicePixelRatio = window.devicePixelRatio || 1
    let { height } = ScreenDimensions
    let width = this.wrapper.clientWidth

    // determine the 'backing store ratio' of the canvas context
    const backingStoreRatio = this.getBackingStoreRatio()

    // determine the actual ratio we want to draw at
    const ratio = devicePixelRatio / backingStoreRatio

    if (devicePixelRatio !== backingStoreRatio) {
      const newWidth = width * ratio
      const newHeight = height * ratio

      this.element.style.width = `${width}px`
      this.element.style.height = `${height}px`

      width = newWidth
      height = newHeight
    }

    return { ratio, width, height }
  }

  getBackingStoreRatio() {
    return (
      this.context.backingStorePixelRatio ||
      this.context.webkitBackingStorePixelRatio ||
      this.context.mozBackingStorePixelRatio ||
      this.context.msBackingStorePixelRatio ||
      this.context.oBackingStorePixelRatio ||
      1
    )
  }

  scale() {
    this.element.width = this.size.width
    this.element.height = this.size.height
    this.context.scale(this.size.ratio, this.size.ratio)
  }

  renderFrame(frame) {
    if (!frame) return

    this.frame = frame

    //this.context.clearRect(0, 0, ScreenDimensions.width, ScreenDimensions.height)

    drawImageProp(
      this.context,
      frame,
      0,
      0,
      ScreenDimensions.width,
      ScreenDimensions.height,
      0.5,
      0.5,
    )
  }
}

/**
 * By Ken Fyrstenberg Nilsen
 *
 * drawImageProp(context, image [, x, y, width, height [,offsetX, offsetY]])
 *
 * If image and context are only arguments rectangle will equal canvas
 */
function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {
  // default offset is center
  offsetX = typeof offsetX === 'number' ? offsetX : 0.5
  offsetY = typeof offsetY === 'number' ? offsetY : 0.5

  // keep bounds [0.0, 1.0]
  if (offsetX < 0) offsetX = 0
  if (offsetY < 0) offsetY = 0
  if (offsetX > 1) offsetX = 1
  if (offsetY > 1) offsetY = 1

  const iw = img.width
  const ih = img.height
  const r = Math.min(w / iw, h / ih)
  let nw = iw * r // new prop. width
  let nh = ih * r // new prop. height
  let cx,
    cy,
    cw,
    ch,
    ar = 1

  // decide which gap to fill
  if (nw < w) ar = w / nw
  if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh // updated
  nw *= ar
  nh *= ar

  // calc source rectangle
  cw = iw / (nw / w)
  ch = ih / (nh / h)

  cx = (iw - cw) * offsetX
  cy = (ih - ch) * offsetY

  // make sure source rectangle is valid
  if (cx < 0) cx = 0
  if (cy < 0) cy = 0
  if (cw > iw) cw = iw
  if (ch > ih) ch = ih

  // fill image in dest. rectangle
  ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h)
}

export default Canvas

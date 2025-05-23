const IS_TOUCH = 'is-touch'
const WITH_MOUSE = `${IS_TOUCH}--with-mouse`
const html = document.documentElement

class DetectTouch {
  private touch: boolean
  private hasMouse: boolean
  private mouseEvent: () => void

  get isTouchDevice() {
    return this.touch
  }

  constructor() {
    this.hasMouse = false
    this.mouseEvent = () => this.handleMouseEvent()
    this.touch =
      'ontouchstart' in html ||
      navigator.maxTouchPoints > 0 ||
      // @ts-ignore Needs ignore due to TS 4.4.x removal of this property
      navigator.msMaxTouchPoints > 0

    html.addEventListener('touchstart', () => {
      html.removeEventListener('mousemove', this.mouseEvent)
    })

    html.addEventListener('mousemove', this.mouseEvent)

    if (this.touch) {
      html.classList.add(IS_TOUCH)
    }
  }

  handleMouseEvent() {
    if (!this.hasMouse && html.classList.contains(IS_TOUCH)) {
      html.classList.add(WITH_MOUSE)
      this.hasMouse = true
    }
  }
}

export default new DetectTouch()

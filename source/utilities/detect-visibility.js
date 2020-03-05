import Events from '@utilities/events'

class DetectVisibility {
  constructor() {
    this.visibilityProps = this.detectHiddenVisibilityProps()

    if (typeof document.addEventListener === 'undefined' || this.property === false) return

    document.addEventListener(
      this.visibilityEvent,
      () => {
        Events.$trigger('visibility::change', { data: { isVisible: !document[this.property] } })
      },
      false,
    )
  }

  detectHiddenVisibilityProps() {
    this.property = false
    this.visibilityEvent = false

    // Set the name of the hidden property and the change event for visibility
    if (typeof document.hidden !== 'undefined') {
      // Opera 12.10 and Firefox 18 and later support
      this.property = 'hidden'
      this.visibilityEvent = 'visibilitychange'
    } else if (typeof document.msHidden !== 'undefined') {
      this.property = 'msHidden'
      this.visibilityEvent = 'msvisibilitychange'
    } else if (typeof document.webkitHidden !== 'undefined') {
      this.property = 'webkitHidden'
      this.visibilityEvent = 'webkitvisibilitychange'
    }
  }
}

export default new DetectVisibility()

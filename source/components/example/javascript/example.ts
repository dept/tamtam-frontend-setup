/**
 * Example module, this represent a single instance of a module
 * - so all of its logic is only about a single HTMLElement and its content.
 * Use this in combination with the module-init function to easily create new instances of this module.
 */
class Example {
  public element: HTMLElement
  public countValue: number

  constructor(element: HTMLElement) {
    this.element = element
    this.countValue = 0

    this.updateUI()

    this.element.addEventListener('click', () => this.handleClickEvent())
  }

  handleClickEvent() {
    this.countValue++
    this.updateUI()
  }

  updateUI() {
    this.element.innerHTML = `<span>example module clicks:</span> ${this.countValue}`
  }
}

// export the constructor function
export default Example

import { body, html } from '@/utilities/dom-elements'
import Events from '@/utilities/events'

// import { ModalManager } from './modal-manager.ts'

const JS_HOOK_MODAL_CLOSE_BTN = '[js-hook-modal-close-btn]'

type ModalEntry = {
  id: string
  el: HTMLDialogElement
  isOpen: boolean
}

class Modal {
  element: HTMLDialogElement
  btnsOpen: NodeListOf<HTMLButtonElement>
  btnClose: HTMLButtonElement | null
  scrollElement = document.scrollingElement || html
  scrollTop = 0
  closeAllOthers: boolean
  enableDocumentScrollWhileOpen: boolean
  autoClose: number | false

  constructor(element: HTMLDialogElement) {
    this.element = element
    this.btnsOpen = document.querySelectorAll(`[aria-controls=${this.element.id}]`)
    this.btnClose = this.element.querySelector(JS_HOOK_MODAL_CLOSE_BTN)
    this.closeAllOthers = this.element.dataset.modalCloseAllOthers === 'true'
    this.enableDocumentScrollWhileOpen = this.element.dataset.modalCloseAllOthers === 'true'
    this.autoClose = this.element.dataset.autoClose
      ? parseInt(this.element.dataset.autoClose)
      : false

    this.#registerModal()
    this.#bindEvents()
  }

  handleOpen = () => this.#open()
  handleClose = () => this.#close()
  handleBackdropClick = (event: MouseEvent) => this.#backdropClick(event)

  #registerModal() {
    // const modal: ModalEntry = {
    //   el: this.element,
    //   id: this.element.id,
    //   isOpen: this.element.hasAttribute('open'),
    // }
    // ModalManager.addModalEntry(modal)
  }

  #bindEvents() {
    this.btnsOpen.forEach(el => {
      el.addEventListener('click', this.handleOpen)
    })

    this.btnClose?.addEventListener('click', this.handleClose)

    this.element.addEventListener('click', event => this.#backdropClick(event))

    Events.$on(`modal[${this.element.id}]::open`, this.handleOpen)
    Events.$on(`modal[${this.element.id}]::close`, this.handleClose)
  }

  #open() {
    if (!this.enableDocumentScrollWhileOpen) {
      this.#setScrollPosition()
    }

    if (this.closeAllOthers) {
      // ModalManager.closeAllOthers(this.element.id)
    }

    if (this.autoClose) {
      setTimeout(() => {
        this.#close()
      }, this.autoClose * 1000)
    }

    this.element.showModal()

    Events.$trigger('focustrap::activate', {
      data: {
        element: this.element,
      },
    })

    html.classList.add(`has-modal-open--${this.element.id}`)
  }

  #close() {
    this.element.close()

    Events.$trigger('focustrap::deactivate')

    html.classList.remove(`has-modal-open--${this.element.id}`)

    if (!this.enableDocumentScrollWhileOpen) {
      this.#removeScrollPosition()
    }
  }

  #setScrollPosition() {
    this.scrollTop = this.scrollElement.scrollTop
    body.style.top = `-${this.scrollTop}px`
  }

  #removeScrollPosition() {
    this.scrollElement.scrollTop = this.scrollTop
    body.style.removeProperty('top')
  }

  #backdropClick(event: MouseEvent) {
    const rect = this.element.getBoundingClientRect()
    const isInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width

    if (!isInDialog) {
      this.#close()
    }
  }

  #unbindAll() {
    this.btnsOpen.forEach(el => {
      el.removeEventListener('click', this.handleOpen)
    })

    this.btnClose?.removeEventListener('click', this.handleClose)

    this.element.addEventListener('click', event => {
      const rect = this.element.getBoundingClientRect()
      const isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width

      if (!isInDialog) {
        this.#close()
      }
    })
  }
}

export default Modal

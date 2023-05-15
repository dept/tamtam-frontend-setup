type ModalEntry = {
  id: string
  el: HTMLDialogElement
  isOpen: boolean
}

type ModalEntries = {
  [key: string]: ModalEntry
}

class ModalManager {
  store: ModalEntries = {}

  constructor() {
    this.store = {}
  }

  addModalEntry(data: ModalEntry) {
    this.store[data.id] = data
  }

  closeAllOthers(id: string) {
    //
  }
}

export default new ModalManager()

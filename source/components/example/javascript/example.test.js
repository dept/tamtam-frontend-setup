import Example from '@components/example'

it('Check if example element is defined', () => {
  const example = new Example(document.createElement('div'))

  expect(example.element).toBeDefined()
})

it('Check if countValue gets incremented by 1 on click and the UI is updated', () => {
  const example = new Example(document.createElement('div'))

  expect(example.element).toBeDefined()

  const defaultValue = example.countValue
  example.handleClickEvent()

  expect(example.countValue).toBe(defaultValue + 1)
  expect(example.element.innerHTML).toBe(`<span>example module clicks:</span> ${defaultValue + 1}`)
})

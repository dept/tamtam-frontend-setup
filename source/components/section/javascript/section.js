import { body, html } from '@utilities/dom-elements'
import Events from '@utilities/events'

import Sequence from './sequence'

const JS_HOOK_SEQUENCE = '[js-hook-sequence]'

class AnimationSection {
  constructor(element) {
    this.element = element

    this.setupAnimation()
    this.setRectProperties()
    this.setScrollY()
    this.setPercentage()

    this.ui = {
      sequence: this.element.querySelector(JS_HOOK_SEQUENCE),
    }

    this.sequence = this.ui.sequence ? new Sequence(this.ui.sequence) : false

    this.bindEvents()
    this.tick()
  }

  bindEvents() {
    Events.$on('visibility::change', (_, { isVisible }) => this.handleVisibilityChange(isVisible))
  }

  setupAnimation() {
    const { animationStartPosition, animationEndPosition } = this.element.dataset

    this.animationStartPosition = animationStartPosition || 'onTop'
    this.animationEndPosition = animationEndPosition || 'onLeave'
  }

  setRectProperties() {
    this.scrollHeight = this.element.clientHeight
    this.offsetTop = this.element.offsetTop
    this.clientHeight = window.innerHeight
  }

  setScrollY() {
    this.scrollY =
      this.element.scrollTop ||
      body.scrollTop ||
      html.scrollTop ||
      window.pageYOffset ||
      window.scrollY
  }

  setPercentage() {
    this.setScrollY()

    let position = this.scrollY - this.offsetTop
    let distance = this.scrollHeight

    if (this.animationStartPosition === 'onEnter') {
      position += this.clientHeight
      distance += this.clientHeight
    }

    if (this.animationEndPosition === 'onBottom') {
      distance -= this.clientHeight
    }

    if (this.animationStartPosition === 'onEnter' && this.animationEndPosition === 'onBottom') {
      distance -= this.clientHeight
    }

    this.scrollPercentage = (position / distance) * 100
  }

  updateSequence() {
    this.sequence.scrollPercentage = this.scrollPercentage
  }

  tick() {
    this.setPercentage()
    if (this.sequence) this.updateSequence()

    this.rafId = requestAnimationFrame(() => {
      this.tick()
    })
  }

  handleVisibilityChange(isVisible) {
    if (isVisible) {
      this.tick()
    } else {
      if (this.rafId) cancelAnimationFrame(this.rafId)
    }
  }
}

export default AnimationSection

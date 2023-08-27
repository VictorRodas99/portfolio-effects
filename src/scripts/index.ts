import { Gradient } from './gradient'
import { HeroAnimation } from './random-text-animation'

document.addEventListener('DOMContentLoaded', () => {
  const gradient = new Gradient()
  gradient.initGradient('#gradient-canvas')

  const messengerContainer = document.querySelector('#messenger')

  if (!messengerContainer) {
    throw new Error('#messenger element does not exists')
  }

  const messages = [
    'Este es un mensaje',
    'este es otro mensaje',
    'jaja...'
  ]

  new HeroAnimation(messengerContainer, messages)
})
const getRandomNumberUp = (to: number) => Math.floor(Math.random() * to)

function getMajorLength({ messages }: { messages: string[] }) {
  let majorLength = 0

  for (const message of messages) {
    const { length } = message

    majorLength = length > majorLength
      ? length
      : majorLength
  }

  return majorLength
}

interface HeroAnimation {
  containerElement: Element
  messages: string[]
  messageIndex: number
  currentLength: number
  characters: string
  fadeBuffer: { c: number, l: string }[]
  generateRandomString({ randomStringLength }: { randomStringLength: number }): string
  animateRandomCharacters(): void
  animateFadeBuffer(): void
  cycleText(): void
}


class HeroAnimation implements HeroAnimation {
  constructor(containerElement: Element, messages: string[]) {
    this.containerElement = containerElement
    this.messages = messages

    this.messageIndex = 0
    this.currentLength = 0
    this.characters = '&#*+%?£@§$abcdefghijklmnopwrstwxyz'

    this.fadeBuffer = []

    setTimeout(this.animateRandomCharacters.bind(this), 100)
  }

  generateRandomString({ randomStringLength }: { randomStringLength: number }) {
    if (typeof randomStringLength !== 'number') {
      throw new Error('Expected randomStringLength to be number')
    }

    let randomText = ''
    let control = 0

    while (control < randomStringLength) {
      const randomNumber = getRandomNumberUp(this.characters.length)
      randomText += this.characters.charAt(randomNumber)

      control++
    }

    return randomText
  }

  animateRandomCharacters() {
    const currentMessage = this.messages[this.messageIndex]

    if (this.currentLength < currentMessage.length) {
      this.currentLength += 2

      if (this.currentLength > currentMessage.length) {
        this.currentLength = currentMessage.length
      }

      const message = this.generateRandomString({ randomStringLength: this.currentLength })
      this.containerElement.textContent = message

      setTimeout(this.animateRandomCharacters.bind(this), 20)
    } else {
      setTimeout(this.animateFadeBuffer.bind(this), 20)
    }
  }

  animateFadeBuffer() {
    const currentMessage = this.messages[this.messageIndex]

    if (!this.fadeBuffer.length) {
      for (let i = 0; i < currentMessage.length; i++) {
        this.fadeBuffer.push({
          c: getRandomNumberUp(getMajorLength({ messages: this.messages })),
          l: currentMessage.charAt(i)
        })
      }
    }

    let doCycles = false
    let message = ''

    for (const fader of this.fadeBuffer) {
      if (fader.c < 0) {
        message += fader.l
        continue
      }

      doCycles = true
      fader.c--

      const randomIndex = getRandomNumberUp(this.characters.length)
      message += this.characters.charAt(randomIndex)
    }

    this.containerElement.textContent = message

    if (doCycles) {
      setTimeout(this.animateFadeBuffer.bind(this), 50)
    } else {
      setTimeout(this.cycleText.bind(this), 2000)
    }
  }

  cycleText() {
    this.messageIndex++

    if (this.messageIndex >= this.messages.length) {
      this.messageIndex = 0;
    }

    this.currentLength = 0
    this.fadeBuffer = []

    this.containerElement.textContent = ''

    setTimeout(this.animateRandomCharacters.bind(this), 200)
  }
}

export { HeroAnimation }

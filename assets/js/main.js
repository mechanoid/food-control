/* global HTMLElement, customElements, window */
const toArray = (nodes) => Array.prototype.slice.call(nodes)

class EmojiSlider extends HTMLElement {
  connectedCallback () {
    this.emojies = toArray(this.querySelectorAll('.grid-item'))
    this.slider = this.querySelector('input[type=range]')

    this.activateEmoji(this.emojies.length - 1)

    this.slider.addEventListener('change', e => {
      this.activateEmoji(this.slider.value)
    })

    this.emojies.forEach((emoji, index) => {
      emoji.addEventListener('click', e => {
        this.activateEmoji(index)
        this.slider.value = index
      })
    })
  }

  activateEmoji (index) {
    this.deactivateEmojies()
    const emoji = this.emojies[index]
    emoji.classList.add('active')
  }

  deactivateEmojies () {
    this.emojies.forEach(emoji => emoji.classList.remove('active'))
  }
}

customElements.define('emoji-slider', EmojiSlider)

class RefreshButton extends HTMLElement {
  connectedCallback () {
    if (navigator.standalone) {
      this.classList.add('active')
    }

    this.button = this.querySelector('button')
    this.button.addEventListener('click', e => {
      window.location.reload()
    })
  }
}

customElements.define('refresh-button', RefreshButton)

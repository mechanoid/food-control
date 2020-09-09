/* global HTMLElement, customElements */
const toArray = (nodes) => Array.prototype.slice.call(nodes)

class EmojiSlider extends HTMLElement {
  connectedCallback () {
    this.emojies = toArray(this.querySelectorAll('.grid-item'))
    this.slider = this.querySelector('input[type=range]')

    this.activateEmoji(this.emojies.length - 1)

    this.slider.addEventListener('change', e => {
      this.activateEmoji(this.slider.value)
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

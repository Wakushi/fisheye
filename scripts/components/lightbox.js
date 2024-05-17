export class LightboxComponent {
  constructor(medias) {
    this.medias = medias
    this.currentMediaIndex = 0
    this.lightboxContainer = document.querySelector("#lightboxModalContainer")
    this.lightboxMediaContainer = document.querySelector(
      "#lightboxMediaContainer"
    )
    this.nextButton = document.querySelector("#lightboxRightArrow")
    this.prevButton = document.querySelector("#lightboxLeftArrow")
    this.closeButton = this.lightboxContainer.querySelector("#closeLightbox")
    this.bindNavigationButtons()
    document.addEventListener("openLightbox", (event) => {
      this.open(event.detail)
    })
  }

  open(mediaId) {
    document.body.style.overflow = "hidden"
    const selectedMediaIndex = this.medias.findIndex(
      (media) => media.id === mediaId
    )
    this.currentMediaIndex = selectedMediaIndex
    this.renderLightboxMedia()
    this.lightboxContainer.style.display = "flex"
    this.nextButton.focus()
    this.bindCloseButton()
  }

  close() {
    document.body.style.overflow = "auto"
    this.lightboxContainer.style.display = "none"
    const closeEvent = new CustomEvent("closeLightbox", {
      detail: this.medias[this.currentMediaIndex].id,
    })
    document.dispatchEvent(closeEvent)
  }

  nextMedia() {
    this.currentMediaIndex = (this.currentMediaIndex + 1) % this.medias.length
    this.renderLightboxMedia()
  }

  prevMedia() {
    this.currentMediaIndex =
      (this.currentMediaIndex - 1 + this.medias.length) % this.medias.length
    this.renderLightboxMedia()
  }

  renderLightboxMedia() {
    const media = this.medias[this.currentMediaIndex]
    lightboxMediaContainer.innerHTML = media.lightboxTemplate
  }

  bindCloseButton() {
    this.closeButton.addEventListener("click", () => this.close())
    this.closeButton.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.close()
      }
    })
  }

  bindNavigationButtons() {
    this.nextButton.addEventListener("click", () => this.nextMedia())
    this.nextButton.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.nextMedia()
      }
    })
    this.prevButton.addEventListener("click", () => this.prevMedia())
    this.prevButton.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.prevMedia()
      }
    })
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        this.nextMedia()
        this.nextButton.focus()
      }
      if (event.key === "ArrowLeft") {
        this.prevMedia()
        this.prevButton.focus()
      }
      if (event.key === "Escape") {
        this.close()
      }
    })
    document.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        if (event.shiftKey) {
          if (document.activeElement === this.closeButton) {
            event.preventDefault()
            this.nextButton.focus()
          }
        } else {
          if (document.activeElement === this.nextButton) {
            event.preventDefault()
            this.closeButton.focus()
          }
        }
      }
    })
  }
}

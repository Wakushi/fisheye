export class LightboxComponent {
  constructor(medias) {
    this.medias = medias
    this.lightboxContainer = document.querySelector("#lightboxModalContainer")
    this.lightboxMediaContainer = document.querySelector(
      "#lightboxMediaContainer"
    )
    document.addEventListener("openLightbox", (event) => {
      this.open(event.detail)
    })
  }

  open(mediaId) {
    this.renderLightboxMedia(mediaId)
    this.lightboxContainer.style.display = "flex"
    this.bindCloseButton()
  }

  close() {
    this.lightboxContainer.style.display = "none"
  }

  nextMedia() {}

  prevMedia() {}

  renderLightboxMedia(mediaId) {
    const media = this.medias.find((media) => media.id === mediaId)
    lightboxMediaContainer.innerHTML = media.lightboxTemplate
  }

  bindCloseButton() {
    const closeButton = this.lightboxContainer.querySelector("#closeLightbox")
    closeButton.addEventListener("click", () => this.close())
  }
}

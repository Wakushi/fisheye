export class Media {
  constructor(media, photographer) {
    const { id, photographerId, title, date, price, likes } = media
    this.id = id
    this.photographerId = photographerId
    this.title = title
    this.date = date
    this.price = price
    this.likes = likes
    this.liked = false
    this.photographer = photographer
  }

  toggleLike(likeBtn) {
    const isPressed = likeBtn.getAttribute("aria-pressed") === "true"
    this.liked = !isPressed
    this.likes = this.liked ? this.likes + 1 : this.likes - 1
    likeBtn.setAttribute("aria-pressed", !isPressed)
    likeBtn.previousElementSibling.textContent = this.likes
    const computeTotalLikes = new CustomEvent("computeTotalLikes")
    document.dispatchEvent(computeTotalLikes)
  }

  bindEvents() {
    const mediaContainer = document.getElementById(this.id)
    mediaContainer.addEventListener("click", () => {
      const openLightboxEvent = new CustomEvent("openLightbox", {
        detail: this.id,
      })
      document.dispatchEvent(openLightboxEvent)
    })
    const likeBtn = document.getElementById(`likeBtn-${this.id}`)
    likeBtn.addEventListener("click", () => this.toggleLike(likeBtn))
    likeBtn.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.toggleLike(likeBtn)
      }
    })
    mediaContainer.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const openLightboxEvent = new CustomEvent("openLightbox", {
          detail: this.id,
        })
        document.dispatchEvent(openLightboxEvent)
      }
    })
  }
}

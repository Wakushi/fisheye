import { getPhotographerById, getPhotographerPictures } from "../utils/data.js"

class Photographer {
  photographer
  medias

  constructor() {
    this.getPhotographer().then((photographer) => {
      this.photographer = photographer
      this.displayProfileData()
      this.getMedias().then((medias) => {
        this.medias = medias
        this.displayPortfolio()
      })
    })

    document.addEventListener("sortChange", (event) => {
      this.onSortChange(event.detail)
    })
  }

  onSortChange(filter) {
    this.medias.sort((a, b) => {
      if (filter === "popularité") {
        return b.likes - a.likes
      }
      if (filter === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      if (filter === "titre") {
        return a.title.localeCompare(b.title)
      }
      return 0
    })
    this.displayPortfolio(false)
  }

  async getPhotographer() {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get("id")
    const photographer = await getPhotographerById(id)
    return photographer
  }

  async getMedias() {
    const medias = await getPhotographerPictures(this.photographer.id)
    return medias
  }

  displayProfileData() {
    const { name, portrait, city, country, tagline } = this.photographer

    const photographerDetails = document.querySelector(".photographer-card")
    const photographerImage = document.querySelector("#photographer-portrait")

    photographerDetails.innerHTML = `
      <h2>${name}</h2>
      <p class="photographer-location">${city}, ${country}</p>
      <p class="photographer-tagline">${tagline}</p>
    `

    const picture = `assets/photographers/${portrait}`
    photographerImage.src = picture
    photographerImage.alt = name
  }

  async displayPortfolio(firstRender = true) {
    const portfolio = document.querySelector(".photographer-pictures")
    if (firstRender) {
      this.medias.sort((a, b) => b.likes - a.likes)
    }
    const gallery = this.medias.map((media) => {
      const mediaType = media.video ? "video" : "image"
      const mediaSrc = `assets/images/${this.photographer.name.split(" ")[0]}/${
        mediaType === "video" ? media.video : media.image
      }`

      if (mediaType === "video") {
        return `
          <figure class="portfolio-media">
            <div class="media-container">
              <video>
                <source src="${mediaSrc}" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <figcaption>
              <p class="media-title">${media.title}</p>
              <p class="media-likes">${media.likes} <i aria-label="likes" role="button" aria-pressed="false" tabindex="0" class="fas fa-heart"></i></p>
            </figcaption>
          </figure>
        `
      }

      return `
        <figure class="portfolio-media">
          <div class="media-container">
            <img src="${mediaSrc}" alt="${media.title}" />
          </div>
          <figcaption>
            <p class="media-title">${media.title}</p>
            <p class="media-likes">${media.likes} <i aria-label="likes" role="button" aria-pressed="false" tabindex="0" class="fas fa-heart"></i></p>
          </figcaption>
        </figure>
      `
    })
    portfolio.innerHTML = gallery.join("")
  }
}

class Filter {
  filter
  selectedOptionElement
  selectedOptionValue
  chevron

  constructor() {
    this.filter = document.querySelector(".filter")
    this.selectedOptionElement = this.filter.querySelector("#selected-option")
    this.selectedOptionValue =
      this.selectedOptionElement.querySelector("span").textContent
    this.chevron = this.filter.querySelector(".fas")
    this.bindFilterEvents()
  }

  bindFilterEvents() {
    this.selectedOptionElement.addEventListener("click", () =>
      this.toggleListbox()
    )
    const options = this.filter.querySelectorAll(".option-content")
    options.forEach((option) => {
      option.addEventListener("click", () => this.selectOption(option))
    })
  }

  toggleListbox() {
    const isExpanded = this.filter.getAttribute("aria-expanded") === "true"
    this.filter.setAttribute("aria-expanded", !isExpanded)
    this.chevron.className = isExpanded
      ? "fas fa-chevron-down"
      : "fas fa-chevron-up"
  }

  selectOption(clickedOptionElement) {
    const optionLabel = clickedOptionElement.textContent
    const oldLabel =
      this.selectedOptionElement.querySelector("span").textContent
    clickedOptionElement.textContent = oldLabel
    this.selectedOptionElement.querySelector("span").textContent = optionLabel
    this.selectedOptionValue = optionLabel.toLowerCase()
    this.toggleListbox()
    this.dispatchSortChangeEvent()
  }

  dispatchSortChangeEvent() {
    const event = new CustomEvent("sortChange", {
      detail: this.selectedOptionValue,
    })
    document.dispatchEvent(event)
  }
}

class App {
  static async init() {
    new Photographer()
    new Filter()
  }
}

App.init()

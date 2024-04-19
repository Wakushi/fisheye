import { FilterComponent } from "../components/filter.js"
import { LightboxComponent } from "../components/lightbox.js"
import { MediasFactory } from "../models/media-factory.js"
import { Photographer } from "../models/photographer.js"
import { getPhotographerById, getPhotographerMedias } from "../utils/data.js"

class PortfolioPage {
  constructor() {
    new FilterComponent()
    this.getPhotographer().then((photographer) => {
      this.photographer = photographer
      this.getMedias().then((medias) => {
        this.medias = medias
        this.lightbox = new LightboxComponent(medias)
        this.renderProfileData()
        this.renderTotalLikes()
        this.renderPortfolio()
      })
    })

    document.addEventListener("sortChange", (event) => {
      this.onSortChange(event.detail)
    })

    document.addEventListener("computeTotalLikes", () =>
      this.renderTotalLikes()
    )
  }

  get totalLikes() {
    return this.medias.reduce((acc, media) => acc + media.likes, 0)
  }

  async getPhotographer() {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get("id")
    const photographer = await getPhotographerById(id)
    return new Photographer(photographer)
  }

  async getMedias() {
    const medias = (await getPhotographerMedias(this.photographer.id)).map(
      (media) => MediasFactory.create(media, this.photographer)
    )
    return medias
  }

  renderPortfolio(firstRender = true) {
    const portfolio = document.querySelector(".photographer-pictures")
    if (firstRender) {
      this.medias.sort((a, b) => b.likes - a.likes)
    }
    const gallery = this.medias.map((media) => media.template)
    portfolio.innerHTML = gallery.join("")
    this.medias.forEach((media) => media.bindEvents())
  }

  renderProfileData() {
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

  renderTotalLikes() {
    const totalLikesElement = document.querySelector("#totalLikes")
    const dailyPriceElement = document.querySelector("#dailyPrice")

    totalLikesElement.textContent = this.totalLikes
    dailyPriceElement.textContent = this.photographer.price
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
    this.renderPortfolio(false)
  }
}

class App {
  static async init() {
    new PortfolioPage()
  }
}

App.init()

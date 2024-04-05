import { getPhotographerById, getPhotographerPictures } from "../utils/data.js"

async function getPhotographer() {
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get("id")
  const photographer = await getPhotographerById(id)
  return photographer
}

async function displayProfileData(photographer) {
  const { name, portrait, city, country, tagline } = photographer

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

async function displayPortfolio(photographer) {
  const medias = await getPhotographerPictures(photographer.id)
  const portfolio = document.querySelector(".photographer-pictures")
  const gallery = medias.map((media) => {
    const picture = `assets/images/${photographer.name.split(" ")[0]}/${
      media.image
    }`
    return `
      <figure class="portfolio-picture">
        <img src="${picture}" alt="${media.title}" />
        <figcaption>${media.title}</figcaption>
      </figure>
    `
  })
  portfolio.innerHTML = gallery.join("")
}

async function init() {
  const photographer = await getPhotographer()
  displayProfileData(photographer)
  displayPortfolio(photographer)
}

init()

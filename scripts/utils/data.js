import { BASE_URL } from "../../data/constants.js"

async function getPhotographers() {
  const response = await fetch(`${BASE_URL}/data/photographers.json`)
  const { photographers } = await response.json()
  return photographers
}

async function getPhotographerById(id) {
  const photographers = await getPhotographers()
  return photographers.find((photographer) => photographer.id == id)
}

async function getMedias() {
  const response = await fetch(`${BASE_URL}/data/photographers.json`)
  const { media } = await response.json()
  return media
}

async function getPhotographerMedias(id) {
  const pictures = await getMedias()
  return pictures.filter((picture) => picture.photographerId == id)
}

export { getPhotographers, getPhotographerById, getPhotographerMedias }

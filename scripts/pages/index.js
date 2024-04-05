import { photographerTemplate } from "../templates/photographer.js"
import { getPhotographers } from "../utils/data.js"

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section")

  const photographerList = photographers.map((photographer) => {
    const photographerModel = photographerTemplate(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    return userCardDOM
  })

  photographersSection.innerHTML = photographerList.join("")
}

async function init() {
  const photographers = await getPhotographers()
  displayData(photographers)
}

init()

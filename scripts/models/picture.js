import {
  getPictureLightboxTemplate,
  getPictureTemplate,
} from "../templates/picture.js"
import { Media } from "./Media.js"

export class Picture extends Media {
  constructor(media, photographer) {
    super(media, photographer)
    const { image } = media
    this.image = image
    this.src = `assets/images/${this.photographer.name.split(" ")[0]}/${image}`
  }

  get template() {
    return getPictureTemplate(this)
  }

  get lightboxTemplate() {
    return getPictureLightboxTemplate(this)
  }
}

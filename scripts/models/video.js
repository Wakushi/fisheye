import {
  getVideoTemplate,
  getVideoLightboxTemplate,
} from "../templates/video.js"
import { Media } from "./Media.js"

export class Video extends Media {
  constructor(media, photographer) {
    super(media, photographer)
    const { video } = media
    this.video = video
    this.src = `assets/images/${this.photographer.name.split(" ")[0]}/${video}`
  }

  get template() {
    return getVideoTemplate(this)
  }

  get lightboxTemplate() {
    return getVideoLightboxTemplate(this)
  }
}

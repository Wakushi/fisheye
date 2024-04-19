import { Picture } from "./picture.js"
import { Video } from "./video.js"

export class MediasFactory {
  static create(media, photographer) {
    return media.hasOwnProperty("image")
      ? new Picture(media, photographer)
      : new Video(media, photographer)
  }
}

export function getPictureTemplate(picture) {
  return `
    <figure class="portfolio-media">
      <div class="media-container" id=${picture.id} tabindex=0 >
        <img src="${picture.src}" alt="${picture.title}" />
      </div>
      <figcaption>
        <p class="media-title">${picture.title}</p>
        <p class="media-likes"><span>${picture.likes}</span> <i id="likeBtn-${
    picture.id
  }" aria-label="likes" role="button" aria-pressed=${
    picture.liked ? "true" : "false"
  } tabindex="0" class="fas fa-heart"></i></p>
      </figcaption>
    </figure>
  `
}

export function getPictureLightboxTemplate(picture) {
  return `<img src="${picture.src}" alt="${picture.title}" />`
}

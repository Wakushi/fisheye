export function getVideoTemplate(video) {
  return `
    <figure class="portfolio-media">
      <div class="media-container" id=${video.id} tabindex=0>
        <video>
          <source src="${video.src}" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <figcaption>
        <p class="media-title">${video.title}</p>
        <p class="media-likes"><span>${video.likes}</span> <i id="likeBtn-${
    video.id
  }" aria-label="likes" role="button" aria-pressed=${
    video.liked ? "true" : "false"
  } tabindex="0" class="fas fa-heart"></i></p>
      </figcaption>
    </figure>
  `
}

export function getVideoLightboxTemplate(video) {
  return `
    <video controls>
      <source src="${video.src}" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  `
}

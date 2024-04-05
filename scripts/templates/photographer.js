export function photographerTemplate(data) {
  const { name, portrait, id, city, country, tagline, price } = data

  const picture = `assets/photographers/${portrait}`

  function getUserCardDOM() {
    const template = `
      <article id=${id} class="photographer-card">
        <a href="photographer.html?id=${id}" class="photographer-link">
            <div class="photographer-portrait">
                <img src="${picture}" alt="${name}">
            </div>
            <h2>${name}</h2>
        </a>
        <h3 class="photographer-location">${city}, ${country}</h3>
        <p class="photographer-tagline">${tagline}</p>
        <p class="photographer-price">${price}€/jour</p>
      </article>
    `
    return template
  }
  return { getUserCardDOM }
}

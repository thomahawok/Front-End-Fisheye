class PhotographerCard {
  constructor (photographer) {
    this._id = photographer.id
    this._city = photographer.city
    this._country = photographer.country
    this._name = photographer.name
    this._portrait = photographer.portrait
    this._price = photographer.price
    this._tagline = photographer.tagline
    this._tags = photographer.tags
  }

  createPhotographersCard () {
    const $wrapperPhotographer = document.createElement('article')
    $wrapperPhotographer.setAttribute('id', this._id)

    const mediaCardImg = `
                <a href = 'photographer.html?${this._id}' aria-label='Aller sur la page de ${this._name} originaire de ${this._city} , ${this._country}'>
                    <img 
                        src = 'assets/photographers/${this._portrait}'
                        alt='${this._name} ' portrait'
                        role='img'
                        class='imgPortrait'
                    />
                
                    <div class='asidePhotographer'>
                        <h2> ${this._name} </h2>
                        <p> ${this._city} , ${this._country} </p>
                        <p> ${this._tagline} </p>
                        <p> ${this._price} '$ / jour' </p>
                    </div> 
                </a>    
        `
    $wrapperPhotographer.innerHTML = mediaCardImg
    return $wrapperPhotographer
  }

  createCounterFooter () {
    const footer = document.createElement('footer')
    footer.classList.add('counterFooter')

    const mediaFooter = `
                  <section class="photographerFooter">
                      <div class="photographerFooter_aside">
                          <P class="photographerFooter_aside_totalLikes" tabindex="0" role="note" aria-label="Nombre total de j'aime"></P>
                          <i class="fas fa-heart" aria-hidden="true"></i>
                      </div>
                      <p class="photographerFooter_price" tabindex="0" role="note" aria-label="Tarif du photographe ${this._price} euro par jour">${this._price} €/jour </p>
                  </section>
              `
    footer.innerHTML = mediaFooter
    return footer
  }
}

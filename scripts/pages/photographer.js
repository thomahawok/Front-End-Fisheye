

let $mediasWrapper = document.querySelector('.photograph_media')

class AppMedias {
  constructor () {
    this.mediasApi = new MediasApi ('./data/photographers.json')
  }

  async main () {
    const photographersAll = await this.mediasApi.getPhotographers()/* photographersAll = tableau de l'ensemble des photographes du fichier JSON */
    const medias = await this.mediasApi.getMedias() /* medias = tableau de l'ensemble des medias du fichier JSON */
    const queryStingUrlId = window.location.search /* récupére ?id de la barre d'addresse */
    const idPhotographer = queryStingUrlId.slice(1) /* supprime ? donc récupére uniquement id */
    const photographerId = photographersAll.find((element) => element.id == idPhotographer) /* array des données du photographe DE LA PAGE en cous */
    const mediasId = medias.filter((element) => element.photographerId == idPhotographer)/* array des medias du photographe  DE LA PAGE en cous */

    displayDataPhotographer(photographerId)
    updateGallery(mediasId)
    displayFooterLikes(photographerId)
    likeDontLike(mediasId)
    onFocus()
    initLightbox()

    /* création HTML du trie par popularité et titre */
    const dropDownMenu = document.querySelector('#dropDownMenu')
    dropDownMenu.addEventListener('change', function (event) {
      $mediasWrapper.innerHTML = ''
      const getOption = event.target.value
      const option = sortByOption(mediasId, getOption)
      updateGallery(option)
      initLightbox()
    })
  }
}

const app = new AppMedias()
app.main()

/**
 * Display information's photographer - affiche les infomrations du photographe
 * @param {Array} photographerId
 */
function displayDataPhotographer (photographerId) {
  const photographersHeader = document.querySelector('.photograph_header')
  const photographerModel = new PhotographerCard(photographerId)
  photographersHeader.appendChild(photographerModel.createPhotographersCard())
}

/**
 * Display information's footer- affiche les infomrations du footer
 * @param {Array} photographerId
 */
function displayFooterLikes (photographerId) {
  const photographerBody = document.querySelector('body')
  const footerModel = new PhotographerCard(photographerId)
  photographerBody.appendChild(footerModel.createCounterFooter())
  totalCuntLikes()
}

/**
 * Update media gallery - création de la gallerie de medias
 * @param {Array} gallery
 */
function updateGallery (gallery) {
  gallery.forEach(media => {
    const template = new MediaCard(media)
    $mediasWrapper.appendChild(template.createMediaCard())
  })
}

/**
 * Increment and decrement number of likes - Incrémentation / décrémentation des likes
 * @param {Array} mediasId
 */
function likeDontLike (mediasId) {
  const elementCount = document.querySelectorAll('.likes i')
  elementCount.forEach((like) => {
    like.addEventListener('click', (e) => {
      const oldCount = Number(e.path[2].innerText)
      const indexData = mediasId.findIndex(element => element.id == e.target.id)
      const numberLikes = e.path[2].children[0]
      if (oldCount === mediasId[indexData].likes) {
        const newCount = oldCount + 1
        numberLikes.innerHTML = newCount
        const eTarget = e.target
        eTarget.className = 'fa-2x fas fa-heart'
        eTarget.parentElement.setAttribute('aria-label', "j'aime")
      } else {
        const newCount = oldCount - 1
        numberLikes.innerHTML = newCount
        const eTarget = e.target
        eTarget.className = 'fa-2x far fa-heart'
        eTarget.parentElement.setAttribute('aria-label', "J'iame pas")
      }
      totalCuntLikes()
    })
  })
}

/**
* Like counter function - Fonction compteur de like
*/
function totalCuntLikes () {
  const arrayLikes = document.querySelectorAll('p.numberLikes')
  let totalLikes = 0

  for (let i = 0; i < arrayLikes.length; i++) {
    totalLikes += Number(arrayLikes[i].innerHTML)
  }
  const totalLikesP = document.querySelector('p.photographerFooter_aside_totalLikes')
  totalLikesP.innerHTML = totalLikes
}

/**
* Like counter function on key up- Fonction compteur de like clavier
*/
function onFocus () {
  const elementa = Array.from(document.querySelectorAll('.likes'))
  elementa.forEach((elemOne) => {
    elemOne.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        const essai = e.target.firstElementChild
        essai.click()
      } else {
        return false
      }
    })
  })
}

/**
* Function pulls media - Fonction tire des médias
*/
function sortByOption (mediasId, getOption) {
  switch (getOption) {
    case 'popularity':
      return mediasId.sort((a, b) => {
        return b.likes - a.likes
      })
    case 'title':
      return mediasId.sort((a, b) => a.title.localeCompare(b.title))
    default:
      return mediasId.sort((a, b) => {
        return b.likes - a.likes
      })
  }
}


/**
 * Lightbox for show photographers medias
 * @constant {HTMLElement} galleryMedias - Get elements in medias gallery
 * @constant {string []} arrayJpgMp4 - Get all elements who contains img and video
 * @constant {string []} arraySrc - Get attributes src of all medias
 */
 function initLightbox () {
  /** ceate array of sources medias **/
  /** créé un tableau des sources des médais **/
  const galleryMedias = document.querySelector('.photograph_media')
  const arrayJpgMp4 = Array.from(galleryMedias.querySelectorAll('img[src$=".jpg"],source[src$=".mp4"]')) /* concerti array avec l'ensemble des tag médias (img et video) */
  const arraySrc = arrayJpgMp4.map((link) => link.getAttribute('src')) /* array avec l'ensemble des chemins d'accès au médias (img et video) */
  const arrayAlt = arrayJpgMp4.map((link) => link.getAttribute('alt')) /* array avec l'ensemble des chemins d'accès au médias (img et video) */

  /** for eatch element of arrayJpgMp4 create new lightbox with src target and arraySrc arguements***/
  /** pour chaque élément de arrayJpgMp4 créé une nouvelle lightbox avec les arguments src target et arraySrc ***/
  arrayJpgMp4.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      // eslint-disable-next-line no-new
      new Lightbox(e.currentTarget.getAttribute('src'), e.currentTarget.getAttribute('alt'), arraySrc, arrayAlt)
    })

    link.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        e.preventDefault()
        // eslint-disable-next-line no-new
        new Lightbox(e.currentTarget.getAttribute('src'), e.currentTarget.getAttribute('alt'), arraySrc, arrayAlt)
      } else {
        return false
      }
    })
  })
}
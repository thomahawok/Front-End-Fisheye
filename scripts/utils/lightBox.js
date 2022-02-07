
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

/**
*
* @param {string} src Media src
* @param {string[]} arraySrc Array of medaid
* @param {string} alt Alt media text
*/
class Lightbox {
  constructor (src, alt, arraySrc, arrayAlt) {
    console.log(alt)
    this.arraySrc = arraySrc
    this.arrayAlt = arrayAlt
    this.closeBtn = document.querySelector('.lightbox__close')
    this.nextBtn = document.querySelector('.lightbox__next')
    this.prevBtn = document.querySelector('.lightbox__prev')
    this.modifySrcPath(src)
    this.Lightbox = document.querySelector('.lightbox')
    this.loadMedia(src, alt, arraySrc, arrayAlt)
    this.onKeyUp()
    this.next()
    this.prev()
    this.close()
  }

  /* change the path src /assets/thumbnails/... (thumbnails) to /assets/Sapmle Photos/...(medias grandes tailles)) */
  /* modifie le chemin src /assets/thumbnails/... (vignettes) vers /assets/Sapmle Photos/...(large size media)) */
  modifySrcPath (src) {
    const arrayPath = src.split('/')
    arrayPath.splice(2, 1, 'Sample Photos')
    const srcMediaPath = arrayPath.join('/')
    return srcMediaPath
  }

  /** récupère le titre du média */
  /** get media title */
  getMediaTitle (src) {
    const arrayPath = src.split('/')
    const string = arrayPath[arrayPath.length - 1].split('.')[0]
    const TitelMedia = string.replaceAll('_', ' ')
    return TitelMedia
  }

  /**
  * @param {string} src Media src
  * @param {string} alt Media alt text
  */
  /** building the HTML architecture ***/
  /** construction de l'architecure HTML ***/
  loadMedia (src, alt) {
    this.src = src
    this.alt = alt
    this.Lightbox.style.display = 'block'
    const container = document.querySelector('.lightbox__container')

    if (src.endsWith('.mp4')) {
      const video = document.createElement('video')
      const legend = document.createElement('p')
      legend.innerHTML += this.getMediaTitle(src)
      container.innerHTML = ''
      container.appendChild(video)
      container.appendChild(legend)
      video.setAttribute('controls', '')
      video.setAttribute('class', 'lightbox__media')
      video.src = src
    } else if (src.endsWith('.jpg')) {
      const image = document.createElement('img')
      const legend = document.createElement('p')
      legend.innerHTML += this.getMediaTitle(src)
      container.innerHTML = ''
      container.appendChild(image)
      container.appendChild(legend)
      image.setAttribute('class', 'lightbox__media')
      image.alt = this.alt
      image.src = this.modifySrcPath(src)
      image.classList.add('lightbox__container__img')
    }
  }

  /**
   * @param {KeyboardEvent} e
   */
  onKeyUp () {
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        this.closeBtn.click()
      } else if (e.key === 'ArrowLeft') {
        this.prevBtn.click()
      } else if (e.key === 'ArrowRight') {
        this.nextBtn.click()
      }
    })
  }

  /**
  * Switch to the next media
  * @param {MouseEvent} e
  */
  next () {
    this.nextBtn.addEventListener('click', e => {
      e.preventDefault()
      let i = this.arraySrc.findIndex((image) => image === this.src)
      if (i === this.arraySrc.length - 1) { /** gestion du dernier média / ici arraySrc.length =10 donc denier média arraySrc[9] **/
        i = -1
      }
      let j = this.arrayAlt.findIndex((txtAlt) => txtAlt === this.alt)
      if (j === this.arrayAlt.length - 1) { /** gestion du dernier média / ici arraySrc.length =10 donc denier média arraySrc[9] **/
        j = -1
      }
      this.loadMedia(this.arraySrc[i + 1], this.arrayAlt[j + 1]) /** au dernier média i=-1 donc arraySrc[0] (-1+1) soit le premier média */
    })
  }

  /**
  * Switch to the previous media
  * @param {MouseEvent} e
  */
  prev () {
    this.prevBtn.addEventListener('click', e => {
      e.preventDefault()
      let i = this.arraySrc.findIndex((image) => image === this.src)
      if (i === 0) { /** gestion du premier média [0]/ arraySrc.length =10 donc i=10 ****/
        i = this.arraySrc.length
      }
      let j = this.arrayAlt.findIndex((txtAlt) => txtAlt === this.alt)
      if (i === 0) { /** gestion du premier média [0]/ arraySrc.length =10 donc i=10 ****/
        i = this.arraySrc.length
      }
      this.loadMedia(this.arraySrc[i - 1], this.arrayAlt[j - 1]) /** au premier média i=0 donc arraySrc[9] (10-1) soit le premier média */
    })
  }

  /**
  * Close modal
  * @param {MouseEvent} e
  */
  close () {
    this.closeBtn.addEventListener('click', e => {
      e.preventDefault()
      this.Lightbox.style.display = 'none'
    })
  }
}

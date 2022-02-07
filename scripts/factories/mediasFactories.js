class MediaCard {
  constructor (media) {
    this._media = media
  }

  createMediaCard () {
    const $wrapper = document.createElement('article')
    $wrapper.classList.add('cadrMedia')

    if (this._media.image) {
      const mediaCardImg = `
              <figure class='Media'>
                  
                    <img 
                        src = '/assets/thumbnails/${this._media.photographerId}/${this._media.image}'
                        alt="${this._media.description}"
                        role='img'
                        class='imgMedia'
                        tabindex='0'
                    />
                  
                <footer class='footerMedia'>
                    <figuration class='figuration'> ${this._media.title} </figuration>
                    <div class='contenerLikes'>
                      <p class = 'numberLikes'> ${this._media.likes}</p>
                      <button class='likes' title="j'aime" '>
                          <i class='fa-2x far fa-heart' id= ${this._media.id} ></i>
                      </button>
                    </div>
                </footer>
                </figure>      
        `
      $wrapper.innerHTML = mediaCardImg
      return $wrapper
    } else {
      let poster = this._media.video
      poster = poster.split('.')
      poster = poster[0] + '.jpg'

      const mediaCardVideo = `
          <figure class='Media'>
           
                <video class='imgMedia'  poster='/assets/Sample Photos/${this._media.photographerId}/${poster}' tabindex='0'>
                    <source
                    src = '/assets/Sample Photos/${this._media.photographerId}/${this._media.video}'
                    type='video/mp4'            
                    >
               </video>
            
            <footer class='footerMedia'>
                <figuration  class='figuration'> ${this._media.title} </figuration>
                <div class='contenerLikes'>
                  <p class = 'numberLikes'> ${this._media.likes}</p>
                  <button class = 'likes' title="j'aime">
                    <i class='fa-2x far fa-heart' id= ${this._media.id} ></i>
                  </button>
                </div> 
            </footer>
          </figure>
        `
      $wrapper.innerHTML = mediaCardVideo
      return $wrapper
    }
  }
}

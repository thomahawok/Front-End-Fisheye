class mediaCard {
    constructor(media) {
        this._media = media
    }
    

    createMediaCard() {
        const $wrapper = document.createElement("article")
        $wrapper.classList.add("cadrMedia")
        
        
        if (this._media.image) {
            const mediaCardImg = `
                <a href = "" class="Media">
                    <img 
                        src = "/assets/thumbnails/${this._media.photographerId}/${this._media.image}"
                        alt="${this._media.title}"
                        role="img"
                        class="imgMedia"
                        tabindex="5"
                    />
                </a>
                <aside class="asideMedia">
                    <h2> ${this._media.title} </h2>
                    <div class = "likes">
                        <p class = "numberLikes"> ${this._media.likes}</p>
                        <i class="fa-x2 far fa-heart" class="likes" id= ${this._media.id} tabindex="5"></i>
                    </diV>
                </aside>    
        `
        $wrapper.innerHTML = mediaCardImg
        return $wrapper
        } else {

            let poster = this._media.video
            poster = poster.split(".")
            poster = poster[0]+".jpg"

            const mediaCardVideo = `
            <a href = "" class="Media">
                <video class="imgMedia" role="video" controls poster="/assets/Sample Photos/${this._media.photographerId}/${poster}">
                    <source
                    src = "/assets/Sample Photos/${this._media.photographerId}/${this._media.video}"
                    type="video/mp4"
                    tabindex="5"
                    >
               </video>
            </a>
            <aside class="asideMedia">
                <h2> ${this._media.title} </h2>
                <div class = "likes">
                    <p class = "numberLikes"> ${this._media.likes}</p>
                    <i class="fa-x2 far fa-heart" class="likes" id= ${this._media.id} tabindex="5"></i>
                </diV>
            </aside>
        `
        $wrapper.innerHTML = mediaCardVideo
        return $wrapper
        }
    }
}


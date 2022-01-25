
class photographerCard {
    constructor(photographer) {
        this._photographer = photographer
    }
    
    
    createPhotographersCard() {
        const $wrapperPhotographer = document.createElement("article")
        $wrapperPhotographer.setAttribute("id", this._photographer.id);
        
       const mediaCardImg = `
                <a href = "photographer.html?${this._photographer.id} tabindex="10" aria-label="Aller sur la page de ${this._photographer.name} originaire de ${this._photographer.city} , ${this._photographer.country}">
                    <img 
                        src = "assets/photographers/${this._photographer.portrait}"
                        alt="${this._photographer.name} " portrait"
                        role="img"
                        class="imgPortait"
                    />
                
                    <aside class="asidePhotohgrapher">
                        <h2> ${this._photographer.name} </h2>
                        <p> ${this._photographer.city} , ${this._photographer.country} </p>
                        <p> ${this._photographer.tagline} </p>
                        <p> ${this._photographer.price} "$ / jour" </p>
                    </aside> 
                </a>
                  
        ` 
        $wrapperPhotographer.innerHTML = mediaCardImg
        return $wrapperPhotographer
        
    }
}

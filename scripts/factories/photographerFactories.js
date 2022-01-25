
/*function photographerFactory(photographers) {
    const { name, id, city, country, tagline, price, portrait } = photographers;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( "article" );
        article.setAttribute("id", id);
            const linkPhographer = document.createElement( "a" );
            linkPhographer.setAttribute("href", "photographer.html?"+id);
            const img = document.createElement( "img" );
                img.setAttribute("src", picture);
                img.setAttribute("alt", name + " portrait");
                img.setAttribute("role", "img");
                img.setAttribute("classe", "imgPortait");
            const aside = document.createElement( "aside" );
                const h2 = document.createElement( "h2" );
                h2.textContent = name;
                const p = document.createElement( "p" );
                p.textContent = city + ", " + country;
                const p1 = document.createElement( "p" );
                p1.textContent = tagline;
                const p2 = document.createElement( "p" );
                p2.textContent = price + "$ / jour";
        article.appendChild(linkPhographer);
            linkPhographer.appendChild(img);
                linkPhographer.appendChild(aside);
                    aside.appendChild(h2);
                    aside.appendChild(p);
                    aside.appendChild(p1);
                    aside.appendChild(p2);
        return (article);
    }
    return { name, id, city, country, tagline, price, picture, getUserCardDOM }
}
*/
class photographerCard {
    constructor(photographer) {
        this._photographer = photographer
    }
    
    
    createPhotographersCard() {
        const $wrapperPhotographer = document.createElement("article")
        $wrapperPhotographer.setAttribute("id", this._photographer.id);
        
       const mediaCardImg = `
                <a href = "photographer.html?${this._photographer.id}">
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

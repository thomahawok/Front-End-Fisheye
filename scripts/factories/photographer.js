
function photographerFactory(photographers) {
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


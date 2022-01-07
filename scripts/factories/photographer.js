function photographerFactory(data) {
    const { name, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const linkPhographer = document.createElement( 'a' );
        linkPhographer.setAttribute("href", "");
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", name + ' portrait');
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const p = document.createElement( 'p' );
        p.textContent = city + ', ' + country;
        const p1 = document.createElement( 'p' );
        p1.textContent = tagline;
        const p2 = document.createElement( 'p' );
        p2.textContent = price + '$ / jour';
        article.appendChild(linkPhographer);
        linkPhographer.appendChild(img, h2);
        linkPhographer.appendChild(h2);
        linkPhographer.appendChild(p);
        linkPhographer.appendChild(p1);
        linkPhographer.appendChild(p2);
        return (article);
    }
    return { name, city, country, tagline, price, picture, getUserCardDOM }
}
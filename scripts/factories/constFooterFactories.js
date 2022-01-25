class constFooter {
    constructor(photographer) {
        this._photographer = photographer
    }

    createCounterFooter() {
        const footer = document.createElement("footer")
        
        footer.classList.add("counterFooter")
        
            const mediaFooter = `
                <section class="photographerFooter">
                    <aside class="photographerFooter_aside">
                        <P class="photographerFooter_aside_totalLikes" aria-label="Nomre total de j'aime"></P>
                        <i class="fas fa-heart" aria-hidden="true"></i>
                    </aside>
                    <p class="photographerFooter_price" aria-label="">${this._photographer.price} €/jour </p>
                </section>
            `
        footer.innerHTML = mediaFooter
        return footer
    }
}
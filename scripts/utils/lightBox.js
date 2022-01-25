
/**
 * Lightbox for show photographers medias
 * @constant {HTMLElement} galleryMedias - Get elements in medias gallery
 * @constant {string []} arrayJpgMp4 - Get all elements who contains img and video
 * @constant {string []} arraySrc - Get attributes src of all medias
 */
class Lightbox {
	static init() {
	/*** ceate array of sources medias ***/
	/*** créé un tableau des sources des médais ***/
		const galleryMedias = document.querySelector(".photograph_media");
        const arrayJpgMp4 = Array.from(galleryMedias.querySelectorAll('img[src$=".jpg"],source[src$=".mp4"]'));
        const arraySrc = arrayJpgMp4.map((link) => link.getAttribute("src"));


	/*** for eatch element of arrayJpgMp4 create new lightbox with src target and arraySrc arguements***/ 
	/*** pour chaque élément de arrayJpgMp4 créé une nouvelle lightbox avec les arguments src target et arraySrc ***/    
		arrayJpgMp4.forEach((link) => {
			link.addEventListener("click", (e) => {
				e.preventDefault();
				new Lightbox(e.currentTarget.getAttribute("src"), arraySrc);
			});
			/** HS enter **/
			link.addEventListener("keyup", (e) => {
				if (e.keyCode === 13) {
					e.preventDefault();
					new Lightbox(e.currentTarget.getAttribute("src"), arraySrc);
				} else {
					return;
				}
			});
		});	
	}
	

	/**
	*
	* @param {string} src Media src
	* @param {string[]} arraySrc Array of medaid
	* @param {string} alt Alt media text
	*/
	constructor(src, arraySrc) {
		this.element = this.buildDOM(src); 						/*construit DOM à partir de la source du média (=le href)*/
		document.body.appendChild(this.element);				/* ajoute "elemente dans le body HTML*/
		this.arraySrc = arraySrc;
		this.modifySrcPath(src);
		this.loadMedia(src, arraySrc);
		this.onKeyUp = this.onKeyUp.bind(this);
		document.addEventListener("keyup", this.onKeyUp);
		
	}

	/*** change the path src /assets/thumbnails/... (thumbnails) to /assets/Sapmle Photos/...(medias grandes tailles)) */
	/*** modifie le chemin src /assets/thumbnails/... (vignettes) vers /assets/Sapmle Photos/...(large size media)) */
	modifySrcPath(src) {
		let arrayPath = src.split("/");
		arrayPath.splice(2, 1, "Sample Photos");
		const srcMediaPath = arrayPath.join("/");
		return srcMediaPath;	
	}

	/*** récupère le titre du média */
	/*** get media title */
	getMediaTitle(src) {
		const arrayPath = src.split("/");
		const string = arrayPath[arrayPath.length - 1].split(".")[0];
		const TitelMedia = string.replaceAll("_", " ");
		return TitelMedia;
	}
	
	/**
	* @param {string} src Media src
	* @param {string} alt Media alt text
	*/
	/*** building the HTML architecture ***/
	/*** construction de l'architecure HTML ***/
	loadMedia(src, alt) {
		this.src = src;
		this.alt = alt;

		if (src.endsWith(".mp4")) {
			const video = document.createElement("video");
			const container = this.element.querySelector(".lightbox__container");
			const legend = document.createElement("p");
			legend.innerHTML += this.getMediaTitle(src);
			container.innerHTML = "";
			container.appendChild(video);
			container.appendChild(legend);
			video.setAttribute("controls", "");
			video.src = src;
		} else if (src.endsWith(".jpg")) {
			const image = new Image();
			const container = this.element.querySelector(".lightbox__container");
			const legend = document.createElement("p");
			legend.innerHTML += this.getMediaTitle(src);
			container.innerHTML = "";
			container.appendChild(image);
			container.appendChild(legend);
			image.alt = this.getMediaTitle(src);
			image.src = this.modifySrcPath(src);
			image.classList.add("lightbox__container__img");
		}
	}

	/**
	 * @param {KeyboardEvent} e
	 */
	onKeyUp(e) {
		if (e.key === "Escape") {
			this.close(e);
		} else if (e.key === "ArrowLeft") {
			this.next(e);
		} else if (e.key === "ArrowRight") {
			this.previous(e);
		}
	}

	/**
	 * Close modal
	 * @param {MouseEvent | KeyboardEvent} e
	 */
	close(e) {
		e.preventDefault();
		this.element.classList.add("fadeOut");
		window.setTimeout(() => {
			this.element.remove(this.element);
		}, 500);
		document.removeEventListener("keyup", this.onKeyUp); 
	}

	/**
	 * Switch to the next media
	 * @param {MouseEvent | KeyboardEvent} e
	 */
	next(e) {
		e.preventDefault();
		let i = this.arraySrc.findIndex((image) => image === this.src);
		console.log(this.arraySrc)
		console.log(i)
		if (i === this.arraySrc.length - 1) {
			i = -1;
		}
		this.loadMedia(this.arraySrc[i + 1]);
	}

	/**
	 * Switch to the previous media
	 * @param {MouseEvent | KeyboardEvent} e
	 */
	previous(e) {
		e.preventDefault();
		let i = this.arraySrc.findIndex((image) => image === this.src);
		if (i === 0) {
			i = this.arraySrc.length;
		}
		this.loadMedia(this.arraySrc[i - 1]);
	}

	/**
	 *
	 * @return {HTMLElement}
	 */
	buildDOM() {
		const DOM = document.createElement("div");
		DOM.classList.add("lightbox");
		DOM.innerHTML = `
            <button class="lightbox__close" aria-label="Fermer la visualition du média">Fermer</button>
            <button class="lightbox__next" aria-label="Image suivante">Suivant</button>
            <button class="lightbox__prev" aria-label="Image précédente">Précédent</button>
            <div class="lightbox__container" role="dialog" aria-label="">
                <p class="lightbox__container__img-title"></p>
            </div>`;
        /***création des évènements icic car c'est au moment de la construction du DOM qu'il sera possible de trouver les élements et greffer les compotrements*/
		DOM.querySelector(".lightbox__close").addEventListener("click", this.close.bind(this)); /**** bing(this) pour que this à l'interrieur du close fasse référence à l'instance de lightbox et non à l'élement sur lequel on à cliké ****/
		DOM.querySelector(".lightbox__next").addEventListener("click", this.next.bind(this));
		DOM.querySelector(".lightbox__prev").addEventListener("click", this.previous.bind(this));
		return DOM;
	}
}


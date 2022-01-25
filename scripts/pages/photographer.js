async function  getPhotographer() {
  mediasApiPhotographers = new mediasApi('./data/photographers.json')
  const photographersAll = await mediasApiPhotographers.getPhotographers()
  const queryStingUrlId = window.location.search;
  const idPhotographer = queryStingUrlId.slice(1);
  const photographerId = photographersAll.find((element) => element.id == idPhotographer);
  //console.log(photographerId)
  return (photographerId)
} 

async function  displayDataPhotographer() {
  const photographerId = await getPhotographer();
  const photographersHeader = document.querySelector(".photograph_header");
  const photographerModel =  new photographerCard(photographerId);
  photographersHeader.appendChild(photographerModel.createPhotographersCard())
} 

displayDataPhotographer() 


class appMedias {
  constructor() {
      this.$mediasFooter = document.querySelector('body')
      this.mediasApi = new mediasApi('./data/photographers.json')
  }

  async main() {
      /*-- création des médias --*/
          /*-- medias = ensemble des medias du fichier JSON --*/
          const medias = await this.mediasApi.getMedias()
          /*-- idPhotographer = id du photographe de la barre d'addresse du navigateur --*/
          const idPhotographer = window.location.search.slice(1);  
          /*-- mediasId = ensemble des medias du photographe de la page --*/
          const mediasId = medias.filter((element) => element.photographerId == idPhotographer)

          updateGallery(mediasId)

          /*-- Incrémente / décrémente le nombre de likes --*/
          LikeDontLike(mediasId) 

      /*-- création du footer likes et prix --*/
          /*-- photographer = ensemble des photographes du fichier JSON --*/  
          const photographers = await this.mediasApi.getPhotographers()
          /*-- Photographer = données du photographe --*/
          const photographer = photographers.find((element) => element.id == idPhotographer);
          const FooterLikesPice = new constFooter(photographer)
          this.$mediasFooter.appendChild(FooterLikesPice.createCounterFooter())
          /*-- calcul le nombre total de likes --*/
          totalCuntLikes()

      /*-- création du trie par popularité et titre --*/
      const dropDownMenu = document.querySelector("#dropDownMenu")
      dropDownMenu.addEventListener("change", function (event) {
              $mediasWrapper.innerHTML = "";
              const getOption = event.target.value 
              const option = sortByOption(mediasId, getOption);
              updateGallery(option)
             Lightbox.init()
          });
          Lightbox.init()
  }
}

const app = new appMedias()
app.main()

/*-- création de la gallerie de medias--*/
function updateGallery (gallery){
  $mediasWrapper = document.querySelector('.photograph_media')
  gallery.forEach(media => {
      const Template = new mediaCard(media)
      $mediasWrapper.appendChild(Template.createMediaCard())        
  })
}


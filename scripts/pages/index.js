

/*
async function displayData(photographers) {
    //console.log(photographers);
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};
*/



async function displayData() {
  mediasApiPhotographers = new mediasApi('./data/photographers.json')
     
        const photographersAll = await mediasApiPhotographers.getPhotographers()
         
         
        const photographersSection = document.querySelector(".photographer_section");
        photographersAll.forEach(photographer => {
          const TemplatePhotographer = new photographerCard(photographer)
          photographersSection.appendChild(TemplatePhotographer.createPhotographersCard())        
        })
}

displayData()

//const app = new appPhotographers()
//app.mainPhotographers()


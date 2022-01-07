/*
 * Send an email via SMTP
 * @param { (String | Array) } to
 * @param { String } text
 * @param { String } subject
 * @return { Promise }
 */

async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
  let photographers = [];

  await fetch("./data/photographers.json")
  .then((res) => res.json())
  .then((data) => {
    photographers = data.photographers;
  });
// et bien retourner le tableau photographers seulement une fois
    console.log(photographers);
    return ({
        photographers: [...photographers]})       
};
   

async function displayData(photographers) {
    console.log(photographers);
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};
    
init();  
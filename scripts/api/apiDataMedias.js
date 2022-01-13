
async function getMedias() {
    
  let medias = [];

  await fetch("./data/photographers.json")
  .then((res) => res.json())
  .then((data) => {
    medias = data.media;
    

  });
    return ({
        medias: [...medias]})       
};

async function init() {
  // Récupère les datas Medias des photographes
  const { medias } = await getMedias();
  displayDataMedia(medias);
};
  
init(); 


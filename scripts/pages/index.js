async function displayData () {
  mediasApiPhotographers = new MediasApi('./data/photographers.json')

  const photographersAll = await mediasApiPhotographers.getPhotographers()

  const photographersSection = document.querySelector('.photographer_section')
  photographersAll.forEach(photographer => {
    const TemplatePhotographer = new PhotographerCard(photographer)
    photographersSection.appendChild(TemplatePhotographer.createPhotographersCard())
  })
}

displayData()

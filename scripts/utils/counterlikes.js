function LikeDontLike(mediasId) {
       
  document.addEventListener("click" , (event) => {

    let verifyNumberID = event.target.id
      
      if (!isNaN(verifyNumberID) && (!!verifyNumberID)){
        let oldCount = Number(event.target.parentElement.firstElementChild.textContent)
        let idCliCk = event.target.id
        let indexData = mediasId.findIndex ((element => element.id == idCliCk))
        let numberLikes = event.target.parentElement.firstElementChild

        if ( oldCount ==  mediasId[indexData].likes) {
            let newCount = oldCount +1
            numberLikes.innerHTML = newCount
            let eTarget = event.target
            console.log(eTarget)
            eTarget.className = "fa-x2 fas fa-heart"
            eTarget.setAttribute("aria-label", "Ajouter un j'aime")
        } else {
            newCount = oldCount -1
            numberLikes.innerHTML = newCount
            let eTarget = event.target
            console.log(eTarget)
            eTarget.className = "fa-x2 far fa-heart"
            eTarget.setAttribute("aria-label", "Retirer le j'aime")
        }
          
        totalCuntLikes ()
      }
  })
}

function totalCuntLikes (){
  const arrayLikes = document.querySelectorAll("p.numberLikes")
  let totalLikes = 0
  
  for (i=0; i<arrayLikes.length; i++){
      totalLikes += Number(arrayLikes[i].innerHTML)
  }
  
 let totalLikesP = document.querySelector("P.photographerFooter_aside_totalLikes")
 totalLikesP.innerHTML = totalLikes
}


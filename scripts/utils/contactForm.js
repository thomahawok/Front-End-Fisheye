function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function validate() {
  if (first.checkValidity() && last.checkValidity() && email.checkValidity()) {
      return true;
  } else {
    return false; 
  }
};



/*
const btnSubmit = document.querySelector("#btsubmit")

const photographerIda = getPhotographer();
console.log(photographerIda)
photographerIda.then((value) => {
console.log(value.id)
const formAction = document.querySelector("#form")
formAction.setAttribute("action", "photographer.html?"+value.id)

})
*/
form.addEventListener("submit", (e) =>{
  e.preventDefault();                                                             // Stop la soumition du formulaire
 
  if (validate()) {                                        
    
    const formValues = {
      prenom : document.querySelector("#first").value,
      nom : document.querySelector("#last").value,
      mail :  document.querySelector("#email").value,
      text : document.querySelector("#messageText").value,
    }
    localStorage.setItem("formValues", JSON.stringify(formValues))

    
    document.forms["form"].submit();
    
  } else {
    return false
  };

})
//app.main()
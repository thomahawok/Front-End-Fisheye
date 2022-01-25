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

form.addEventListener("submit", (e) =>{
  e.preventDefault();                                                             // Stop la soumition du formulaire
 
  if (validate()) {                                        
    
    let formValues = {
      prenom : document.querySelector("#first").value,
      nom : document.querySelector("#last").value,
      mail :  document.querySelector("#email").value,
      text : document.querySelector("#messageText").value,
    }
    
    console.log(formValues)

    document.querySelector(".modal").style.display = "none";

    let formValues = {
      prenom : "",
      nom : "",
      mail :  "",
      text : "",
    }
    
  } else {
    return false
  };

})


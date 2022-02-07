function displayModal () {
  const modal = document.getElementById('contact_modal')
  modal.style.display = 'block';
}

function closeModal () {
  const modal = document.getElementById('contact_modal')
  modal.style.display = 'none'
}

const first = document.querySelector('#first')
const last = document.querySelector('#last')
const email = document.querySelector('#email')

function validate () {
  if (first.checkValidity() && last.checkValidity() && email.checkValidity()) {
    return true
  } else {
    return false
  }
};
const form = document.querySelector('#form')
form.addEventListener('submit', (e) => {
  e.preventDefault() // Stop la soumition du formulaire

  if (validate()) {
    const formValues = {
      prenom: document.querySelector('#first').value,
      nom: document.querySelector('#last').value,
      mail: document.querySelector('#email').value,
      text: document.querySelector('#messageText').value
    }
    localStorage.setItem('formValues', JSON.stringify(formValues))
    console.log(formValues)
    document.querySelector('.modal').style.display = 'none'
  } else {
    return false
  }
})

// Step One
const forms = document.querySelectorAll('form');

// Step Two

const dateAdminInput = document.querySelector('input.dateAdminInput');
let today = new Date();
let day = today.getDate();
if (day < 10) {
    day = '0' + day
}
dateAdminInput.setAttribute('min',`${today.getFullYear()}-${today.getMonth() + 1}-${day}`)

dateAdminInput.addEventListener('input',function() {
  if (`${this.value}` != '') {
    // Loop On Elemetns
    forms.forEach(form => {
      if (new FormData(form).getAll('date').join().toLowerCase().split(',')[0].includes(dateAdminInput.value)) {
          form.classList.add('show');
      } else {
        if (form.classList.contains('show')) {
          form.classList.remove('show');
        }
      }
    })
  }
})

function sortElementsByDateTime() {
    // Convert the forms into an array for easier sorting
    const formsArray = Array.from(forms);

    // Sort the forms based on the "date" value
    formsArray.sort((a, b) => {
      const dateA = new Date(a.querySelector('input[name="date"]').value);
      const dateB = new Date(b.querySelector('input[name="date"]').value);
      return dateA - dateB;
    });

    forms.forEach(form => form.remove());
    formsArray.forEach(form => {
      document.body.appendChild(form);
    });
  }

// Call the function to sort the elements
sortElementsByDateTime();

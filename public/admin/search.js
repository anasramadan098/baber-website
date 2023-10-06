// Step One

// const searchBar = document.querySelector('#search');
// const selectValue = document.querySelector('select');
const forms = document.querySelectorAll('form');

// searchBar.addEventListener('input', function() {
//   if (searchBar.value.length != 0) {
//     // Loop On Elemetns
//     forms.forEach(form => {
//         form.style.display = 'none';
//         if ( new FormData(form).getAll(selectValue.value.toLowerCase()).join().toLowerCase().includes(searchBar.value)) {
//             form.style.display = 'block';
//         }
//     })
//     // Specefic The Data By Select Value

//   } else {
//     forms.forEach(form => form.style.display = 'block')
//   }
// });


// Step Two

const dateAdminInput = document.querySelector('input.dateAdminInput');
let today = new Date();
let day = today.getDay() + 1;
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
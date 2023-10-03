const searchBar = document.querySelector('#search');
const selectValue = document.querySelector('select');
const forms = document.querySelectorAll('form');

searchBar.addEventListener('input', function() {
  if (searchBar.value.length != 0) {
    // Loop On Elemetns
    forms.forEach(form => {
        form.style.display = 'none';
        if ( new FormData(form).getAll(selectValue.value.toLowerCase()).join().toLowerCase().includes(searchBar.value)) {
            form.style.display = 'block';
        }
    })
    // Specefic The Data By Select Value

  } else {
    forms.forEach(form => form.style.display = 'block')
  }
});
const selectInput = document.querySelector('select.selectInput');
const dateInput = document.querySelector('input[type="date"]');
const lastSelectData = selectInput.innerHTML;



fetch('../files/booking.json').then(res=> res.json()).then(data=> {
    dateInput.addEventListener('input',()=> {
        let isFound = false

        data.forEach(myDate => {
            if (dateInput.value == myDate.day) {
                isFound = true;
                selectInput.innerHTML = ' ';
                // Create Uniqe Option
                const uniqeOption = document.createElement('option');
                uniqeOption.value = '';
                uniqeOption.innerHTML = 'Select Time'
                uniqeOption.selected = true;
                uniqeOption.disabled = true;
                selectInput.appendChild(uniqeOption);
                // End Create
                myDate.avalibleDates.map(value => {
                    console.log(value);
                    const option = document.createElement('option');
                    // Filter The TEXT
                    if (value.split(':')[0] > 12) {
                        // This Is PM
                        option.innerHTML = '0' + Number(value.split(':')[0] - 12) + `:${value.split(':')[1]} PM`;
                    } else if (value.split(':')[0] == 12) {
                        option.innerHTML = Number(value.split(':')[0]) + `:${value.split(':')[1]} PM`;

                    } else {
                        option.innerHTML = value + ' AM';
                    }
                    option.value = value;
                    selectInput.appendChild(option);
                })
            }
        });


        if (!isFound) {
            selectInput.innerHTML = lastSelectData;
        }
    })

})



function filterDataOn(option,value) {
}
const selectInput = document.querySelector('select.selectInput');
const dateInput = document.querySelector('input[type="date"]');
const lastSelectData = selectInput.innerHTML;
const servicesInput = document.querySelector('.servicesInput');
let today = new Date();
let day = today.getDay() + 1;
if (day < 10) {
    day = '0' + day
}
dateInput.setAttribute('min',`${today.getFullYear()}-${today.getMonth() + 1}-${day}`)

const services = ['Haircut & blowdry,25', 'Buzz cut,20', 'Beard trim,15', 'Hair wash and blowdry,3', 'Clean shave,15', 'Haircut & beard trim & blowdry,35', 'Head shave & beard trim,35', 'Haircut & clean shave,35', 'Buzz cut & beard,30']
services.map(service=> {
    let option = `<option data-price="${service.split(',')[1]}€" value="${service.split(',')[0]}">${service.split(',')[0]}</option>`;
    return servicesInput.innerHTML += option;
})

servicesInput.addEventListener('input',function() {
    services.map(service=> {
        if (service.split(',')[0] == this.value) {
            document.querySelector('.price span').innerHTML = service.split(',')[1] + '€'
        }
    })
})

fetch('../files/booking.json').then(res=> res.json()).then(data=> {
    dateInput.addEventListener('input',()=> {
        console.log(dateInput.value);
        const allTimes = [
            '09:30',
            '10:00',
            '10:30',
            '11:00',
            '11:30',
            '12:00',
            '12:30',
            '13:00',
            '13:30',
            '14:00',
            '14:30',
            '15:00',
            '15:30',
            '16:00',
            '16:30',
            '17:00',
            '17:30',
        ]
        const inputValue = dateInput.value
        let isFound = false
        if (data.length == 0) {
            allTimes.forEach(time=> {
                const option = document.createElement('option');
                option.value = time;
                option.textContent = time;
                selectInput.appendChild(option);
            })
        } else {
            data.forEach(myDate => {
                if (inputValue == myDate.day) {
                    isFound = true;
                    selectInput.innerHTML = '';
                    // Create Uniqe Option
                    const uniqeOption = document.createElement('option');
                    uniqeOption.value = '';
                    uniqeOption.innerHTML = 'Select Time'
                    uniqeOption.selected = true;
                    uniqeOption.disabled = true;
                    selectInput.appendChild(uniqeOption);
                    // End Create 
                    // Filter Dates
                    const filteredTimes = allTimes.filter(time => !myDate.bookedDates.includes(time));
                    filteredTimes.map(value => {
                        const option = document.createElement('option');
                        option.innerHTML = value;
                        option.value = value;
                        // Get the time in milliseconds from the option's value
                        // Split The Data
                        let dateData = option.innerHTML.split(':');
                        // Set New Date
                        let optionDate = new Date().setHours(dateData[0],dateData[1]);
                        // Get Momnent 
                        let moment = new Date();
                        let test = moment.setHours(moment.getHours(), moment.getMinutes());
                        if (test <= optionDate) {
                            selectInput.appendChild(option);
                        }
                    })
                } else {
                    allTimes.forEach(time=> {
                        const option = document.createElement('option');
                        option.value = time;
                        option.textContent = time;
                        selectInput.appendChild(option);
                    })
                }
            });
        }

        if (new Date(inputValue).toUTCString().split(',')[0] == 'Sun') {
            selectInput.innerHTML = '<option selected disabled value="">Holiday Time</option>'
        }
    })

})

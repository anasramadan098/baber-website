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

const services = ['Haircut & blowdry', 'Buzz cut', 'Beard trim', 'Haar wassen en föhnen', 'Clean shave', 'Haircut & beard trim & blowdry\n                ', 'Head shave & beard trim', 'Haircut & clean shave', 'Buzz cut & beard']


services.map(service=> {
    let option = `<option value="${service}">${service}</option>`;
    return servicesInput.innerHTML += option;
})

fetch('../files/booking.json').then(res=> res.json()).then(data=> {
    dateInput.addEventListener('input',()=> {
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

        data.forEach(myDate => {
            if (inputValue == myDate.day) {
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
                // Filter Dates

                const filteredTimes = allTimes.filter(time => !myDate.bookedDates.includes(time));

                filteredTimes.map(value => {
                    const option = document.createElement('option');
                    option.innerHTML = value;
                    option.value = value;
                    if (value = '13:00') {
                        option.innerHTML = '13:00'
                    }
                    // Get the time in milliseconds from the option's value
                    // Split The Data
                    let dateData = option.innerHTML.split(':');
                    // Set New Date
                    let optionDate = new Date().setHours(dateData[0],dateData[1]);
                    // Get Momnent 
                    let moment = new Date();
                    let test = moment.setHours(moment.getHours() - 12, moment.getMinutes())
                    if (test <= optionDate) {
                        selectInput.appendChild(option);
                    }
                })
            }
        });


        if (!isFound) {
            selectInput.innerHTML = lastSelectData;
        }
        if (new Date(inputValue).toUTCString().split(',')[0] == 'Sun') {
            selectInput.innerHTML = '<option selected disabled value="">Holiday Time</option>'
        }
    })

})

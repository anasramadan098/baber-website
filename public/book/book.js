const selectInput = document.querySelector('select.selectInput');
const dateInput = document.querySelector('input[type="date"]');
const servicesInput = document.querySelector('.servicesInput');
const services = ['Haircut & blowdry,25', 'Buzz cut,20', 'Beard trim,15', 'Hair wash and blowdry,3', 'Clean shave,15', 'Haircut & beard trim & blowdry,35', 'Head shave & beard trim,35', 'Haircut & clean shave,35', 'Buzz cut & beard,30'];

let today = new Date();
let day = today.getDate();
if (day < 10) {
    day = '0' + day;
}
dateInput.min = `${today.getFullYear()}-${today.getMonth() + 1}-${day}`;

servicesInput.innerHTML = services.map(service => {
    const [name, price] = service.split(',');
    return `<option data-price="${price}€" value="${name}">${name}</option>`;
}).join('');

servicesInput.addEventListener('input', function() {
    const selectedService = services.find(service => service.split(',')[0] === this.value);
    if (selectedService) {
        document.querySelector('.price span').innerHTML = selectedService.split(',')[1] + '€';
    }
});

fetch('../files/booking.json')
    .then(res => res.json())
    .then(data => {
        dateInput.addEventListener('input', () => {
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
            ];
            const inputValue = dateInput.value;
            if (data.length === 0 || !data.some(myDate => myDate.day === inputValue)) {
                selectInput.innerHTML = allTimes.map(time => `<option value="${time}">${time}</option>`).join('');
            } else {
                const myDate = data.find(myDate => myDate.day === inputValue);
                selectInput.innerHTML = `<option selected disabled value="">Select Time</option>`;
                const filteredTimes = allTimes.filter(time => !myDate.bookedDates.includes(time));
                filteredTimes.forEach(value => {
                    const option = document.createElement('option');
                    option.innerHTML = value;
                    option.value = value;
                    const now = new Date();
                    const currentTime = now.setHours(now.getHours(),now.getMinutes());
                    const [hours,min] = option.value.split(':');
                    const optionTimeDate = new Date(inputValue).setHours(hours,min);
                    if (currentTime <= optionTimeDate) {
                        selectInput.appendChild(option);
                    }
                });
            }

            if (new Date(inputValue).getDay() === 0) {
                selectInput.innerHTML = '<option selected disabled value="">Holiday Time</option>';
            }
        });
    });


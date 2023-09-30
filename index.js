const fs = require('fs');

// My Components

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'anasramadanking@gmail.com',
    pass: 'szrb kmkc tgyp whyp',
  },
});

const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
  // res.send(code);
});

app.post('/test',(req,res) => {
  res.send('Tested');
} )

app.post('/form', (req, res) => {
  // Get Form Data
  const formData = req.body;
  // Write File And Save Dates
  fs.readFile('./public/files/dates.txt','utf-8',(err,allData) => {
    let date = req.body.date;
    let ifBooked = false;
    if (err) {
      console.log(err);
    }
    // Set AM or PM
    let hourTime = ' AM';
    if (date[1].split(':')[0] >= 12) {
      hourTime = ' PM';
    } else {
      hourTime = ' AM';
    }

    // Get Index
    let id;

    // Check If Booked Before
    let splitedData = allData.split(',');
    splitedData.map(myData => {
      // Get Data That Equal
      let newDate;
      if (date[1].split(':')[0] >= 12) {
        newDate = date.join(' , ') + ' PM';
      } else {
        newDate = date.join(' , ') + ' AM'
      }
      if (' ' + newDate == myData.trim().split('_').slice(1).join()) {
        ifBooked = true;
      } 
    })
    // Set Mail Options 
    let msg;
    if (ifBooked) {
      // Set Msg
      msg = `<h2>This Date Was Booked. The Dates Booked Is:</h2> <br> ${allData.split(',').map(e=> {
        let msgData = e.split('_');
        if (msgData[1] != undefined) {
          return `<p style="font-size:1.3em;color:#222;">Date: ${msgData[1]}, On This Time: ${msgData[2]} </p> <br>`
        }
      })}`

      res.send(msg);
    } else {
      // Complete Getting Index
      if (allData.split(',')[allData.split(',').length - 2] == undefined) {
        id = 1
      } else {
        id = Number(allData.split(',')[allData.split(',').length - 2].split('_')[0]) + 1;
      }
      


      // Write On Booking.json File The Newest Date  day,avalibleDates
      let bookingJsonFileData = JSON.parse(fs.readFileSync('./public/files/booking.json','utf-8'));
      // Get The Previous Dates
      if (bookingJsonFileData.length != 0) {
        bookingJsonFileData.map(obj=> {
          if (obj.day == date[0]) {
            // Remove It
            bookingJsonFileData =  bookingJsonFileData.slice(bookingJsonFileData.indexOf(obj) + 1)
            let writeData = [];
            obj.avalibleDates.map(time => {
              if (time != date[1]) {
                writeData.push(time);
              }
            })
            bookingJsonFileData.push({"day":date[0], "avalibleDates": writeData})
          } else {
            // Add An Date
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
        let filterdTimes = [];
        allTimes.map(time => {
          if (time != date[1]) {
            filterdTimes.push(time);
          }
        })
        bookingJsonFileData.push({"day":date[0], "avalibleDates": filterdTimes})
          }
        })      
      } else {
        // Add An Date
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
        let filterdTimes = [];
        allTimes.map(time => {
          if (time != date[1]) {
            filterdTimes.push(time);
          }
        })
        bookingJsonFileData.push({"day":date[0], "avalibleDates": filterdTimes})
        // Write On The File The New Data
      }

      // Write On The File The New Data
      fs.writeFileSync('./public/files/booking.json',JSON.stringify(bookingJsonFileData))

      res.send(`<h1 style="color:#edac66;">${formData.date}</h1> <p>Is Your Booking Date, Don"t Forget. <a href="https://mail.google.com/">Check Your Email</a></p>`);


      const mailOptions = {
        from: '"Anas Ramadan" <anasramadanking@gmail.com>',
        to: formData.email,
        subject: 'Email From Barber Sam Website To ' + formData.name,
        html: `<!DOCTYPE html>
        <html>
        <head>
          <style>
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
            body {
              color: #333;
              direction:ltr;
            }
            * {
              font-family: 'Bebas Neue', sans-serif;
              text-align:left;
            }
            h1 {
              color: #edac66;
              font-size: 24px;
              margin-bottom: 10px;
            }
        
            h3 {
              font-size: 18px;
              margin-top: 20px;
            }
        
            p {
              font-size: 16px;
              line-height: 1.5;
              margin-bottom: 10px;
            }
        
            span {
              font-weight: bold;
            }
        
            a {
              color: #007bff;
              text-decoration: none;
            }
        
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #ccc;
              border-radius: 5px;
              background-color: #f9f9f9;
            }
        
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
        
            .details {
              margin-top: 30px;
            }
        
            .location {
              margin-top: 20px;
            }
        
            .contact {
              margin-top: 30px;
            }
        
            .contact p {
              margin: 5px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Dear ${formData.name}</h1>
              <p>We are delighted to confirm your upcoming appointment with BarberSam. Thank you for choosing our salon for your grooming needs.</p>
            </div>
            <div class="details">
              <h3>Date: ${formData.date[0]}</h3>
              <h3>Time: ${formData.date[1] + hourTime}</h3>
              <p><span>Barber:</span> BarberSam</p>
            </div>
            <div class="location">
              <p>Location:</p>
              <p>hilversum langestraat 55D</p>
            </div>
            <div class="message">
              <p>We hope you come five minutes early. This will allow you some time to relax and enjoy a cup of coffee before your appointment. Our team strives to provide you with the best service and ensure you have a comfortable experience.</p>
            </div>
            <div class="contact">
              <p>If you need to make any changes to your appointment or have any questions, please don't hesitate to contact us at <a href="tel:0686266621">0686266621</a>.</p>
              <p>Warm regards,</p>
              <p>Barber Sam</p>
              <p><a href="tel:0686266621">0686266621</a></p>
              <p>barbersam.sam@gmail.com</p>
              <p>barbersam.net</p>
            </div>
          </div>
        </body>
        </html>`,
      };
      sendEmail(mailOptions);

      // Set Data line
      const data = `${id} _ ${date[0]} _ ${date[1] + hourTime},`;

      allData += data
    };




    // Add New Data
    fs.writeFile('./public/files/dates.txt',allData,(e)=> {
      if (e) {
        console.log(e);
      }
    })
  })


});


          

function sendEmail (mailOptions) {

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    }
  });

}

// Get Users Comments
app.post('/add-comment',(req,res) => {
  const formData = req.body;
  const allComents = fs.readFileSync('./public/files/comments.json','utf-8');
  const paresedComments = JSON.parse(allComents);
  paresedComments.push({"name":formData.name,"comment":formData.comment})


  fs.writeFileSync('./public/files/comments.json',JSON.stringify(paresedComments));
  res.status(200).send('The Comment Added. You Can See It In This <a href="/comments">Link</a>');
})

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
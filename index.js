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
    if (date[1].split(':')[0] > 12) {
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
      if (date[1].split(':')[0] > 12) {
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
      
      res.send(`<h1 style="color:#edac66;">${formData.date}</h1> <p>Is Your Booking Date, Don"t Forget. <a href="https://mail.google.com/">Check Your Email</a></p>`);

      const mailOptions = {
        from: '"Anas Ramadan" <anasramadanking@gmail.com>',
        to: formData.email,
        subject: 'Test email To ' + formData.name,
        html: `<div style="direction: ltr;">
        <h1 style="color:#edac66;">Hello ${formData.name}</h1>.<br> <p> Your booking Id Is ${id} </p> <br> <h3>Your Booking Date Is:</h3> <br> <p>${formData.date}</p>
        </div>`,
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
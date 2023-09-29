const sqlite3 = require('sqlite3');

// const data = [
//   {"age":16},
//   {"age":16},
//   {"age":16},
//   {"age":16},
// ]

const fs = require('fs');



function writeFileOn(date) {
  fs.readFile('dates.txt','utf-8',(err,allData) => {
    if (err) {
      console.log(err);
    }
    // Set AM or PM
    let hourTime = ' AM';
    if (date[2].split(':')[0] > 12) {
      hourTime = ' PM';
    } else {
      hourTime = ' AM';
    }
    // Set Data line
    const data = `1 _ ${date[0]} _ ${date[1] + hourTime},`;
    console.log(data.split('_'));
    console.log(allData.split(','));

    // Check If Booked Before
    let splitedData = allData.split(',');
    splitedData.map(myData => {
      if (myData == data.replace(',','')) {
        ifBooked = true;
      } 
    })
    if (ifBooked) {
      console.log('Booked Before !');
    } else {
      allData += data
    };

    // See Booked Times
    console.log(allData.split(','));

    // Add New Data
    fs.writeFile('dates.txt',allData,(e)=> {
      if (e) {
        console.log(e);
      }
    })
  })
}

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



const code = `
  <form action="/form" method="post">
    <input type="email" required name="email" placeholder="write email">
    <input type="text"  required name="name" placeholder="write name">
    <input type="date" required name="date">
    <input type="time" required name="date">
    <textarea name="msg" placeholder="Write Your Msg"></textarea>
    <button>Submit</button>
  </form>
`;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(code);
});

app.post('/test',(req,res) => {
  res.send('Tested');
} )

app.post('/form', (req, res) => {
  // Get Form Data
  const formData = req.body;

  // Write File And Save Dates
  fs.readFile('dates.txt','utf-8',(err,allData) => {
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

    // if (allData.split(',')[allData.split(',').length - 2].split('_')[0] != undefined) {
    //   id = allData.split(',')[allData.split(',').length - 2].split('_')[0]
    // } else {
    //   id = 1;
    // }

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
      msg = `${formData.date} This Date Was Booked. The Dates Booked Is: <pre> ${allData.split(',').map(e=> {
        return `<b>${e}</b><br>`
      })} </pre>`

      console.log('Booked Before !');
    } else {
      // Complete Getting Index
      if (allData.split(',')[allData.split(',').length - 2] == undefined) {
        id = 1
      } else {
        id = Number(allData.split(',')[allData.split(',').length - 2].split('_')[0]) + 1;
      }

      // Set Msg
      msg = `${formData.date} Is Your Booking Date, Don"t Forget`
      
      const mailOptions = {
        from: '"Anas Ramadan" <anasramadanking@gmail.com>',
        to: formData.email,
        subject: 'Test email To ' + formData.name,
        html: `<h1 style="font-size:3em;color:red;">${msg}. Your booking Id Is ${id}</h1>`,
      };
      sendEmail(mailOptions);

      // Set Data line
      const data = `${id} _ ${date[0]} _ ${date[1] + hourTime},`;

      allData += data
    };



    // Add New Data
    fs.writeFile('dates.txt',allData,(e)=> {
      if (e) {
        console.log(e);
      }
    })
  })

  // fs.readFile('dates.txt', 'utf-8', (err, d) => {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  //   const arr = d.split(',');
  //   // Check If Time Pm Or Am
  //   let time = 'AM';
  //   console.log(arr[1].split(':')[0]);
  //   if (arr[1].split(':')[0] >= 12) {
  //     time = 'PM';
  //   } else {
  //     time = 'AM';
  //   }

  //   console.log(data.date,d);
  //   if (data.date == d) {
  //     console.log('Booked Before!');
  //   } else {
  //     writeFileOn(data.date)
  //   }
    
  // });

  res.status(200).send(`The Email Was Sent To ${formData.name}, Thank You!`);
});



function sendEmail (mailOptions) {

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    }
  });

}

function showError(err) {
  return (err) => {
    console.log(err);
  }
}

// db.run(`INSERT INTO dates (name, date) VALUES ("a","s")`);



app.get('/create/:id',(req,res) => {
  res.send('Done')
  

})

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
    
    //   // معالجة بيانات النموذج
    // const formData = require('form-data');
    // const request = require('request');
    

    // const email = formData.parse(request.body).email;
    // const name = formData.parse(request.body).name;
    // const msg = formData.parse(request.body).msg;

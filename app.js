const express = require('express');

const app = express()

app.use(express.json())

const users = []

// Get
app.get('/hello',(req,res)=> {

    res.send('Hello World');

})


app.get('/users',(req,res)=> {

    if (users.length == 0) {
        res.status(404).send('404 Error Found')
        return
    } else {
        res.send(users);
    }

})

// Post
app.post('/users',(rq,rs)=> {
    const user = rq.body;
    users.push(user)
    const theIndex = users.find( (e) => e.id === user.id)
    if (users.find( (e) => e.id === user.id)) {
        rs.status(404).send('This user Is Created Before');
        return
    }
    users.push()
    rs.status(201).send('Craeted users data');
} )


app.delete('/users/:id',(req,res) => {
    const {id} = req.params;
    const index = users.findIndex((userP) => userP.id == id)
    if ( index == -1) {
        res.status(400).send('The User Not Found')
    } else {
        users.splice(index,1);
        res.status(200).send('The User Deleted');
    }
})

app.listen(3000,() => {
    console.log('Started');
});

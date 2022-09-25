const express = require('express')
var bodyParser = require("body-parser");
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const db_name = 'Blogger';
const app = express()
const port = 2202
const nodemailer = require('nodemailer');


//static path:the entire public directory is made static
app.get('index.html', (req, res) => {
    res.sendFile(__dirname + 'index.html')

})

app.get('contact.html', (req, res) => {
    res.sendFile(__dirname + 'contact.html')

})

app.get('form.html', (req, res) => {
    res.sendFile(__dirname + 'form.html')

})


app.use(bodyParser.urlencoded({
    extended: true
}));
const db = client.db(db_name)
app.post('form.html', function (req, res) {
    const name = req.body.name
   
    const email = req.body.email
    
    
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sdivyanshu5561@gmail.com',
            pass: 'rllqpkstuoejbugo'
        }
    })

    var mailoptions = {
        from: 'sdivyanshu5561@gmail.com',
        to: req.body.email,
        subject: 'Welcome to Blogger ' ,
       
        html: "Welcome to Blogger!!! Thank you for becoming a WORD on Bloggers.Now you have access to the Bloggers site.You can now share your thoughts 💭 and feelings to the world.<br><br> Your first challenge,if you choose to accept it ,pick any topic which you like the most and just write on it and post to the Bloggers.<br><br> We are thankful having you as a subscriber and a writer.😊"


    };

    transporter.sendMail(mailoptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            // res.send("Thanks for registering you will recieve confirmation mail Shortly..");
            // res.alert("Confirmation mail will be sent to you Shortly!! Thankyou.")
            // res.redirect('/');
            console.log("success")
            res.redirect('index.html');
        }

    })

    var data = {
        "name": name,
        "email": email,
        
       
    }
    db.collection('login').insertOne(data, function (err, collection) {
        if (err) console.log(err)
        else console.log("Record inserted")
    })

})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})


const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

const express = require('express')
const app = express();
const fs = require('fs');
const stripe = require('stripe')(stripeSecretKey)
const bodyParser = require('body-parser');
const MongoClient = require("mongodb").MongoClient;
const url = 'mongodb://127.0.0.1:27017/website';
const expressSession = require("express-session");
const flash=require("connect-flash");
app.disable("X-Powered-By");
const path = require("path");

// const products = [
// ];

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use('/home', express.static(path.join(__dirname, 'public')));
// app.use(session({
//   secret:"secret",
//   cookie:{maxAge:null},
//   resave:false,
// saveUninitioalized:false
// }));
app.use(flash());

//inserting reccords
app.get("/ins", (req, res) => {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db("website");
    dbo.collection("cart").insertMany(products, (err) => {
      if (err) throw err;
      console.log("all cart data inserted in the databse");
      db.close();
      // res.send(products);
      res.redirect("http://localhost:9000/appliance");

    });
  });
});



//find particular member ID
app.get("/ins/:id", (req, res) => {
  res.send(products.filter(member => member.id === parseInt(req.params.id)));
});

//this is for the logout
app.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect("http://localhost:9000/login");

});

//this is for the registration 
app.post('/registration', (req, res) => {
  MongoClient.connect(url, (err, db) => {
    const dbo = db.db("website");
    dbo.collection('user').findOne({ email: req.body.email}, (err, user) => {
      if (err) {
        res.status(501).send("not found");
        
      }
      else {
        if (!!user) {
          res.status(501).send("This Email Address is alredy exist");
         }  
        else {
         if(req.body.pwd===req.body.confirmpassword){
          dbo.collection("user").insertOne(req.body, (err) => {
            if (err) throw err;
            console.log("User Registration Record inserted");
            // db.close();
            res.redirect("http://localhost:9000/login");
          });
         }
         else{
          res.status(501).send("Password Does Not  Matched");
          // res.flash("Password Does Not  Matched");
         }
               }
      }
      db.close();
    });
  });
});


// this api for feach data form db to resister(login form)              
app.post('/login', (req, res) => {
  MongoClient.connect(url, (err, db) => {
    const dbo = db.db("website");
    dbo.collection('user').findOne({ email: req.body.email, pwd: req.body.password }, (err, users) => {
      if (err) {
        res.status(501).send("not found");
      }
      else {
        if (!!users) {
          res.redirect("http://localhost:9000/homepage");
        }
        else {
          res.redirect("http://localhost:9000/login");

        }
      }
      db.close();
    });
  });
});


// this api for feach data form db to resister(login form)              
app.post('/adminlogin', (req, res) => {
  MongoClient.connect(url, (err, db) => {
    const dbo = db.db("website");
    dbo.collection('admin').findOne({ email: req.body.email, pwd: req.body.password }, (err, users) => {
      if (err) {
        res.status(501).send("not found");
      }
      else {
        if (!!users) {
          res.redirect("http://localhost:9000/adminpanel");
        }
        else {
          res.redirect("http://localhost:9000/adminlogin");

        }
      }
      db.close();
    });
  });
});



app.get("/homepage", (req, res) => {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db("website");
    dbo.collection("products").find().toArray().then((results) => {
      res.render("homepage", {
        stripePublicKey: stripePublicKey,
        data: results
      });
    })
  });
});






app.get("/men", (req, res) => {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db("website");
    dbo.collection("products").find({ type: "mens" }).toArray().then((mensresults) => {
      res.render("men", {
        stripePublicKey: stripePublicKey,
        mdata: mensresults,
      });
    })
  });
});

app.get("/women", (req, res) => {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db("website");
    dbo.collection("products").find({ type: "womens" }).toArray().then((womensresults) => {
      res.render("women", {
        stripePublicKey: stripePublicKey,
        wdata: womensresults,
      });
    })
  });
});

app.get("/mobile", (req, res) => {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db("website");
    dbo.collection("products").find({ type: "mobile" }).toArray().then((mobileresults) => {
      res.render("mobile", {
        stripePublicKey: stripePublicKey,
        mobiledata: mobileresults,
      });
    })
  });
});


app.get("/shoes", (req, res) => {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db("website");
    dbo.collection("products").find({ type: "shoes" }).toArray().then((shoesresults) => {
      res.render("shoes", {
        stripePublicKey: stripePublicKey,
        shoesdata: shoesresults,
      });
    })
  });
});

app.get("/sport", (req, res) => {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db("website");
    dbo.collection("products").find({ type: "sport" }).toArray().then((sportresults) => {
      res.render("sport", {
        stripePublicKey: stripePublicKey,
        sportdata: sportresults,
      });
    })
  });
});

app.get('/cart', function (req, res) {
  fs.readFile('items.json', function (error, data) {
    if (error) {
      res.status(500).end()
    } else {
      res.render('cart.ejs', {
        stripePublicKey: stripePublicKey,
        // items: JSON.parse(data)
        products
      })
    }
  })
})



// this api for the insert the data into the mongodb(resistration form)              
app.post("/buy", (req, res) => {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db("website");
    dbo.collection("items").insertOne(req.body, (err) => {
      if (err) throw err;
      console.log("Record inserted");
      db.close();
      res.redirect("http://localhost:9000/checkout");
    });
  });
});

//to store billing details in the db
app.post("/payment", (req, res) => {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;

    const dbo = db.db("website");
    dbo.collection("payment").insertOne(req.body, (err) => {
      if (err) throw err;
      console.log(" Payment Record inserted");
      db.close();
      res.redirect("http://localhost:9000/appliance");
    });
  });
});

//this use to store rechargen info
app.post("/recharge", (req, res) => {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;

    const dbo = db.db("website");
    dbo.collection("recharge").insertOne(req.body, (err) => {
      if (err) throw err;
      console.log(" Rechargen Record inserted");
      db.close();
      res.redirect("http://localhost:9000/appliance");
    });
  });
});



//this use to store sport.
app.post("/medicine", (req, res) => {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;

    const dbo = db.db("website");
    dbo.collection("medicine").insertOne(req.body, (err) => {
      if (err) throw err;
      console.log("medicine Record inserted");
      db.close();
      res.redirect("http://localhost:9000/appliance");
    });
  });
});

// app.get("/login", (req, res) => {
//   res.sendFile(path.join(__dirname, "module", "login.html"));
// });
app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/adminlogin", (req, res) => {
  res.render("adminlogin");
});

app.get("/order", (req, res) => {
  res.sendFile(path.join(__dirname, "module", "order.html"));
});

app.get("/registration", (req, res) => {
  res.sendFile(path.join(__dirname, "module", "resi.html"));
});


app.get("/payment", (req, res) => {
  res.sendFile(path.join(__dirname, "module", "checkout.html"));
});


app.get("/recharge", (req, res) => {
  res.sendFile(path.join(__dirname, "module", "recharge.html"));
});

app.get("/sefty", (req, res) => {
  res.sendFile(path.join(__dirname, "module", "sefty.html"));
});


app.get("/medicine", (req, res) => {
  res.sendFile(path.join(__dirname, "module", "med.html"));
});


app.get("/donate", (req, res) => {
  res.sendFile(path.join(__dirname, "module", "donate.html"));
});







app.listen(9000, () => console.log("this server running on the port 9000"));





















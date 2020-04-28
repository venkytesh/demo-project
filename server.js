
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



app.listen(9000, () => console.log("this server running on the port 9000"));





















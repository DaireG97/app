export async function GET(req, res) {

  // Make a note we are on
  // the api. This goes to the console.
  console.log("in the api page")

//get the values entered in the regaister page
  // get the values
  // that were sent across to us.
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')
  const pass = searchParams.get('pass')
  //const dob = searchParams.get('dob')


  console.log(email);
  console.log(pass);
  //console.log(dob);

 // =================================================
const { MongoClient } = require('mongodb');
//your URL to atlas goes here 
  const url = 'mongodb+srv://b00158420:xVW3YqZbD64dSxBN@database.9wlabmp.mongodb.net/';
  const client = new MongoClient(url);
  
 //connect to the database and the collection 
  const dbName = 'app'; // database name
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('login'); // collection name



const findResult = await collection.insertOne({"username": email, "pass": pass});
console.log('Found documents =>', findResult);
 let valid=true;


 //==========================================================

  // at the end of the process we need to send something back.
  return Response.json({ "data":"" + valid + ""})
}


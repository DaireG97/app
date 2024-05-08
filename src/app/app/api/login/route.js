export async function GET(req, res) {


const {MongoClient} = require("mongodb");
// Replace the uri string with your connection string.
const url = 'mongodb+srv://b00158420:xVW3YqZbD64dSxBN@database.9wlabmp.mongodb.net/';
const client = new MongoClient(url);

console.log("connected to the server");

    
      // get the values
      // that were sent across to us.
    const {searchParams} = new URL(req.url)
    const email = searchParams.get('email')
    const pass = searchParams.get('pass')
    
    
    console.log(email);
    console.log(pass);


    const database = client.db('app');
    const logins = database.collection('login');
    // Query for a movie that has the title 'Back to the Future'
    const query = { username: 'sample@test.com' };
    const login1 = await logins.findOne(query);
    console.log(login1);

  return Response.json({ "Successful login":"" +query + ""})


  }

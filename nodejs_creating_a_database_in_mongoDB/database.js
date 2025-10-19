const {MongoClient} = require("mongodb")


// connection
const { URL } = require("./constants");
const client = new MongoClient(URL)

// Database name
const dbName = 'HelloWorld'

async function main() {
    // use connect method to connect to the server
    await client.connect()
    console.log("Connected successfully to server")
    const db = client.db(dbName)
    const collection = db.collection('User')

    // inserting data in database (create)
    // const data = {
    //     firstname: "Vivek",
    //     lastname: "Bora",
    //     city: "Kashipur",
    //     phoneNo : " 89434834234"  
    // }

    // const insertResult = await collection.insertMany([data])
    // console.log("Inserted document =>", insertResult)

    // // read 
    // const findResult = await collection.find({}).toArray()
    // console.log("Found documents =>", findResult)

    // const countResult = await collection.countDocuments({})
    // console.log("Count of documents in the User collection=>", countResult)

    // find all the documents  with a filter of firstname : John
    const result = await collection.find({firstname: "John"}).toArray()
    console.log("result =>", result)
    console.log(result.length)

    return "done"
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close())

// Notes: Steps to create MongoDB database
//  - Go to the mongoDB website 
//  - Create a free MO cluster
//  - Create a user 
//  - Get the connection string  
//  - Then install mongodb compass
//  - 
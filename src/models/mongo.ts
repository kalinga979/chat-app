import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";

export const client = new MongoClient(uri, {
  connectTimeoutMS: 5000,
  maxPoolSize: 100,
  minPoolSize: 2
});

export async function startDb() {
  try {
    await client.connect();
    console.log("Connected To mongodb");
  } catch (err) {
    throw err
  }
}

export async function pingDb() {
  try {
    const result = await client.db("admin").command({ ping: 1 });
    console.log("Ping response:", result);

    if (result.ok === 1) {
      console.log("MongoDB is up and responsive!");
    } else {
      console.warn("Ping did not return ok:", result);
    }
  } catch (err) {
    throw err;
  }
}

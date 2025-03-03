// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   console.log(searchParams);
//   // const id = searchParams.get('id');
//   // const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
//   //   headers: {
//   //     'Content-Type': 'application/json'
//   //   },
//   // });
//   // const product = await res.json();

//   return NextResponse.json({ message: "hello" });
// }



import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse, NextRequest } from 'next/server'
import * as mongoDB from 'mongodb'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name')

  let db : mongoDB.Db;
  let col: mongoDB.Collection;

  const getProduct = async (name: string) => {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(
      `${process.env.MONGODB_URI}`,
    );
    try {
        await client.connect();
        db = await client.db(`${process.env.MONGO_DB}`);
        col = db.collection(`${process.env.MONGO_COLLECTION}`);
        const data = (await col.find({ productName: `Airpods`}).toArray());
        return data[0];
    } catch (err) {
      console.log(err)
    }
  }
  const data = await getProduct(name!)
  return new NextResponse(data!.quantity)
};
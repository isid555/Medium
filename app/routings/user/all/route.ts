import {PrismaClient}   from "@prisma/client";
import {NextResponse} from "next/server";

const client = new PrismaClient();

export async function GET(){
    const response = await client.user.findMany();
   return Response.json({
       data: response
   });

}
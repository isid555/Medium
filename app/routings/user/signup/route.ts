"use server"

import {PrismaClient} from "@prisma/client";
import {NextRequest} from "next/server";
const client = new PrismaClient();
const jwt = require("jsonwebtoken");

export async function GET() {
    return Response.json({ name: "Siddharth", email: "r55sid@gmail.com" })
}
export async function POST(req:NextRequest) {
const body = await req.json();
    const check = await client.user.findUnique({
        where:{
            email:body.email
        }
    })

    if(check){
        return  Response.json(
            {
                success:false,
                message: "User already exists"
            }
        )
    }

const user = await client.user.create({
data: {
email: body.email,
name: body.name,
password: body.password
}
});
const token = jwt.sign({ id: user.id}, "siddharth");


return Response.json({
success: true,
message: "User created successfully",
token: token
});

}

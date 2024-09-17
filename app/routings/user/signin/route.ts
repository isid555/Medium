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

const user = await client.user.findUnique({
    where:{
        email:body.email
    }
})
    if(!user){
        return Response.json({
            success:false,
            message: "User not found,Signup"
        })
    }

    if(user.password !== body.password){
        return Response.json({
            success:false,
            message: "Password incorrect"
        })
    }


    return Response.json({
        success:true,
        message: "User logged in",
        userId: user.id
    })


}


import {PrismaClient} from "@prisma/client";
import {NextRequest,NextResponse} from "next/server";

const client = new PrismaClient();
const jwt = require("jsonwebtoken");

export async function POST(req:NextRequest){
    const body = await req.json();

    const post = await client.post.create({
        data:{
            title: body.title,
            content: body.content,
            published: body.published,
            authorId: body.authorId
        }
    })
    return Response.json({
        id: post.id,
        message: "Post created"
    })
}

export async function PUT(req:NextRequest){
    const body = await req.json();
    const post = await client.post.update({
        where:{
            id: body.id,
        },
        data:{
            title: body.title,
            content: body.content,
            published: body.published,
            authorId: body.authorId
        }
    })
    return Response.json({
        id: post.id,
        message: "Post updated"
    })
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('id'); // Extract the 'id' from the URL parameters

    if(!postId){
        return NextResponse.json({ error: 'Post ID not provided' }, { status: 400 });
    }

    const post = await client.post.findUnique({
        where: {
            id: postId,
        },
    });

    if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
}


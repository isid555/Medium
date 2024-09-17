import {PrismaClient} from "@prisma/client";
const client = new PrismaClient();

export async function GET(){
    const posts = await client.post.findMany();
    return Response.json(posts);
}
import prisma from "@/lib/prisma"
import jwt from "jsonwebtoken";
const jwtSecret = "secret123";
const { verify } = jwt;

export async function POST(req: Request) {
    try {
        // const authToken = req.headers.get("auth-token");
        // if (!authToken) {
        //   return new Response("please provide auth token", { status: 400 });
        // }
        // verify(authToken, jwtSecret);

        const body = await req.json()
        await prisma.priority.deleteMany({})
        body.map(async (item: any) => {
            await prisma.priority.create({
                data: {
                    userId: item.userId,
                    priority: item.priority
                }
            })
        })
        return new Response()
    } catch (error: any) {
        return new Response(error, {status: 400})
    }
}
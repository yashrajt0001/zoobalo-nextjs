import jwt from "jsonwebtoken";
const jwtSecret = "secret123";
import prisma from "@/lib/prisma";
const { verify } = jwt;

export async function GET() {
    try {
        // const authToken = req.headers.get("auth-token");
        // if (!authToken) {
        //   return new Response("please provide auth token", { status: 400 });
        // }
        // verify(authToken, jwtSecret);

        const logins = await prisma.login.findMany({})
        return new Response(JSON.stringify(logins))
    } catch (error: any) {
        return new Response(error)
    }
}

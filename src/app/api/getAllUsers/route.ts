import jwt from "jsonwebtoken";
const jwtSecret = "secret123";
import prisma from "@/lib/prisma";
const { verify } = jwt;

export async function GET(req: Request) {
  try {
    const authToken = req.headers.get("auth-token");
    if (!authToken) {
      return new Response("please provide auth token", { status: 400 });
    }
    verify(authToken, jwtSecret);
      const users = await prisma.user.findMany();
      return new Response(JSON.stringify(users))
  } catch (error: any) {
    return new Response(error, { status: 400 });
  }
}

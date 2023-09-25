import jwt from "jsonwebtoken";
const jwtSecret = "secret123";
import prisma from "@/lib/prisma";
const { verify } = jwt;

export async function POST(req: Request) {
  try {
    const authToken = req.headers.get("auth-token");
    if (!authToken) {
      return new Response("please provide auth token", { status: 400 });
    }
      verify(authToken, jwtSecret);
      const body = await req.json()
    const { name, email, password } = body
    if (!name || !email || !password) {
      return new Response('please enter details', {status: 400})
    }

    await prisma.moderator.create({
      data: {
        name,
        email,
        password,
        role: "delBoy",
      },
    });
      return new Response('ok')
  } catch (error: any) {
    return new Response(error, {status: 400})
  }
}

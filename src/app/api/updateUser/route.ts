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
      const body = await req.json();
    const { name, mobile, address, balance, id, location, type } = body;
    if (!name || !mobile || !address || balance == undefined || !type) {
      return new Response('invalid payload')
    }

    await prisma.user.update({
      data: {
        name,
        mobile,
        address,
        balance,
        location,
        type
      },
      where: {
        id,
      },
    });

    return new Response('ok')
  } catch (error: any) {
    return new Response(error, {status: 400})
  }
}

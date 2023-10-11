import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
const jwtSecret = "secret123";
const { verify } = jwt;

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const authToken = req.headers.get("auth-token");
    if (!authToken) {
      return new Response("please provide auth token", { status: 400 });
    }
    verify(authToken, jwtSecret);

    const body = await req.json();
    console.log(body)
    await prisma.today_delivery.deleteMany({});
    await body.map(async(item: any) => {
      console.log('func ran')
      await prisma.$executeRaw`insert into today_delivery (priority, userId, isDelivered) values (${parseInt(item.priority)}, ${parseInt(item.userId)}, false)`
    });
    return new Response("OK");
  } catch (error: any) {
    return new Response(error, { status: 400 });
  }
}

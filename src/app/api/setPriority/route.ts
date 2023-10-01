import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
const jwtSecret = "secret123";
const { verify } = jwt;

export async function POST(req: Request) {
  // try {
    const authToken = req.headers.get("auth-token");
    if (!authToken) {
      return new Response("please provide auth token", { status: 400 });
    }
    verify(authToken, jwtSecret);

    const body = await req.json();
    console.log(body)
    await prisma.today_delivery.deleteMany({});
    await body.map((item: any) => {
      console.log('func ran')
      prisma.today_delivery.create({
        data: {
          userId: parseInt(item.userId),
          priority: parseInt(item.priority),
          isDelivered: false,
        },
      });
    });
    return new Response("OK");
  // } catch (error: any) {
  //   return new Response(error, { status: 400 });
  // }
}

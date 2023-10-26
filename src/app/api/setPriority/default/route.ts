import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
const jwtSecret = "secret123";
const { verify } = jwt;

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const authToken = req.headers.get("auth-token");
    if (!authToken) {
      return new Response("please provide auth token", { status: 400 });
    }
    verify(authToken, jwtSecret);

    await prisma.today_delivery.updateMany({
      data: {
        isDelivered: false,
      },
    });
    return new Response("OK");
  } catch (error: any) {
    return new Response(error, { status: 400 });
  }
}

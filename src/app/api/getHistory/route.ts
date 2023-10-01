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

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formatedDate = `${day}/${month}/${year}`;

    const history = await prisma.order.findMany({
      where: {
        date: formatedDate,
      },
      include: {
        User: {
          select: {
            name: true,
            mobile: true,
          },
        },
      },
    });

    return new Response(JSON.stringify(history));
  } catch (error: any) {
    return new Response(error);
  }
}

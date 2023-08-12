import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.phone || !body.message) {
      return new Response("invalid payload", { status: 400 });
      }
      await prisma.enqueries.create({
          data: {
              phone: body.phone,
              message: body.message
          }
      })
    return new Response("ok", { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

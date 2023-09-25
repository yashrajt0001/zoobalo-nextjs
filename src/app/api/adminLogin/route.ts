import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
    try {
      const body = await req.json()
      const { email, password } = body;
      if (!email || !password) {
        return new Response('Please enter credentials', {status: 400})
      }
      const admin = await prisma.moderator.findFirst({
        where: { email, role: "admin" },
      });
      if (!admin) {
        return new Response('invalid email', {status: 400})
      }
      const passwordMatch = password === admin.password;
      if (!passwordMatch) {
        return new Response('wrong password', {status: 400})
      }
      const data = {
        user: { email },
      };
      const token = jwt.sign(data, "secret123");
      return new Response(JSON.stringify({token: token}))
    } catch (error) {
      console.log(error);
    }
}
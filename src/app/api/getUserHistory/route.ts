import prisma from "@/lib/prisma"
import { NextRequest } from "next/server"
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    try {
        const query = req.nextUrl.searchParams.get('userId') as string
        const userId = parseInt(query)
        const orders = await prisma.order.findMany({
            where: { userId }
        });
    
        return new Response(JSON.stringify(orders))
    } catch (error: any) {
        return new Response(error)
    }
} 
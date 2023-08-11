import { Enquery } from "@/lib/enquerySchema";

export async function POST(req: Request) {
    try {
        const body = await req.json()
        if (!body.phone || !body.message) {
            return new Response('invalid payload', {status: 400})
        }
        await Enquery.sync()
        await Enquery.create({ phone: body.phone, message: body.message })
        return new Response('ok', {status: 200})
    } catch (error) {
        console.log(error)
    }
}
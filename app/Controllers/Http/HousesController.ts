import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema} from "@ioc:Adonis/Core/Validator"
import { prisma } from "@ioc:Adonis/Addons/Prisma"

export default class HousesController {
    public index() {
        return prisma.houses.findMany();
    }
    public async store({ request }: HttpContextContract) {
        const houseSchema = schema.create({
            name: schema.string(),
            location: schema.string(),
            price: schema.number(),
            number_of_rooms: schema.number(),
            image: schema.string.nullable(),
            owner: schema.object().members({
                first_name: schema.string(),
                last_name: schema.string(),
                contact_number: schema.string(),
                physical_address: schema.string(),
                email: schema.string()
            })
        })

        const payload = await request.validate({ schema: houseSchema })

        return await prisma.houses.create({
            data: {
                name: payload.name,
                location: payload.location,
                price: payload.price,
                number_of_rooms: payload.number_of_rooms,
                image: payload.image!,
                owner: {
                    create: payload.owner
                }
            }
        })
    }
    public async show({ request }: HttpContextContract) {
        const id = request.params().id
        return await prisma.houses.findUnique({ where: { id: +id } })

    }
    public async update({ request }: HttpContextContract) {
        const id = request.params().id
        const houseSchema = schema.create({
            name: schema.string.optional(),
            location: schema.string.optional(),
            price: schema.number.optional(),
            number_of_rooms: schema.number.optional(),
            image: schema.string.optional(),
            owner_id: schema.number.optional()
        })

        const payload = await request.validate({ schema: houseSchema })
        return prisma.houses.update({
            where: {
                id: +id
            },
            data: payload
        });
    }
    public async destroy({ request }: HttpContextContract) {
        const id = request.params().id
        return await prisma.houses.delete({ where: { id: +id } });
    }
}

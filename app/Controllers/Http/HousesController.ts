import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema} from "@ioc:Adonis/Core/Validator"
import { prisma } from "@ioc:Adonis/Addons/Prisma"
import _ from 'lodash'

export default class HousesController {
    public async index() {
      const houses = await prisma.houses.findMany({include:{
          owner:true,
          amenities:{
            select:{
              amenity:{
                select:{
                  id:true,
                  amenity_name:true,

                }
              }
            }
          }
          }});
      return houses.map((house)=>{
        return _.pick
        (
          house ,
          [
            'id' , 'name' , 'price' , 'number_of_rooms' ,
            'image' , 'owner.id', 'owner.first_name' ,
            'owner.last_name','owner.contact_number','owner.physical_address',
            'amenities'
          ]
        )
      })

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
            }),
          amenities:schema.array().members(schema.object().members({
            amenityId:schema.number()
          }))

        })

        const payload = await request.validate({ schema: houseSchema })

        return  prisma.houses.create({
            data: {
                name: payload.name,
                location: payload.location,
                price: payload.price,
                number_of_rooms: payload.number_of_rooms,
                image: payload.image!,
                owner: {
                    create: payload.owner
                },
              amenities:{
                createMany: {
                  data:payload.amenities
                },

                }

              }

        })
    }
    public async show({ request }: HttpContextContract) {
        const id = request.params().id
        return prisma.houses.findUnique({ where: { id: +id } })

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
        return  prisma.houses.delete({ where: { id: +id } });
    }
}

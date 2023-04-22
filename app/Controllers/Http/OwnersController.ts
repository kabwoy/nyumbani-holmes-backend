import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {prisma} from "@ioc:Adonis/Addons/Prisma";
import {schema} from "@ioc:Adonis/Core/Validator";
import {rules} from "@adonisjs/validator/build/src/Rules";

export default class OwnersController {
    public async index({}:HttpContextContract){

      return prisma.owners.findMany()

    }

    public async store({request}:HttpContextContract){

      const ownersSchema = schema.create({
        first_name:schema.string(),
        last_name:schema.string(),
        contact_number:schema.string(),
        physical_address:schema.string(),
        email:schema.string([rules.email()])
      })

      const payload = await request.validate({schema:ownersSchema})

      return prisma.owners.create({
        data:payload
      })

    }

    public async show({request}:HttpContextContract){
      const id = request.params().id
      return prisma.owners.findUnique({where:{id:+id}})

    }

    public async update({request}:HttpContextContract){
      const id = request.params().id
      const ownersSchema = schema.create({
        first_name:schema.string.optional(),
        last_name:schema.string.optional(),
        contact_number:schema.string.optional(),
        physical_address:schema.string.optional(),
        email:schema.string.optional([rules.email()])
      })
      const payload = await request.validate({schema:ownersSchema})
      return prisma.owners.update({where:{id:+id} , data:payload})
    }

    public async destroy({request}:HttpContextContract){
      const id = request.params().id
      return prisma.owners.delete({where:{id:+id}})

    }
}

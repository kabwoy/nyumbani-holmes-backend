// @ts-ignore
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {prisma} from "@ioc:Adonis/Addons/Prisma";
import {schema} from "@ioc:Adonis/Core/Validator";
export default class AmenitiesController {
  public async index(){
    return  prisma.amentities.findMany()
  }
  public async store({request}:HttpContextContract){
    const amenSchema = schema.create({
      amenity_name:schema.string()
    })
    const payload = await request.validate({schema:amenSchema})
    return prisma.amentities.create({
      data:payload
    })
  }

  public async show({request}:HttpContextContract){
      const id = request.params().id;
      return prisma.amentities.findUnique({where: {id: +id}});
  }

  public async update({request}:HttpContextContract){
    const id = request.params().id;
    const amenSchema = schema.create({
      amenity_name:schema.string.optional()
    })
    const payload = await request.validate({schema:amenSchema})

    return prisma.amentities.update({where:{id:+id} , data:payload});
  }

  public async destroy({request}:HttpContextContract){
    const id = request.params().id;
    return prisma.amentities.delete({where:{id:+id}})
  }

}

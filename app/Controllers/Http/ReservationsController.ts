import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema} from "@ioc:Adonis/Core/Validator";
import {prisma} from "@ioc:Adonis/Addons/Prisma";


export default class ReservationsController {
  public async index(){
    return "All reservation"
  }

  public async store({request}:HttpContextContract){
    // const reqbody = request.body()
    const reserveSchema = schema.create({
      start_date:schema.date({format:"yyyy-MM-dd HH:mm:ss"}),
      leave_date:schema.date({format:"yyyy-MM-dd HH:mm:ss"}),
      houseId:schema.number(),
      userId:schema.number(),
      total_price:schema.number()
    })

    const payload = await request.validate({schema:reserveSchema});

    return  prisma.reservations.create({
      data:{
        // @ts-ignore
        start_date:payload.start_date.toISO(),
        // @ts-ignore
        leave_date:payload.leave_date.toISO(),
        houseId:payload.houseId,
        userId:payload.userId,
        total_price:payload.total_price
      }
    })

  }

  public async show(){

    return "All reservation"
  }

  public async update(){

    return "All reservation"
  }

  public async destroy(){

    return "All reservation"
  }
}

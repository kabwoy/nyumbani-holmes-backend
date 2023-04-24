import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {prisma} from "@ioc:Adonis/Addons/Prisma";

export default class UsersController {

  public async index() {
    return prisma.users.findMany()
  }

  public async store({}:HttpContextContract) {


  }

  public async show(){

  }
  public async update({}:HttpContextContract){

  }

  public async destroy(){

  }

}

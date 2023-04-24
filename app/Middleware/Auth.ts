import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Auth {
  public async handle({}: HttpContextContract, next: () => Promise<void>) {
    console.log("Doneee ")
    await next()
  }
}

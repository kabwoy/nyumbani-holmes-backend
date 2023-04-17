import Route from "@ioc:Adonis/Core/Route"
import type{HttpContextContract} from "@ioc:Adonis/Core/HttpContext"

Route.resource("/houses" , 'HousesController').apiOnly()



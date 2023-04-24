import Route from "@ioc:Adonis/Core/Route"

Route.resource("/houses" , 'HousesController').apiOnly().middleware({"*":['auth']})



import Route from "@ioc:Adonis/Core/Route";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import {schema , rules} from "@ioc:Adonis/Core/Validator";
import Hash from "@ioc:Adonis/Core/Hash";
import {prisma} from "@ioc:Adonis/Addons/Prisma";
import jwt from "jsonwebtoken"
import Env from "@ioc:Adonis/Core/Env";

Route.resource("/users" , "UsersController").apiOnly()

Route.post("/auth/signup" , async({request , response}:HttpContextContract)=>{
  const userSchema = schema.create({
    first_name:schema.string(),
    last_name:schema.string(),
    email:schema.string([rules.email()]),
    username:schema.string(),
    password:schema.string()

  })
  const payload = await request.validate({schema:userSchema})
    const user = await prisma.users.findMany({where:{email:payload.email}})
    if(user.length>0) return response.status(400).json({message:"Email already exists"})
   payload.password = await Hash.make(payload.password)

    return prisma.users.create({
      data:payload
    })

})

Route.post("/auth/login" , async({request , response}:HttpContextContract)=>{

  const userSchema = schema.create({
    email:schema.string([rules.email()]),
    password:schema.string()
  })

   const payload = await request.validate({schema:userSchema})

  const user = await prisma.users.findMany({
    where:{
      email:payload.email
    }
  })
  if(user.length<=0) return response.status(404).json({message:"invalid email try again"})

  const verifyPassword = await Hash.verify(user[0].password , payload.password)
  if(!verifyPassword) return response.status(404).json({message:"invalid password"})
  const accessToken =
    jwt.sign({id:user[0].id , username:user[0].username , email:user[0].email} ,
      Env.get("ACCESS_TOKEN_SECRET") , {expiresIn:"3m"})
  const refreshToken = jwt.sign({id:user[0].id , username:user[0].username , email:user[0].email} ,
    Env.get("REFRESH_TOKEN_SECRET"),{expiresIn:"1y"})
    response.cookie("refreshToken" , refreshToken)
    return accessToken
})


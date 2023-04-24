import {DateTime} from "luxon";
import {IsNumber} from "class-validator";

export class ReservationDto{
  start_date:DateTime
  leave_date:DateTime
  @IsNumber()
  houseId:number
  userId:number
  @IsNumber()
  total_price:number
}

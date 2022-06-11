import { IsNotEmpty } from "class-validator";


export default class CategoryInfoDto {
  @IsNotEmpty()
  name: string;
}
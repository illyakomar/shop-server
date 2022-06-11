import { IsNotEmpty } from "class-validator";

export default class BrandInfoDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}
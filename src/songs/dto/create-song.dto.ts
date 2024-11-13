import { Max, IsString, Min, IsNumber, Length } from "class-validator"

export class CreateSongDto {
  @IsString()
  @Length(1, 30)
  title: string

  @IsNumber()
  @Min(10)
  @Max(600)
  length: number
  @Min(0)
  @Max(600)
  price: number
  
  @Min(1)
  @Max(5)
  rating: number

  @IsString()
  @Length(1, 30)
  artist: string
}

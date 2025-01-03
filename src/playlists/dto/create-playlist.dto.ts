import { Song } from "@prisma/client";
import { IsString, Length } from "class-validator";

export class CreatePlaylistDto {
  @IsString()
  @Length(1, 30)
  name: string
}

import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaylistDto } from './create-playlist.dto';
import { Song } from '@prisma/client';

export class UpdatePlaylistDto extends PartialType(CreatePlaylistDto) {
  songs: any
}

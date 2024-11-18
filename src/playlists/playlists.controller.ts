import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post()
  create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistsService.create(createPlaylistDto);
  }

  @Get()
  findAll() {
    return this.playlistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistsService.findOne(+id);
  }

  @Post(':playlistId/:songId')
  updatePlaylist(@Param('playlistId') playlistId: string, @Param("songId") songId: string) {
    return this.playlistsService.updatePlaylist(Number(playlistId), Number(songId));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistsService.remove(+id);
  }
  @Delete(':playlistId/:songId')
  removeSong(@Param('playlistId') playlistId: string, @Param('songId') songId: string ) {
    return this.playlistsService.removeSong(+playlistId, +songId)
  }
}

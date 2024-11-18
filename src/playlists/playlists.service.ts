import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PrismaService } from 'src/prisma.service';
import { Song } from '@prisma/client';

@Injectable()
export class PlaylistsService {
  db: PrismaService
  constructor(db: PrismaService) {
    this.db = db
  }
  async create(createPlaylistDto: CreatePlaylistDto) {
    await this.db.playlist.create({
      data: createPlaylistDto
    })
    return `Playlist létrehozva`

  }

  findAll() {
    return this.db.playlist.findMany({
      include: {
        songs: true
      }
    });
  }

  findOne(id: number) {
    return this.db.playlist.findFirst(
      {
        where: {
          id: id
        },
        include: {
          songs: true
        }
      }

    );
  }

  async updatePlaylist(playlistId: number, songId: number) {
    const song: Song = await this.db.song.findFirst({
      where: {
        id: songId
      }
    })
    await this.db.playlist.update({
      where: {
        id: playlistId
      },
      data: {
        songs: {
          connect: {
            id: songId
          }
        }
      },
      include: {
        songs: true
      }

    })

    return `Playlist #${playlistId} frissítve`
  }

  async remove(id: number) {
    await this.db.playlist.delete({
      where: {
        id: id
      }
    })
    return `Playlist #${id} törölve`
  }
  async removeSong(playlistId: number, songId: number) {
    await this.db.playlist.update({
      where: {
        id: playlistId
      },
      data: {
        songs: {
          disconnect: {
            id: songId
          }
        }
      }
    })
    return `#${songId} zene eltávolítva #${playlistId} playlistből.`
  }
}











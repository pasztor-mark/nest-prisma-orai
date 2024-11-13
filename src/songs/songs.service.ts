import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { PrismaService } from 'src/prisma.service';
//a zene adatokat ai-val generáltattam, nem hallgatok ilyeneket!!
@Injectable()
export class SongsService {
  db: PrismaService
  constructor(db: PrismaService) {
    this.db = db
  }

  async create(createSongDto: CreateSongDto) {
    await this.db.song.create({
      data: createSongDto
    })
    return `Zene létrehozva`
  }

  findAll() {
    return this.db.song.findMany()
  }
  findFree() {
    return this.db.song.findMany({
      where: {
        price: 0
      }
    })
  }
  findTop(count?: number) {
    let takeCount;
    if (!count) {
      takeCount = 2
    }
    else {
      takeCount = count
    }
    return this.db.song.findMany({
      orderBy: {
        rating: "asc",
        
      },
      take: takeCount
      
    })
  }
  findOne(id: number) {
    return this.db.song.findFirst(
      {
        where: {
          id: id
        }
      }
    );
  }

  async update(id: number, updateSongDto: UpdateSongDto) {
    await this.db.song.update({
      where: {
        id: id
      },
      data:
        updateSongDto

    })
    
    return `Zene #${id} frissítve`
  }

  async remove(id: number) {
    await this.db.song.delete({
      where: {
        id: id
      }
    })
    return `Zene #${id} törölve`
  }
}

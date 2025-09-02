import { AppDataSource } from "../bdConfig";
import { Comodo } from "../entities/Comodo";


export class ComodoService {
  
  
  private roomRepo = AppDataSource.getRepository(Comodo);

  async listRooms() {
    return this.roomRepo.find();
  }

  async listRoomById(id: number) {
    return this.roomRepo.findOneBy({ idComodo: id });
  }

  async createRoom(data: Partial<Comodo>) {
    const newRoom = this.roomRepo.create(data);
    //this.roomRepo.insert(data)
    return this.roomRepo.save(newRoom);
  }

  async updateRoom(id: number, data: Partial<Comodo>) {
    const room = await this.roomRepo.findOneBy({ idComodo: id });
    if (!room) {
      throw new Error("Cômodo não encontrado");
    }

    const updated = this.roomRepo.merge(room, data); // mescla os dados
    return this.roomRepo.save(updated); // salva e já retorna o atualizado
  }

  async deleteRoom(id: number) {
    return this.roomRepo.delete({ idComodo: id });
  }
}

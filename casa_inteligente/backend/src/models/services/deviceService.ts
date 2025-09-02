import { AppDataSource } from "../bdConfig";
import { Comodo } from "../entities/Comodo";
import { Dispositivo } from "../entities/Dispositivo";
import { Database } from "../bdConnect";

export class DispositivoService {
  
  private deviceRepo = AppDataSource.getRepository(Dispositivo);


  async setEstado(id: number, estado: boolean) {
    const device = await this.deviceRepo.findOneBy({ idDispositivo: id });

    if (!device) throw new Error("Dispositivo não encontrado");

    device.estado = estado;
    return this.deviceRepo.save(device); // já retorna atualizado
  }

  async ligar(id: number) {
    return this.setEstado(id, true);
  }

  async desligar(id: number) {
    return this.setEstado(id, false);
  }

  async listDevices() {
    return this.deviceRepo.find();
  }

  async listDeviceById(id: number) {
    return this.deviceRepo.findOneBy({ idDispositivo: id });
  }

  async createDevice(data: Partial<Dispositivo>, id: number) {
    const comodo = await AppDataSource.getRepository(Comodo).findOneBy({
      idComodo: id,
    });

    if (!comodo) throw new Error("Comodo não encontrado");

    const newDevice = this.deviceRepo.create({ ...data, comodo });
    return this.deviceRepo.save(newDevice);
  }

  async updateDevice(id: number, data: Partial<Dispositivo>) {
    const device = await this.deviceRepo.findOneBy({ idDispositivo: id });
    if (!device) {
      throw new Error("Dispositivo não encontrado");
    }

    const updateDevice = this.deviceRepo.merge(device, data); // atualiza apenas os campos enviados
    return this.deviceRepo.save(device);
  }

  async deleteDevice(id: number) {
    return this.deviceRepo.delete({ idDispositivo: id });
  }
}

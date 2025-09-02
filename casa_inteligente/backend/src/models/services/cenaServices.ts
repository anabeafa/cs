import { AppDataSource } from "../bdConfig";
import { Cena } from "../entities/Cena";

export class CenaService {
  private cenaRepo = AppDataSource.getRepository(Cena);

  async setEstado(id: number, estado: boolean) {
    const scene = await this.cenaRepo.findOneBy({ idCena: id });
    if (!scene) throw new Error("Cena não encontrada");
    scene.ativa = estado;
    return this.cenaRepo.save(scene);
  }

  async ativar(id: number) {
    return this.setEstado(id, true);
  }

  async desativar(id: number) {
    return this.setEstado(id, false);
  }

  async listScene() {
    return this.cenaRepo.find();
  }

  async listSceneById(id: number) {
    const scene = await this.cenaRepo.findOneBy({ idCena: id });
    return scene;
  }

  async createScene(data: Partial<Cena>) {
    const newScene = this.cenaRepo.create(data);
    return this.cenaRepo.save(newScene);
  }

  async updateScene(id: number, data: Partial<Cena>) {
    const scene = await this.cenaRepo.findOneBy({ idCena: id });
    if (!scene) throw new Error("Cena não encontrada");
    Object.assign(scene, data);
    return this.cenaRepo.save(scene);
  }

  async deleteScene(id: number) {
    return this.cenaRepo.delete({ idCena: id });
  }
}

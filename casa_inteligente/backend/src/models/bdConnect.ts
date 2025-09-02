// models/Database.ts

import { AppDataSource } from "./bdConfig";


export class Database {
  private static instance: Database;

  private constructor() {} // impede instanciar direto

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect() {
    try {
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
        console.log("Conexão com o banco estabelecida!");
      } else {
        console.log("Banco já estava conectado!");
      }
    } catch (error) {
      console.error("Erro ao conectar com o banco:", error);
    }
  }
}

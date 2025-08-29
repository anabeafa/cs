import "reflect-metadata";
import { DataSource } from "typeorm";
import { Comodo } from "./entities/Comodo";
import { Dispositivo } from "./entities/Dispositivo";
import { Cena } from "./entities/Cena";
import { AcaoCena } from "./entities/AcaoCena";
 

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgre",
    password: "pgAdmin",
    database: "bd_casa_inteligente",
    synchronize: true, // cria/atualiza tabelas automaticamente
    logging: false,
    entities: [Comodo, Dispositivo, Cena, AcaoCena],
});

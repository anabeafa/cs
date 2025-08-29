import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Dispositivo } from "./Dispositivo";


@Entity()
export class Comodo {
    @PrimaryGeneratedColumn()
    idComodo!: number;

    @Column({ type: "varchar", length: 100 })
    nome!: string;

    @OneToMany(() => Dispositivo, dispositivo => dispositivo.comodo)
    dispositivos!: Dispositivo[];
}

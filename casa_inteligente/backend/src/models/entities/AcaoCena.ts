import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cena } from "./Cena";
import { Dispositivo } from "./Dispositivo";

@Entity()
export class AcaoCena {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Cena, cena => cena.acoes)
    @JoinColumn({ name: "idCena" })
    cena!: Cena;

    @ManyToOne(() => Dispositivo)
    @JoinColumn({ name: "idDispositivo" })
    dispositivo!: Dispositivo;

    @Column({ type: "int", nullable: true })
    ordem?: number;

    @Column({ type: "int", nullable: true })
    intervalo?: number; // em segundos
}

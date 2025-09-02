import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Comodo } from "./Comodo";

@Entity()
export class Dispositivo {
    @PrimaryGeneratedColumn()
    idDispositivo!: number;

    @Column({ type: "varchar", length: 100 })
    nome!: string;

    @Column({ type: "boolean", default: true })
    estado!: boolean;

    @ManyToOne(() => Comodo, comodo => comodo.dispositivos, {onDelete:'SET NULL'})
    @JoinColumn({ name: "idComodo" })
    comodo!: Comodo;
}

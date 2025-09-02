import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { AcaoCena } from "./AcaoCena";


@Entity()
export class Cena {
    @PrimaryGeneratedColumn()
    idCena!: number;

    @Column()
    nome!: string;

    @Column({ default: true })
    ativa!: boolean;

    @OneToMany(() => AcaoCena, acaoCena => acaoCena.cena)
    acoes!: AcaoCena[];
}

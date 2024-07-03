import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Fuel {
    
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    state : string;

    @Column()
    petrolPrice : string;

    @Column()
    dieselPrice : string;
}

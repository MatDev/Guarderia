import { User } from "./User";
import { Entity,PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn  } from "typeorm";
import { TokenType } from "../utils/enum/token.type";

@Entity()
export class Token {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ unique: true, name: 'access_token' })
  public accessToken: string;

  @Column({
    type: 'enum',
    enum: TokenType,
    default: TokenType.BEARER
  })
  public tokenType: TokenType;

  @Column()
  public revocado: boolean;

  @Column()
  public expirado: boolean;

  @ManyToOne(() => User, usuario => usuario.tokens, { eager: false })
    @JoinColumn({ name: 'usuario_id' })
  public usuario: User;
}
import { DataSource, Equal, Repository } from "typeorm";
import { Token } from "../../entity/Token";
import { TokenInterfaceRepository } from "../interface/token.interface.repository";
import { NotFoundError } from "../../exeption/not.found.error";
import { User } from "../../entity/User";
import { AppDataSource } from "../../configuration/database.config";




export class TokenRepository implements TokenInterfaceRepository {
    private repository: Repository<Token>;
    constructor({ dataSource }: { dataSource: DataSource }) {
        this.repository = dataSource.getRepository(Token);
      }
    public async findByAccesToken(accessToken: string): Promise<Token> {
        return this.repository.findOne({ where: { accessToken: accessToken }, relations:['usuario'] }).then(token => {
            if (!token) {
                throw new NotFoundError('Token', accessToken);
            }
            return token;
        });
        
    }
    public async findAllTokenValid(user:User): Promise<Token[]> {
        

        const tokenValids= await this.repository.find({
            where: {
                usuario: {id:user.id},
                revocado: false,
                expirado: false
            }
        });
        console.info('Tokens validos encontrados:', tokenValids.length);

        return tokenValids;
    }

    public async saveAllTokens(tokens: Token[]): Promise<Token[]> {
        return await this.repository.save(tokens);
    }
    

   
}


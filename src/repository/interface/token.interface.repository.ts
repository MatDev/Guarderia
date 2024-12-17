
import { Token } from "../../entity/Token";
import { User } from "../../entity/User";

export interface TokenInterfaceRepository {
    findByAccesToken(accessToken: string): Promise<Token>;
    findAllTokenValid(user:User): Promise<Token[]>;
    saveAllTokens(tokens:Token[]):Promise<Token[]>;
}
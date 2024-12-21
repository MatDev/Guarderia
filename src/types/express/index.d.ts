import { User } from "../../entity/User";

declare module 'express-serve-static-core' {
    interface Request {
        userId?: string;
        userRole?: string;
    }
}
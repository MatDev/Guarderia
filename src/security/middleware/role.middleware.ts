import { NextFunction,Request,Response } from "express";
import { UserRole } from "../../utils/enum/user.role";
import { AuthorizationError } from "../../exeption/authorization.error";
import { UserRepository } from "../../repository/impements/user.implements.repository";
import { User } from "../../entity/User";
import { NotFoundError } from "../../exeption/not.found.error";
import { makeInvoker } from "awilix-express";

const userRepository= makeInvoker(UserRepository);
export const authorizeRoles=(userRoles:UserRole[])=>{
   return async (req:Request, res:Response,next:NextFunction)=>{
    console.info('authorizeRoles');
    try{
        const userId=req.body.userId;
        if (!userId) {
            throw new AuthorizationError('User ID not found in request');
        }

        const user = await userRepository('findById')(userId) ;
        if (!user) {
            throw new NotFoundError('User not found');
        }

        // Verificar si el usuario tiene el rol necesario
        if (!userRoles.includes(user.role)) {
            throw new AuthorizationError('User not authorized');
        }


        next();

    }catch(error){
        console.error('Error authorizeRoles:', error);
        res.status(403).json({ message: 'Error authorizeRoles', error: error instanceof Error ? error.message : 'Unknown error' });
    }
   }
}
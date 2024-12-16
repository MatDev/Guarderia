import { CustomError } from "./custom.error";

export class NotFoundError extends CustomError{
    constructor(resourceName:string , identifier?:string){
        super(
            `${resourceName} no encontrado${identifier ? ` con ID: ${identifier}` : ''}`, 
            404, 
            'RESOURCE_NOT_FOUND'
          );
    }
}
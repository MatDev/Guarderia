import { Request, Response } from "express";
type ControllerFunction<T> = (req:Request)=>Promise<T>;

export const controllerHandler = <T>(fn: ControllerFunction<T>, successStatus: number = 200) => async(
    req:Request,
    res:Response
)=>{
    try{
        const result=await fn(req);
        res.status(200).json(result);
    }catch(error){
        console.error('Error:', error);
       res.status((error as any).statusCode || 500)
       .json({message: error instanceof Error ? error.message : 'Unknown error',
        error: error instanceof Error ? error.message : 'Unknown error'
       });
    }

}

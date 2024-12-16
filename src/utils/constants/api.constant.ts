export class ApiConstant{
    private constructor(){
        throw new Error('Cannot create instance of ApiConstant');
    }
    public static readonly API_VERSION:string='v1';
    public static readonly API_BASE:string=`/api/${ApiConstant.API_VERSION}`;
    public static readonly API_USER:string=`${ApiConstant.API_BASE}/user`;

}
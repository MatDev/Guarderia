export class ApiConstant{
    private constructor(){
        throw new Error('Cannot create instance of ApiConstant');
    }
    public static readonly API_VERSION:string='v1';
    public static readonly API_BASE:string=`/api/${ApiConstant.API_VERSION}`;
    public static readonly API_USER:string=`${ApiConstant.API_BASE}/user`;

    public static readonly API_AUTH:string=`${ApiConstant.API_BASE}/auth`;
    public static readonly API_AUTH_LOGIN:string=`${ApiConstant.API_AUTH}/login`;
    public static readonly API_AUTH_LOGOUT:string=`${ApiConstant.API_AUTH}/logout`;
    public static readonly API_AUTH_REFRESH:string=`${ApiConstant.API_AUTH}/refresh`;

}
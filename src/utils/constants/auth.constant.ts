export class AuthConstant{
    private constructor(){
        throw new Error('Cannot create instance of AuthConstant');
    }
    public static readonly AUTHORIZATION_HEADER:string='Authorization';
    public static readonly BEARER_PREFIX:string='Bearer ';
    public static readonly CONTENT_TYPE_HEADER:string='Content-Type';
}
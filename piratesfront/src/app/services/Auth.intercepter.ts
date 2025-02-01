import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

const TOKEN_HEADER = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private login:LoginService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let authReq=req;
        //add the jwt token in the requests
        const token = this.login.getToken();
        console.log("inside intercepter");
        
        if(token != null){

            authReq = authReq.clone({
                setHeaders : { Authorization:'Pirates '+token },
        });

        }

        return next.handle(authReq);

    }
    
}

export const authInterceptorProviders=[
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi:true,
    },
]
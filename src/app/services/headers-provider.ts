import { AuthService } from '../auth.service'
import { Injectable } from '@angular/core';
import { RequestOptionsArgs, Headers } from '@angular/http';


@Injectable()
export class HeadersProvider { 
    constructor(private authService: AuthService){
    }

    getHeaders(): RequestOptionsArgs {
        return {headers: new Headers({'Content-Type': 'application/json', 'Authorization': `Token ${this.authService.token}`})};
    }

    getHeadersWithoutAuth(): RequestOptionsArgs {
        return {headers: new Headers({'Content-Type': 'application/json'})};
    }
}
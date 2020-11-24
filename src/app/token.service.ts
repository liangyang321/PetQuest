import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as data from '../assets/credential.json';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  credentials = {
    grant_type: data.grant_type,
    client_id: data.client_id,
    client_secret: data.client_secret
  };

  constructor(private http: HttpClient) {
    this.http.post<any>('https://api.petfinder.com/v2/oauth2/token', this.credentials).subscribe(data => {
      this.set('token', data.token_type + ' ' + data.access_token);
    });
  }

  set(token: string, value: string): void {
    sessionStorage.setItem(token, value);
  }

  get(token: string): any {
    // console.log(sessionStorage.getItem(token));
    return sessionStorage.getItem(token);
  }
}

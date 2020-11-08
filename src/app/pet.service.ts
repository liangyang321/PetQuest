import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Animals } from './animal.model';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService)
    {}

  getAnimalByType(): Observable<any> {
    const headers = { Authorization: this.tokenService.get('token')};
    const params = new HttpParams()
    .set('type', 'dog')
    .set('breed', 'poodle');
    return this.http.get<Animals>('https://api.petfinder.com/v2/animals', { headers, params});
  }

  getAnimal(): Observable<Animals> {
    const headers = { Authorization: this.tokenService.get('token') };
    return this.http.get<Animals>('https://api.petfinder.com/v2/animals', { headers});
  }

  getAnimalById(id: any): Observable<any> {
    const headers = { Authorization: this.tokenService.get('token') };
    return this.http.get<Animals>('https://api.petfinder.com/v2/animals/' + id, { headers});
  }

  getAnotherPage(link: any): Observable<Animals> {
    console.log('getAnotherpageServer');
    console.log('https://api.petfinder.com' + link);
    const headers = { Authorization: this.tokenService.get('token') };
    return this.http.get<Animals>('https://api.petfinder.com' + link, { headers});
  }
}

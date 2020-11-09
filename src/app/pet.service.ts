import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Animals, Types } from './animal.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService)
    {}


  getAnimal(link: any): Observable<Animals> {
    const headers = { Authorization: this.tokenService.get('token') };
    return this.http.get<Animals>('https://api.petfinder.com' + link, { headers});
  }

  getAnimalById(id: any): Observable<any> {
    const headers = { Authorization: this.tokenService.get('token') };
    return this.http.get<Animals>('https://api.petfinder.com/v2/animals/' + id, { headers});
  }

  getTypes(): Observable<Types> {
    const headers = { Authorization: this.tokenService.get('token') };
    return this.http.get<Types>('https://api.petfinder.com/v2/types', { headers});

  }
}

import {TokenService} from './token.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Animals, Types} from './animal.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Blog} from './blog.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  currentPageInfo = null;
  newBlog: any;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService) {
  }

  getAnimalBreed(type: any): Observable<any> {
    const headers = {Authorization: this.tokenService.get('token')};
    return this.http.get<Animals>('https://api.petfinder.com/v2/types/' + type + '/breeds', {headers});
  }

  getAnimalByType(type: any, location: any, distance: any, breed: any, age: any, size: any, gender: any, page: any): Observable<any> {
    const headers = {Authorization: this.tokenService.get('token')};
    const params = new HttpParams()
      .set('type', type)
      .set('breed', breed)
      .set('age', age)
      .set('size', size)
      .set('gender', gender)
      .set('location', location)
      .set('distance', distance)
      .set('page', page);
    return this.http.get<Animals>('https://api.petfinder.com/v2/animals', {headers, params});
  }


  getAnimal(link: any): Observable<Animals> {
    const headers = {Authorization: this.tokenService.get('token')};
    return this.http.get<Animals>('https://api.petfinder.com' + link, {headers});
  }

  getAnimalById(id: any): Observable<any> {
    const headers = {Authorization: this.tokenService.get('token')};
    return this.http.get<Animals>('https://api.petfinder.com/v2/animals/' + id, {headers});
  }

  getTypes(): Observable<Types> {
    const headers = {Authorization: this.tokenService.get('token')};
    return this.http.get<Types>('https://api.petfinder.com/v2/types', {headers});
  }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>('assets/petBlog.json');
  }

  setNewBlog(blog: any): void {
    this.newBlog = blog;
  }

  getNewBlog(): any {
    return this.newBlog;
  }
}

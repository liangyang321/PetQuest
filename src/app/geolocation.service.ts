import {Geos} from './animal.model';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(
    private http: HttpClient
  ) {
  }

  key = 'pk.0abedbb5447473903b3088d41b08e9f4';

  getZipcode(lat: any, lon: any): Observable<any> {
    const headers = {key: this.key};
    const params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('format', 'json');
    return this.http.get<Geos>('https://us1.locationiq.com/v1/reverse.php?key=pk.0abedbb5447473903b3088d41b08e9f4', {params});
  }
}

import {GeolocationService} from './../geolocation.service';
import {PetService} from './../pet.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Animal, Geos} from '../animal.model';
import {Pagination, Photo} from './../animal.model';
import {Breeds} from '../breeds';


export class PetInfo {
  public breed: string;
  public age: string;
  public size: string;
  public gender: string;
  public type: string;
  public location: string;
  public distance: string;
}

@Component({
  selector: 'app-pet-search',
  templateUrl: './pet-search.component.html',
  styleUrls: ['./pet-search.component.css']
})

export class PetSearchComponent implements OnInit {

  geoData: Geos[] = [];
  breeds: Breeds[];
  animals: Animal[] = [];
  pagination: Pagination;
  page = 1;
  totalPets: number;
  image: Photo = {
    small: 'assets/images/notfound.png',
    medium: null,
    large: null,
    full: null
  };

  constructor(private router: Router, private petService: PetService, private geoService: GeolocationService) {
  }

  model = new PetInfo();

  href = '';

  reverseGeo(lat: any, lon: any): void {
    this.geoService.getZipcode(lat, lon).subscribe(info => {
      this.geoData = info;
      this.model.location = info.address.postcode;
      console.log('postcode: ', this.model.location);
      this.petService.getAnimalByType(this.model.type, this.model.location, this.model.distance, '',
        '', '', '', this.page).subscribe(data => {
        this.animals = data.animals;
        this.pagination = data.pagination;
        this.page = data.pagination.current_page;
        this.totalPets = data.pagination.total_count;
        this.animals.forEach(element => {
          this.setAnimal(element);
        });
      });
    });
  }

  getBreeds(): void {
    this.petService.getAnimalBreed(this.model.type).subscribe(data => {
      this.breeds = data.breeds;
      console.log(this.breeds);

    });
  }

  getPetsFromAPI(): void {
    if (this.model.breed === 'any') {
      this.model.breed = '';
    }
    if (this.model.age === 'any') {
      this.model.age = '';
    }
    if (this.model.size === 'any') {
      this.model.size = '';
    }
    if (this.model.gender === 'any') {
      this.model.gender = '';
    }
    // console.log('page: ', this.page);
    this.petService.getAnimalByType(this.model.type, this.model.location, this.model.distance, this.model.breed,
      this.model.age, this.model.size, this.model.gender, this.page).subscribe(data => {
      this.animals = data.animals;
      console.log('Data: ', data);
      this.pagination = data.pagination;
      this.page = data.pagination.current_page;
      this.totalPets = data.pagination.total_count;
      this.animals.forEach(element => {
        this.setAnimal(element);
      });
    }, error => {
      console.log('ERROR HERE', error);
      this.animals = [];
      this.page = 1;
    });
  }

  setAnimal(element: any): void {
    if (element.photos.length === 0 || element.photos === undefined) {
      element.photos.push(this.image);
    }

    if (element.name.includes('-')) {
      const n = element.name;
      element.name = n.split('-')[0];
    }
    if (element.name.includes(' is')) {
      const n = element.name;
      element.name = n.split(' is')[0];
    }

    if (element.name.includes('~')) {
      const n = element.name;
      element.name = n.split('~')[0];
    }


    // element.view = 'View';
  }

  pageChange(newPage: number): void {
    this.page = newPage;
    console.log('new page: ', this.page);
    this.getPetsFromAPI();
    window.scroll(0, 0);
  }


  locError(err: any): void {
    console.log(err);
  }


  getLocation(callback): void {
    if (navigator.geolocation) {
      const latLon = navigator.geolocation.getCurrentPosition(position => {
        const userPosition = {lat: null, lng: null};
        userPosition.lat = position.coords.latitude;
        userPosition.lng = position.coords.longitude;
        callback(userPosition);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }


  ngOnInit(): void {
    console.log(this.page);
    this.model.breed = '';
    this.model.age = '';
    this.model.gender = '';
    this.model.size = '';
    this.href = this.router.url;
    this.model.type = this.href.substr(1, this.href.indexOf('-') - 1);
    if (this.model.type === 'small') {
      this.model.type = 'small-furry';
    } else if (this.model.type === 'scales') {
      this.model.type = 'scales-fins-other';
    }
    this.model.distance = '10';
    this.getBreeds();
    this.getLocation(data => {
      console.log(data);
      this.reverseGeo(data.lat, data.lng);
    });
  }

  onSubmit(petForm): void {
    this.page = 1;
    this.getPetsFromAPI();
  }
}

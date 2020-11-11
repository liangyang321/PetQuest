import { PetManagementViewComponent } from './../pet-management-view/pet-management-view.component';
import { FirebaseService } from './../firebase.service';
import { Pagination, Photo } from './../animal.model';
import { Component, OnInit } from '@angular/core';
import {PetService} from '../pet.service';
import { Animal } from '../animal.model';
import { map } from 'rxjs/operators';

export class PetType {
  type: string;
  total: number;
  param: string;

}

@Component({
  selector: 'app-pet-management',
  templateUrl: './pet-management.component.html',
  styleUrls: ['./pet-management.component.css']
})

export class PetManagementComponent implements OnInit {

  isAdmin = true;
  isSourceFromAPI = true;
  fromSupplier = false;

  totalfromsuppliers = 0;
  animals: Animal[];
  page: Pagination;
  types = [];
  isAll = true;
  Others: Animal[];

  pettype: PetType[] = [];

  image: Photo = {
    small: 'assets/images/notfound.png',
    medium: null,
    large: null,
    full: null
  };

  constructor(
    private petService: PetService,
    private firebaseService: FirebaseService

    ) { }

  ngOnInit(): void {
    this.getPetsFromAPI('/v2/animals');
    this.getAllPetTypes();
  }

  getAllPetTypes(): void{
    this.petService.getTypes().subscribe( data => {
      console.log('Types');
      console.log(data.types);
      this.types = data.types;
      data.types.forEach(element => {
          let param: string = element.name;
          if (element.name === 'Small & Furry'){
            param = 'Small-Furry';
          }
          if (element.name === 'Scales, Fins & Other'){
            param = 'Scales-Fins-Other';
          }
          this.petService.getAnimal('/v2/animals?type=' + param).subscribe(data => {
            const t = new PetType();
            t.type = element.name;
            t.total = data.pagination.total_count;
            t.param = param;
            this.pettype.push(t);
          });
      });
    });
  }

  getPetsFromAPI(request: string): void {
    this.petService.getAnimal(request).subscribe( data => {
        this.animals = data.animals;
        console.log(this.animals);
        if (this.isAll) {
          this.page = data.pagination;
        }

        this.animals.forEach(element => {
          this.setAnimal(element);
        });
    });
  }

  previousPage(): void{
    console.log("click previousPage");
    console.log(this.page._links.previous);
    this.getPetsFromAPI(this.page._links.previous.href);
  }

  nextPage(): void {
    console.log("click nextpage");
    console.log(this.page._links.next);
    this.getPetsFromAPI(this.page._links.next.href);
  }

  setAnimal(element: any): void{
    if (element.photos.length === 0 || element.photos === undefined) {
      element.photos.push(this.image);
    }

    if (element.name.includes('-')){
      const n = element.name;
      element.name = n.split('-')[0];
    }

    if (element.name.includes(' is')){
      const n = element.name;
      element.name = n.split(' is')[0];
    }

    if (element.name.includes('~')){
      const n = element.name;
      element.name = n.split('~')[0];
    }
  }

  search(id: any): void {
    if (id){
      this.petService.getAnimalById(id).subscribe(data => {
         const pet = data.animal;
         pet.view = 'View';
         this.animals = [];
         this.animals.push(pet);
      });
    }
  }

  // showAll(): void {
  //     this.isAll = true;
  //     this.getPetsFromAPI('/v2/animals/?');
  // }

  show(index): void{
    this.isAll = false;
    this.getPetsFromAPI('/v2/animals/?type=' + this.pettype[index].param);
  }


  getPetFromAPI(): void{
    this.getPetsFromAPI('/v2/animals');
  }


  getPetFromSupplier(): void {
    this.firebaseService.getAll().snapshotChanges().pipe(
      map (changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val()})
      ))).subscribe(data => {
        console.log(data);
        this.animals = data;
        this.totalfromsuppliers = data.length;
        console.log(this.animals);
        this.animals.forEach(element => {
            if (element.photos === undefined || element.photos.length === 0) {
              const photos: Photo[] = [];
              photos.push(this.image);
              element.photos = photos;
            }

        });
    });
  }
}

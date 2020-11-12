import { FirebaseService } from './../firebase.service';
import { Pagination, Photo, Animal, Type } from './../animal.model';
import { Component, OnInit } from '@angular/core';
import {PetService} from '../pet.service';
import { map } from 'rxjs/operators';

export class PetType {
  type: string;
  total: number;
  param: string;
}

export class SupplierPetType{
  type: string;
  total: number;
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


  animals: Animal[];

  page: Pagination;
  types = [];
  isAll = true;
  Others: Animal[];

  pettype: PetType[] = [];
  supplierType: SupplierPetType[] = [];

  supplierPets = new Map<string, Animal[]>();
  petFromSuppliers: Animal[] = [];

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
    this.getPetTypeFromSupplier();
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
    if (this.isAdmin){
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
      if (this.fromSupplier){
        this.petFromSuppliers.forEach(pet => {
          if (pet.id === id){
            this.animals = [];
            this.animals.push(pet);

          }
        });

      } else {
        this.petService.getAnimalById(id).subscribe(data => {
          const pet = data.animal;
          this.animals = [];
          this.animals.push(pet);
       });

      }

    }
  }

  // showAll(): void {
  //     this.isAll = true;
  //     this.getPetsFromAPI('/v2/animals/?');
  // }

  show(index): void{
    this.isAll = false;
    this.fromSupplier = false;
    this.getPetsFromAPI('/v2/animals/?type=' + this.pettype[index].param);
  }


  getPetFromAPI(): void{
    this.getPetsFromAPI('/v2/animals');
  }


  getPetFromSupplier(): void {
    this.fromSupplier = true;
    this.animals = this.petFromSuppliers;
  }



  getPetTypeFromSupplier(): void {
    this.firebaseService.getAll().snapshotChanges().pipe(
      map (changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val()})
      ))).subscribe(data => {
        this.petFromSuppliers = data;
        this.petFromSuppliers.forEach(element => {
          if (element.photos === undefined || element.photos.length === 0) {
            const photos: Photo[] = [];
            photos.push(this.image);
            element.photos = photos;
          }


          if (this.supplierPets.has(element.type)){
            this.supplierPets.get(element.type).push(element);
          } else {
            const animals: Animal[] = [];
            animals.push(element);
            this.supplierPets.set(element.type, animals);
          }

          console.log('----');
          console.log(this.supplierPets);
        });

        if (!this.isAdmin){
          this.animals = this.petFromSuppliers;
          this.fromSupplier = true;
        }

        console.log(this.supplierPets.keys());
        for (const key of this.supplierPets.keys()) {
          const s = new SupplierPetType();
          s.type = key;
          s.total = this.supplierPets.get(key).length;
          this.supplierType.push(s);
          console.log(key);
         }
    });
  }

  showSuppliersPet(key: string): void {
    this.fromSupplier = true;
    this.animals = this.supplierPets.get(key);
  }
}

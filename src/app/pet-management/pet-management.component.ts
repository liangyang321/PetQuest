import { FirebaseService } from './../firebase.service';
import { Pagination, Photo, Animal, Type, Organization } from './../animal.model';
import { Component, OnInit } from '@angular/core';
import {PetService} from '../pet.service';
import { map } from 'rxjs/operators';
import { ShareDataService } from '../share-data.service';
import { Router } from '@angular/router';

export class PetType {
  type: string;
  total: number;
  param: string = null;
}

@Component({
  selector: 'app-pet-management',
  templateUrl: './pet-management.component.html',
  styleUrls: ['./pet-management.component.css']
})

export class PetManagementComponent implements OnInit {

  animals: any[];
  petTypesFromAPI: PetType[] = [];
  petTypesFromFirebase: PetType[] = [];
  petsFromFirebaseByType = new Map<string, any[]>();
  petFromFirebase: any[] = [];

  isAdmin = true;
  isAllTypeFromAPI = true;
  isSourceFromAPI = true;
  isSourceFromFirebase = false;

  types = [];
  currectType = null;
  deleteAnimal: any;

  page = 1;
  totalPets: number;
  pagination: Pagination;

  image: Photo = {
    small: 'assets/images/notfound.png',
    medium: null,
    large: null,
    full: null
  };

  constructor(
    private petService: PetService,
    private firebaseService: FirebaseService,
    private shareDataService: ShareDataService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getPetsFromAPI('/v2/animals');
    this.getAllPetTypesFromAPI();
    this.getPetTypeFromFirebase();
  }

  setSharedData(animal: Animal): void{
    console.log(animal);
    this.shareDataService.saveViewPet(animal);
  }

  editAnimal(animal: Animal): void {
    this.shareDataService.editPet = animal;
  }

  getPetsFromAPI(request: string): void {
    this.isSourceFromFirebase = false;
    if (this.isAdmin){
      this.petService.getAnimal(request).subscribe( data => {
        this.animals = data.animals;
        console.log(this.animals);

        if (this.isAllTypeFromAPI) {
          this.pagination = data.pagination;
        }

        this.page = data.pagination.current_page;
        console.log('current page is ' + data.pagination.current_page);

        this.totalPets = data.pagination.total_count;

        this.animals.forEach(element => {
          this.setAnimal(element);
        });
      });
    }
  }

  getAllPetTypesFromAPI(): void{
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
            this.petTypesFromAPI.push(t);
          });
      });
    });
  }


  getPetTypeFromFirebase(): void {
    this.firebaseService.getAll().snapshotChanges().pipe(
      map (changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val()})
      ))).subscribe(data => {
        console.log('getPetTypeFromSupplier');
        console.log(data);
        this.petFromFirebase = data;
        this.totalPets = this.petFromFirebase.length;

        this.petFromFirebase.forEach( element => {
          if (element.photos === undefined || element.photos.length === 0) {
            const photos: Photo[] = [];
            photos.push(this.image);
            element.photos = photos;
          }

          if (this.petsFromFirebaseByType.has(element.type)){
            this.petsFromFirebaseByType.get(element.type).push(element);
          } else {
            const animals = [];
            animals.push(element);
            this.petsFromFirebaseByType.set(element.type, animals);
          }
        });

        if (!this.isAdmin){
          this.animals = this.petFromFirebase;
          this.isSourceFromFirebase = true;
        }

        for (const key of this.petsFromFirebaseByType.keys()) {
          const s = new PetType();
          s.type = key;
          s.total = this.petsFromFirebaseByType.get(key).length;
          this.petTypesFromFirebase.push(s);
          console.log(key);
         }
    });
  }

  search(id: any): void {
    if (id){
      if (this.isSourceFromFirebase){
        this.petFromFirebase.forEach(pet => {
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

  getAllPetFromAPI(): void{
    this.isAllTypeFromAPI = true;
    this.currectType = null;
    this.getPetsFromAPI('/v2/animals');
  }


  showAPIPetByType(index): void{
    this.isAllTypeFromAPI = false;
    this.isSourceFromFirebase = false;
    this.currectType = this.petTypesFromAPI[index].param;
    this.getPetsFromAPI('/v2/animals/?type=' + this.petTypesFromAPI[index].param);
  }

  getAllPetFromFirebase(): void {
    this.isSourceFromFirebase = true;
    this.animals = this.petFromFirebase;
    this.totalPets = this.animals.length;
  }

  showFirebasePetByType(key: string): void {
    this.isSourceFromFirebase = true;
    this.animals = this.petsFromFirebaseByType.get(key);
    this.totalPets = this.animals.length;
  }

  setDeletePet(animal): any {
    console.log('delete pet name = ' + animal.name);
    console.log('delete pet key = ' + animal.key);
    this.deleteAnimal = animal;
  }

  delete(): void {
    this.firebaseService.delete(this.deleteAnimal.key)
    .then(() => {
        this.reloadComponent();
        console.log('delete ' + this.deleteAnimal.key); })
      .catch(err => console.log(err));
  }

  reloadComponent(): void{
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/pet-management']);
  }

  pageChange(newPage: number): void {
    const queryType = this.currectType == null ? '' : '&type=' + this.currectType;
    this.getPetsFromAPI('/v2/animals?page=' + newPage + '&type=' + queryType);
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
}

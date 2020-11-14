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
  isAll = true;
  animals: any[];

  deletePetKey: string;

  page = 1;
  pagination: Pagination;
  types = [];

  Others: Animal[];
  pettype: PetType[] = [];
  supplierType: SupplierPetType[] = [];
  supplierPets = new Map<string, any[]>();
  petFromSuppliers: any[] = [];

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
    this.getPetTypeFromSupplier();
  }

  setSharedData(animal: Animal): void{
    console.log(animal);
    this.shareDataService.saveViewPet(animal);
  }

  editAnimal(animal: Animal): void {
    this.shareDataService.editPet = animal;
  }



  getPetsFromAPI(request: string): void {
    if (this.isAdmin){
      this.petService.getAnimal(request).subscribe( data => {
        this.animals = data.animals;
        console.log(this.animals);
        if (this.isAll) {
          this.pagination = data.pagination;
          this.page = data.pagination.current_page;
        }
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
            this.pettype.push(t);
          });
      });
    });
  }


  getPetTypeFromSupplier(): void {
    this.firebaseService.getAll().snapshotChanges().pipe(
      map (changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val()})
      ))).subscribe(data => {
        console.log('getPetTypeFromSupplier');
        console.log(data);
        this.petFromSuppliers = data;
        this.petFromSuppliers.forEach( element => {
          if (element.photos === undefined || element.photos.length === 0) {
            const photos: Photo[] = [];
            photos.push(this.image);
            element.photos = photos;
          }

          if (this.supplierPets.has(element.type)){
            this.supplierPets.get(element.type).push(element);
          } else {
            const animals = [];
            animals.push(element);
            this.supplierPets.set(element.type, animals);
          }
        });

        if (!this.isAdmin){
          this.animals = this.petFromSuppliers;
          this.fromSupplier = true;
        }

        for (const key of this.supplierPets.keys()) {
          const s = new SupplierPetType();
          s.type = key;
          s.total = this.supplierPets.get(key).length;
          this.supplierType.push(s);
          console.log(key);
         }
    });
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

  getAllPetFromAPI(): void{
    this.getPetsFromAPI('/v2/animals');
  }


  showAPIPetByType(index): void{
    this.isAll = false;
    this.fromSupplier = false;
    this.getPetsFromAPI('/v2/animals/?type=' + this.pettype[index].param);
  }

  getAllPetFromSupplier(): void {
    this.fromSupplier = true;
    this.animals = this.petFromSuppliers;
  }

  showSuppliersPetByType(key: string): void {
    this.fromSupplier = true;
    this.animals = this.supplierPets.get(key);
  }

  setDeletePetKey(key): any {
    console.log(key);
    this.deletePetKey = key;
  }

  delete(): void {
    console.log('XXXXXX delete:' + this.deletePetKey);
    this.firebaseService.delete(this.deletePetKey)
    .then(() => {
        this.reloadComponent();
        console.log('delete ' + this.deletePetKey);})
      .catch(err => console.log(err));
  }

  reloadComponent(): void{
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/pet-management']);
  }


  previousPage(): void{
    console.log("click previousPage");
    if (this.fromSupplier){
      console.log('No previous page');
    } else {
      if (this.pagination.current_page === 1) {
        console.log('This is first page');
      } else {
        this.getPetsFromAPI(this.pagination._links.previous.href);
      }
    }
  }

  nextPage(): void {
    console.log("click nextpage");
    if (this.fromSupplier){
      console.log('No next page');
    } else {
      if (this.pagination.current_page === this.pagination.total_pages){
        console.log('This is the last page');
      } else {
        this.getPetsFromAPI(this.pagination._links.next.href);
      }
    }
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

import { Pagination, Photo } from './../animal.model';
import { Component, OnInit } from '@angular/core';
import {PetService} from '../pet.service';
import { Animal } from '../animal.model';

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

  constructor(private petService: PetService) { }

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
    element.view = 'View';
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

  showAll(): void {
      this.isAll = true;
      this.getPetsFromAPI('/v2/animals/?');
  }

  show(index): void{
    this.isAll = false;
    this.getPetsFromAPI('/v2/animals/?type=' + this.pettype[index].param);
  }
}

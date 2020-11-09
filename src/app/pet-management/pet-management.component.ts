import { Pagination, Photo } from './../animal.model';
import { Component, OnInit } from '@angular/core';
import {PetService} from '../pet.service';
import { Animal } from '../animal.model';

@Component({
  selector: 'app-pet-management',
  templateUrl: './pet-management.component.html',
  styleUrls: ['./pet-management.component.css']
})

export class PetManagementComponent implements OnInit {

  animals: Animal[];
  page: Pagination;
  image: Photo = {
    small: 'assets/images/notfound.png',
    medium: null,
    large: null,
    full: null
  };

  constructor(private petService: PetService) { }

  ngOnInit(): void {
    // this.getPetsFromAPI();
  }

  previousPage(): void{
    console.log("click previousPage");
    console.log(this.page._links.previous);
    this.petService.getAnotherPage(this.page._links.previous.href).subscribe( data => {
        this.animals = data.animals;
        this.page = data.pagination;
        this.animals.forEach(element => {
          this.setAnimal(element);
        });
    });
  }

  nextPage(): void {
    console.log("click nextpage");
    console.log(this.page._links.next);
    this.petService.getAnotherPage(this.page._links.next.href).subscribe( data => {
        this.animals = data.animals;
        this.page = data.pagination;
        this.animals.forEach( element => {
          this.setAnimal(element);
        });
    });
  }

  getPetsFromAPI(): void {
    this.petService.getAnimal().subscribe( data => {
        this.animals = data.animals;
        this.page = data.pagination;
        this.animals.forEach(element => {
          this.setAnimal(element);
        });
    });
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


  showAll(): any {

      console.log("click all");
      console.log(this.page._links.next);
      this.petService.getAnotherPage(this.page._links.next.href).subscribe( data => {
          this.animals = data.animals;
          this.page = data.pagination;
          this.animals.forEach( element => {
            this.setAnimal(element);
          });
      });



  }

  showDogs(): void {

  }

  showCats(): void {

  }

  showOthers(): void {

  }

}

import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {PetService} from '../pet.service';
import { Animal, Photo } from '../animal.model';

@Component({
  selector: 'app-pet-management-view',
  templateUrl: './pet-management-view.component.html',
  styleUrls: ['./pet-management-view.component.css']
})
export class PetManagementViewComponent implements OnInit {

  pet: Animal;

  image: Photo = {
    small: 'assets/images/notfound.png',
    medium: 'assets/images/notfound.png',
    large: null,
    full: null
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private petService: PetService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.getAnimalById(id);
  }

  getAnimalById(id: any): void{
    this.petService.getAnimalById(id).subscribe(data => {
      this.pet = data.animal;

      if (this.pet.photos.length === 0){
        this.pet.photos.push(this.image);

      }
      console.log(this.pet);
    });
  }

}

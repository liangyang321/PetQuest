import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export class PetInfo {
  public breed: string;
  public age: string;
  public size: string;
  public gender: string;
}

@Component({
  selector: 'app-pet-search',
  templateUrl: './pet-search.component.html',
  styleUrls: ['./pet-search.component.css']
})
export class PetSearchComponent implements OnInit {

  constructor(private router: Router) { }

  model = new PetInfo();

  Dogs = [{name: 'Pet1', breed: 'Poodle', age: '8 months', gender: 'Male', location: 'San Diego, CA'},
  {name: 'Pet2', breed: 'Husky', age: '6 months', gender: 'Male', location: 'San Francisco, CA'},
  {name: 'Pet3', breed: 'Cocker Spaniel', age: '5 months', gender: 'Male', location: 'Merced, CA'},
  {name: 'Pet4', breed: 'Terrier', age: '6 months', gender: 'Female', location: 'Stockton, CA'},
  {name: 'Pet5', breed: 'Pitbull', age: '11 months', gender: 'Female', location: 'Fresno, CA'}];

  Breeds: string[] = [
    'Golden Retriever',
    'Husky',
    'Labrador',
    'Pomeranian',
    'Poodle'
  ];
  href  = '';

  ngOnInit(): void {
    this.model.breed = 'any';
    this.model.age = 'any';
    this.model.gender = 'any';
    this.model.size = 'any';
    this.href = this.router.url;
    console.log(this.href);
  }

  onSubmit(petForm): void {
    console.log(petForm);
  }
}

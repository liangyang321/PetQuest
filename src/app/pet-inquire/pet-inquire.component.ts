import { Component, OnInit, Input } from '@angular/core';
import { Animal, Photo } from '../animal.model';

@Component({
  selector: 'app-pet-inquire',
  templateUrl: './pet-inquire.component.html',
  styleUrls: ['./pet-inquire.component.css']
})
export class PetInquireComponent implements OnInit {

  @Input() pet: Animal;

  constructor() { }

  ngOnInit(): void {
  }

}

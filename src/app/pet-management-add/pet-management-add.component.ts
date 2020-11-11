import { FirebaseService} from './../firebase.service';
import { Address, Animal, Attributes, Breeds, Colors, Contact, Environment, Photo } from './../animal.model';
import { Component, OnInit } from '@angular/core';
import * as data from '../../assets/states.json';


@Component({
  selector: 'app-pet-management-add',
  templateUrl: './pet-management-add.component.html',
  styleUrls: ['./pet-management-add.component.css']
})

export class PetManagementAddComponent implements OnInit {


  pet = new Animal();
  // pet: Animal = null;

  // get value():string {
  //   var val = JSON.stringify(this.model);
  //   console.log(val);
  //   return val;
  // }



  Age: string[] = ['Baby', 'Young', 'Adult', 'Senior'];

  Gender: string[] = ['Male', 'Female'];

  Size: string[] = ['Small (0 - 6 lbs)', 'Medium (7 - 11 lbs)', 'Large (12 - 16 lbs)', 'Extra Large (17 or above)' ];

  Coat: string[] = ['Hairless', 'Short', 'Medium', 'Long'];

  State: any[] = (data as any).default;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.pet.breeds = new Breeds();
    this.pet.colors = new Colors();
    this.pet.contact = new Contact();
    this.pet.contact.address = new Address();
    this.pet.attributes = new Attributes();
    this.pet.environment = new Environment();
    this.pet.photos = [new Photo()];
  }

  onSubmit(form): void {
    console.log(form.value);
    console.log(this.pet);

    this.firebaseService.createAnimal(form.value).then(res => {
      console.log('success message');
    });

  }

}

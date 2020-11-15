import { AngularFireStorage  } from '@angular/fire/storage';
import { FirebaseService} from './../firebase.service';
import { Address, Animal, Attributes, Breeds, Colors, Contact, Environment, Photo } from './../animal.model';
import { Component, OnInit } from '@angular/core';
import * as data from '../../assets/states.json';
import { ShareDataService } from '../share-data.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pet-management-add',
  templateUrl: './pet-management-add.component.html',
  styleUrls: ['./pet-management-add.component.css']
})

export class PetManagementAddComponent implements OnInit {
  pet: any;
  isAdd = true;
  isEdit = false;
  imageUrl = null;

  Types: string[] = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Horse', 'Barnyard', 'Small & Furry', 'Scales, Fins & Other'];
  Age: string[] = ['Baby', 'Young', 'Adult', 'Senior'];
  Gender: string[] = ['Male', 'Female'];
  Size: string[] = ['Small (0 - 6 lbs)', 'Medium (7 - 11 lbs)', 'Large (12 - 16 lbs)', 'Extra Large (17 or above)' ];
  Coat: string[] = ['Hairless', 'Short', 'Medium', 'Long'];
  State: any[] = (data as any).default;

  constructor(
    private firebaseService: FirebaseService,
    private shareDataService: ShareDataService,
    private fireStorage: AngularFireStorage,
    private router: Router
  ) { }

  ngOnInit(): void {
    const animal = this.shareDataService.editPet;
    console.log('Edit Animal ');
    console.log(animal);


    if (animal !== null) {
      this.isEdit = true;
      this.isAdd = false;
      this.pet = animal;
      console.log(this.pet.key);
      this.shareDataService.editPet = null;
    } else {
      this.pet = new Animal();
      this.pet.id = this.getID();
      this.pet.breeds = new Breeds();
      this.pet.colors = new Colors();
      this.pet.contact = new Contact();
      this.pet.contact.address = new Address();
      this.pet.attributes = new Attributes();
      this.pet.environment = new Environment();
      this.pet.photos = [new Photo()];
    }
  }

  getID(): any{
    return Date.now() + ( (Math.random() * 100000).toFixed());
  }

  uploadImage(event): void{
    const id = Math.random().toString(36).substring(2);
    const ref = this.fireStorage.ref(id);
    const task = ref.put(event.target.files[0]);
    const uploadState = task.snapshotChanges().pipe(
      finalize(() => {
         ref.getDownloadURL().subscribe(url => {
          console.log(url);
          this.imageUrl = url;
        });
      })
    ).subscribe();
  }

  onSubmit(form): void {
    if (this.imageUrl != null){
      this.pet.photos[0].small = this.imageUrl;
      this.pet.photos[0].medium = this.imageUrl;
    }

    if (this.isEdit){
      this.update();

    } else {
      const val = JSON.parse(JSON.stringify(this.pet));
      this.firebaseService.createAnimal(val).then(res => {
        console.log('success message');
      });
    }
    this.reloadComponent();
  }

  update(): void {
    console.log(this.pet.key);

    this.firebaseService.update(this.pet.key, this.pet)
      .then(() => console.log('Update sucessefully'))
      .catch(err => console.log(err));

    console.log('Update');
    console.log(this.pet);
  }

  reloadComponent(): void{
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/pet-management']);
  }
}

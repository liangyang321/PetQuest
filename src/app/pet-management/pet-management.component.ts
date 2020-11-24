import {FirebaseService} from './../firebase.service';
import {Animal, Photo} from './../animal.model';
import {Component, OnInit} from '@angular/core';
import {PetService} from '../pet.service';
import {map} from 'rxjs/operators';
import {ShareDataService} from '../share-data.service';
import {Router} from '@angular/router';
import {User} from '../user.model';

export class PetType {
  type: string;
  total: number;
  param: string = null;
}

export class PageInfo {
  pets: any[];
  isSourceFromFirebase: boolean;
  page: number;
  currectTypeFirebase: string;
  currentQuery: string;
  totalPetFromAPI: number;
}

@Component({
  selector: 'app-pet-management',
  templateUrl: './pet-management.component.html',
  styleUrls: ['./pet-management.component.css']
})

export class PetManagementComponent implements OnInit {
  petsFrom = '';
  user: User;
  isAdmin: boolean;
  isTotal = true;
  totalPetFromAPI = 0;
  animals: any[];
  petTypesFromAPI: PetType[] = [];
  petTypesFromFirebase: PetType[] = [];
  allPetsFromFirebase: any[] = [];
  petsFromFirebaseByType = new Map<string, any[]>();
  currentQuery = null;
  isAllTypeFromAPI = true;
  isSourceFromAPI = true;
  isSourceFromFirebase = false;
  types = [];
  currectTypeAPI = null;
  currectTypeFirebase = null;
  deleteAnimal: any;
  page: any;
  totalPets = 0;

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
  ) {
  }

  ngOnInit(): void {
    this.user = this.shareDataService.getCurrentUser();
    const currentPageInfo = this.petService.currentPageInfo;

    if (this.user.role === 'admin') {
      this.isAdmin = true;
      this.petsFrom = 'Firebase';

      if (currentPageInfo === null) {
        this.getPetsFromAPI('/v2/animals');
      } else {
        this.totalPetFromAPI = currentPageInfo.totalPetFromAPI;
        this.isSourceFromFirebase = currentPageInfo.isSourceFromFirebase;
        if (!this.isSourceFromFirebase) {
          this.getPetsFromAPI(currentPageInfo.currentQuery);
          this.petService.currentPageInfo = null;
        }
      }
      this.getAllPetTypesFromAPI();
      this.getPetFromFirebase();
    }

    if (this.user.role === 'shelter') {
      this.isAdmin = false;
      this.petsFrom = 'My Pets';
      this.isSourceFromFirebase = true;
      this.getPetFromFirebase();
    }
  }

  getAllPetTypesFromAPI(): void {
    this.petService.getTypes().subscribe(data => {
      this.types = data.types;
      data.types.forEach(element => {
        let param: string = element.name;
        if (element.name === 'Small & Furry') {
          param = 'Small-Furry';
        }
        if (element.name === 'Scales, Fins & Other') {
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


  getPetsFromAPI(request: string): void {
    this.currentQuery = request;
    this.isSourceFromFirebase = false;

    this.petService.getAnimal(request).subscribe(data => {
      this.animals = data.animals;
      this.animals.forEach(element => {
        if (element.photos.length === 0 || element.photos === undefined) {
          element.photos.push(this.image);
        }
      });
      if (this.isTotal) {
        this.totalPetFromAPI = data.pagination.total_count;
        this.isTotal = false;
      }
      this.page = data.pagination.current_page;
      this.totalPets = data.pagination.total_count;
    });
  }

  getPetFromFirebase(): void {
    this.firebaseService.getAllAnimals().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()})
      ))).subscribe(data => {
      if (this.isAdmin) {
        this.allPetsFromFirebase = data;
      } else {
        data.forEach(element => {
          if (element.organization_id === this.user.id) {
            this.allPetsFromFirebase.push(element);
          }
        });
      }
      this.totalPets = this.allPetsFromFirebase.length;
      this.page = this.totalPets === 0 ? 0 : 1;

      this.allPetsFromFirebase.forEach(element => {
        if (element.photos === undefined || element.photos.length === 0) {
          const photos: Photo[] = [];
          photos.push(this.image);
          element.photos = photos;
        }

        if (this.petsFromFirebaseByType.has(element.type)) {
          this.petsFromFirebaseByType.get(element.type).push(element);
        } else {
          const animals = [];
          animals.push(element);
          this.petsFromFirebaseByType.set(element.type, animals);
        }
      });


      this.animals = this.allPetsFromFirebase;

      for (const key of this.petsFromFirebaseByType.keys()) {
        const s = new PetType();
        s.type = key;
        s.total = this.petsFromFirebaseByType.get(key).length;
        this.petTypesFromFirebase.push(s);
      }

      if (this.petService.currentPageInfo != null) {
        this.animals = this.petService.currentPageInfo.pets;
        this.totalPets = this.animals.length;
        this.page = this.petService.currentPageInfo.page;
        this.petService.currentPageInfo = null;
      }
    });
  }

  onPetFinderApi(): void {
    this.isAllTypeFromAPI = true;
    this.isSourceFromFirebase = false;
    this.currectTypeAPI = null;
    this.getPetsFromAPI('/v2/animals');
  }


  onApiType(index): void {
    this.isAllTypeFromAPI = false;
    this.isSourceFromFirebase = false;
    this.currectTypeAPI = this.petTypesFromAPI[index].param;
    this.getPetsFromAPI('/v2/animals/?type=' + this.petTypesFromAPI[index].param);
  }

  onPetSupplier(): void {
    this.page = 1;
    this.currectTypeFirebase = null;
    this.isSourceFromFirebase = true;
    this.animals = this.allPetsFromFirebase;
    this.totalPets = this.animals.length;
  }

  onPetSupplierType(key: string): void {
    this.page = 1;
    this.currectTypeFirebase = key;
    this.isSourceFromFirebase = true;
    this.animals = this.petsFromFirebaseByType.get(key);
    this.totalPets = this.animals.length;
  }

  search(id: any): void {
    if (id) {
      if (this.isSourceFromFirebase) {
        this.allPetsFromFirebase.forEach(pet => {
          if (pet.id === id) {
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

  setSharedData(animal: Animal): void {
    this.setCurrentPageInfo();
    this.shareDataService.saveViewPet(animal);
  }

  editAnimal(animal: Animal): void {
    this.setCurrentPageInfo();
    this.shareDataService.editPet = animal;
  }


  setDeletePet(animal): any {
    this.setCurrentPageInfo();
    this.deleteAnimal = animal;
  }

  delete(): void {
    this.setCurrentPageInfo();
    this.firebaseService.deleteAnimal(this.deleteAnimal.key)
      .then(() => {
        this.reloadComponent();
      })
      .catch(err => console.log(err));
  }

  reloadComponent(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/pet-management']);
  }

  pageChange(newPage: number): void {
    if (this.isSourceFromFirebase) {
      this.page = newPage;
    } else {
      const queryType = this.currectTypeAPI == null ? '' : '&type=' + this.currectTypeAPI;
      const currentAPIQuery = '/v2/animals?page=' + newPage + '&type=' + queryType;
      this.getPetsFromAPI(currentAPIQuery);
    }
  }

  setCurrentPageInfo(): void {
    const pageInfo = new PageInfo();
    pageInfo.pets = this.animals;
    pageInfo.isSourceFromFirebase = this.isSourceFromFirebase;
    pageInfo.currentQuery = this.currentQuery;
    pageInfo.currectTypeFirebase = this.currectTypeFirebase;
    pageInfo.page = this.page;
    pageInfo.totalPetFromAPI = this.totalPetFromAPI;
    this.petService.currentPageInfo = pageInfo;
  }
}

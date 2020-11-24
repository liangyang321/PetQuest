import {NavigationService} from './../navigation.service';
import {Photo} from './../animal.model';
import {Component, OnInit} from '@angular/core';
import {ShareDataService} from '../share-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PetService} from '../pet.service';

@Component({
  selector: 'app-pet-management-view',
  templateUrl: './pet-management-view.component.html',
  styleUrls: ['./pet-management-view.component.css']
})
export class PetManagementViewComponent implements OnInit {

  pet: any;

  // delete image if using shareDataService;
  image: Photo = {
    small: 'assets/images/notfound.png',
    medium: 'assets/images/notfound.png',
    large: null,
    full: null
  };

  constructor(
    private shareDataService: ShareDataService,
    // delete following if using shareDataService;
    private router: Router,
    private route: ActivatedRoute,
    private petService: PetService,
    private navService: NavigationService
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;

    if (id === '0') {
      this.pet = this.shareDataService.getViewPet();
    } else {
      this.getAnimalById(id);
    }
  }

  goBack(): void {
    this.navService.back();
  }

  // delete getAnimalById() if using shareDataService;
  getAnimalById(id: any): void {
    this.petService.getAnimalById(id).subscribe(data => {
      this.pet = data.animal;
      if (this.pet.photos.length === 0) {
        this.pet.photos.push(this.image);
      }
    });
  }
}

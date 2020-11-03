import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pet-management',
  templateUrl: './pet-management.component.html',
  styleUrls: ['./pet-management.component.css']
})
export class PetManagementComponent implements OnInit {
  Animals = [
    {name: 'AA-Jade', id: '49487281', type: 'Cat', oid: 'TX556', actionv: 'View', actione: 'Edit', actiond: 'Delete', image: 'https:\/\/dl5zpyw5k3jeb.cloudfront.net\/photos\/pets\/49487281\/1\/?bust=1602879471\u0026width=100'},
    {name: 'Nickel', id: '49487363', type: 'Cat', oid: 'PA872', actionv: 'View', actione: 'Edit', actiond: 'Delete', image: 'https:\/\/dl5zpyw5k3jeb.cloudfront.net\/photos\/pets\/49487363\/4\/?bust=1602879501\u0026width=100'},
    {name: 'Brick', id: '49487372', type: 'Dog', oid: 'TX556', actionv: 'View', actione: 'Edit', actiond: 'Delete', image: 'https:\/\/dl5zpyw5k3jeb.cloudfront.net\/photos\/pets\/49487372\/1\/?bust=1602879533\u0026width=100'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

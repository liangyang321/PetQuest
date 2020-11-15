import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Blogs} from '../blog.model';

@Component({
  selector: 'app-pet-care',
  templateUrl: './pet-care.component.html',
  styleUrls: ['./pet-care.component.css']
})
export class PetCareComponent implements OnInit {

  blogs: Blogs[];
  showContent: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Blogs[]>('assets/petBlog.json').subscribe(
      data => {
        this.blogs = data;
      }
    );
  }

  click(): void {
    this.showContent = !this.showContent;
    console.log(this.showContent);

  }

}

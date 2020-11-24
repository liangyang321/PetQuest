import {Component, OnInit} from '@angular/core';
import {DialogComponent} from './dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Blog} from '../blog.model';
import {PetService} from '../pet.service';

@Component({
  selector: 'app-pet-care',
  templateUrl: './pet-care.component.html',
  styleUrls: ['./pet-care.component.css']
})
export class PetCareComponent implements OnInit {

  blogs: Blog[];

  constructor(private dialog: MatDialog, private petService: PetService) {
  }

  ngOnInit(): void {
    this.initializeBlogs();
  }

  private initializeBlogs(): void {
    this.petService.getBlogs().subscribe(res => {
      this.blogs = res;
    });
  }

  openDialog(index): void {
    this.dialog.open(DialogComponent, {data: this.blogs[index].content});
  }

}

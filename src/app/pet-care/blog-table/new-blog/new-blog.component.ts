import {Component, OnInit} from '@angular/core';
import {Blog} from '../../../blog.model';
import {PetService} from '../../../pet.service';


@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css']
})
export class NewBlogComponent implements OnInit {

  title: string;
  author: string;
  type: string;
  date: string;
  content: string;
  text: string;

  constructor(private petService: PetService) {
  }

  ngOnInit(): void {

  }

  addToBlogList(): void {
    const newBlog = new Blog();
    newBlog.author = this.author;
    newBlog.title = this.title;
    newBlog.petType = this.type;
    newBlog.content = this.content;
    newBlog.date = this.date;

    this.petService.setNewBlog(newBlog);
  }
}

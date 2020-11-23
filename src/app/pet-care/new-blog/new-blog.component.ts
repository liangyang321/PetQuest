import {Component, Input, OnInit} from '@angular/core';
import {Blog} from '../../blog.model';



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


  constructor() {
  }

  ngOnInit(): void {

  }

  addToBlogList(): void {

    console.log(this.text);
  }
}

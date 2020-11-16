import {AfterViewInit, Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {PetService} from '../../pet.service';
import {Blog} from '../../blog.model';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import {EventEmitter} from 'events';

/**
 * @title Data table with sorting, pagination, and filtering.
 */

@Component({
  selector: 'app-blog-table',
  styleUrls: ['blog-table.component.css'],
  templateUrl: 'blog-table.component.html',
})
export class BlogTableComponent implements OnInit {
  // @Input() blogContent: string;
  // @Output() blogContentChange = new EventEmitter<string>();
  displayedColumns: string[] = ['title', 'author', 'petType'];
  dataSource: MatTableDataSource<Blog>;
  blogs: Blog[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private petService: PetService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.petService.getBlogs().subscribe(
      (res) => {
        this.blogs = res;
        this.dataSource = new MatTableDataSource(this.blogs);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(data: string[]): void {
    this.dialog.open(DialogComponent, {data: data});
  }
}

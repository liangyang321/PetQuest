import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {PetService} from '../../pet.service';
import {Blog} from '../../blog.model';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import {ShareDataService} from '../../share-data.service';
import {NewBlogComponent} from './new-blog/new-blog.component';

/**
 * @title Data table with sorting, pagination, and filtering.
 */

@Component({
  selector: 'app-blog-table',
  styleUrls: ['blog-table.component.css'],
  templateUrl: 'blog-table.component.html',
})
export class BlogTableComponent implements OnInit {
  @Input() newBlogPost: any;
  // @Output() blogContentChange = new EventEmitter<string>();
  displayedColumns: string[] = ['title', 'petType', 'author', 'date'];
  dataSource: MatTableDataSource<Blog>;
  blogs: Blog[];
  isAdmin: boolean;
  // selection = new SelectionModel<Blog>(true, []);

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private petService: PetService, private shareDataService: ShareDataService, private dialog: MatDialog) {
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
    if (this.shareDataService.getCurrentUser().role == 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(data: string[]): void {
    this.dialog.open(DialogComponent, {data});
  }

  // isAllSelected(): boolean {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }
  //
  // masterToggle(): void {
  //   this.isAllSelected() ?
  //     this.selection.clear() :
  //     this.dataSource.data.forEach(row => this.selection.select(row));
  // }
  openNewBlogDialog(): void {
    this.dialog.open(NewBlogComponent).updateSize('1000px');
  }

  refreshBlog(): void {
    const newBlog = this.petService.getNewBlog();
    this.blogs.push(newBlog);
    this.dataSource.data = this.blogs;
    this.table.renderRows();
  }

  // addToList(): void {
  //   const newBlog = this.petService.getNewBlog();
  //   this.blogs.push(newBlog);
  // }
}

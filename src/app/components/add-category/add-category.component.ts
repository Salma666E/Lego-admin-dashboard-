import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/firebaseServices/Category/categories.service';
import { CategoryModel } from 'src/app/models/categoriesModel';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  newCategory:CategoryModel;
  subscription: Subscription[] = [];
  @ViewChild('Description') Description: ElementRef = new ElementRef('input');
  @ViewChild('Name') Name: ElementRef = new ElementRef('input');
  constructor(private router: Router, private catService: CategoriesService) {
  }

  ngOnInit(): void {
    
  }
  addCategory() {
    
    this.newCategory = {
      name: this.Name.nativeElement.value,
      description: this.Description.nativeElement.value,
      totalOrdered: 0
    };
    this.catService.createCategory(this.newCategory);
    this.router.navigate(['Admin/Categories']);
  }

}


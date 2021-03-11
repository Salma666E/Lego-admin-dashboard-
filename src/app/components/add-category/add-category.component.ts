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
  @ViewChild('ArabicDescription') ArabicDescription: ElementRef = new ElementRef('input');
  @ViewChild('Name') Name: ElementRef = new ElementRef('input');
  @ViewChild('ArabicName') ArabicName: ElementRef = new ElementRef('input');
  @ViewChild('Logo') Logo: ElementRef = new ElementRef('input');
  constructor(private router: Router, private catService: CategoriesService) {
    this.newCategory = {name:"",arabicName:"", description: "",arabicDescription:"", logo:""};
  }

  ngOnInit(): void {
    
  }
  addCategory() {
    // this.newCategory = {name:"mk",arabicName:"", description: "",arabicDescription:"", logo:""};
    //  {
    //   name: this.Name.nativeElement.value,
    //   arabicName: this.ArabicName.nativeElement.value,
    //   description: this.Description.nativeElement.value,
    //   arabicDescription: this.ArabicDescription.nativeElement.value,
    //   logo: this.Logo.nativeElement.value,
    // };
    this.catService.createCategory(this.newCategory);
    this.router.navigate(['Admin/Categories']);
  }

}


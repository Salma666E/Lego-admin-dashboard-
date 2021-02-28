import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { CategoriesService } from 'src/app/firebaseServices/Category/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  categoryList = [];
  subscription: Subscription[] = [];
  constructor(private catSrv:CategoriesService, private router:Router,
    public translate: TranslateService) { }

  ngOnInit(): void {
    this.subscription.push(this.catSrv.getCategories().subscribe(data => {
      this.categoryList = data.map(e => {
        return { id: e.payload.doc.id, ...(e.payload.doc.data() as {}) };
      }) 
    }))
  }

  ngOnDestroy(): void {
    this.subscription.forEach(element => {
      element.unsubscribe();
    });
  }

  goToAddCategory() {
    this.router.navigate(['Admin/AddCategory']);
  }

  deleteCategory(id) {
    this.catSrv.deleteCategory(id);
  }

}

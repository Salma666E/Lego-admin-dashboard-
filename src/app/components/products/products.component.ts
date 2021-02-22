import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/firebaseServices/Category/categories.service';
import { ProductsService } from 'src/app/firebaseServices/Product/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productList;
  categoryList;

  subscription: Subscription[] = [];

  constructor(private prdSrv:ProductsService, private catSrv:CategoriesService,
              private router:Router) { }

  ngOnInit(): void {
    this.subscription.push(this.prdSrv.getProducts().subscribe(data => {
      this.productList = data.map(e => {
        return { id: e.payload.doc.id, ...(e.payload.doc.data() as {}) };
      }) 
    }))
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

  goToProduct(id) {
    // this.router.navigate(['/Product',id]);
    // document.location.href = `website/${id}`;
  }

  goToEdit(id) {
    this.router.navigate(['/Admin/Products',id]);
  }

  deleteProduct(id) {
    this.prdSrv.deleteProduct(id);
  }
  
  goToAddProducts() {
    this.router.navigate(['Admin/AddProduct']);
  }

  getCategoryNameByID(id:number) : string {
    let x = this.categoryList?.find(element=> element.id == id);
    return `${x?.name}`
  }

}

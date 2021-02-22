import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/firebaseServices/User/users.service';
import { OrdersService } from 'src/app/firebaseServices/Order/orders.service';
import { ProductsService } from 'src/app/firebaseServices/Product/products.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  customerList;
  orderList;
  productList;

  subscription: Subscription[] = [];

  constructor(private orderSrv:OrdersService, private customerSrv:UsersService,
    private prdSrv: ProductsService) { }

  ngOnInit(): void {
    this.subscription.push(this.customerSrv.getUsers().subscribe(data => {
      this.customerList = data.map(e => {
        return { id: e.payload.doc.id, ...(e.payload.doc.data() as {}) };
      })
    }))
    this.subscription.push(this.orderSrv.getOrders().subscribe(data => {
      this.orderList = data.map(e => {
        return { id: e.payload.doc.id, ...(e.payload.doc.data() as {}) };
      })
    }))
    this.subscription.push(this.prdSrv.getProducts().subscribe(data => {
      this.productList = data.map(e => {
        return { id: e.payload.doc.id, ...(e.payload.doc.data() as {}) };
      })
    }))
  }

  ngOnDestroy(): void {
    this.subscription.forEach(element => {
      element.unsubscribe();
    });
  }

  deleteOrder(id) {
    this.orderSrv.deleteOrder(id);
  }

  getCustomerNameByID(id:any) : string {
    let x = this.customerList?.find(element=> element.id == id);
    return `${x?.displayName}`
  }

  getProductNameByID(id:any) : string {
    let x = this.productList?.find(element=> element.id == id);
    return `${x?.name}`
  }

}

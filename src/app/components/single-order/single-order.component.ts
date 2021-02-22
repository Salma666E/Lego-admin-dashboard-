import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrdersService } from 'src/app/firebaseServices/Order/orders.service';
import { ProductsService } from 'src/app/firebaseServices/Product/products.service';
import { UsersService } from 'src/app/firebaseServices/User/users.service';

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.scss']
})
export class SingleOrderComponent implements OnInit {

  ordID;
  subscription:Subscription[] = [];
  order;
  customerList;
  productList;

  constructor(private activatedroute: ActivatedRoute,
    private orderSrv: OrdersService, private customerSrv: UsersService,
    private prdSrv: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((params: ParamMap) => {
      let OID: string | null = params.get('OID');
      this.ordID = OID;
      this.subscription.push(this.orderSrv.getSpcOrder(this.ordID).subscribe(data => {
        this.order = {id: data.payload.id, ...(data.payload.data() as {})};
        })
      )
    });
    this.subscription.push(this.customerSrv.getUsers().subscribe(data => {
      this.customerList = data.map(e => {
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
    this.router.navigate(['Admin/Orders']);
  }

  goBack() {
    this.router.navigate(['Admin/Orders']);
  }

  totalItems() {
    let sum = 0;
    this.order?.productsIDs.forEach(element => {
      sum += element.qty;
    });
    return sum;
  }

  applyTax() {
    return ((this.order?.totalPrice * 14)/100);
  }

  getCustomerNameByID(id:any) : string {
    let x = this.customerList?.find(element=> element.id == id);
    return `${x?.displayName}`
  }

  getProductNameByID(id:any) : string {
    let x = this.productList?.find(element=> element.id == id);
    return `${x?.name}`
  }

  getProductPriceByID(id:any) : string {
    let x = this.productList?.find(element=> element.id == id);
    return `${x?.price}`
  }

}

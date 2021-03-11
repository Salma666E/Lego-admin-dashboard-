import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/firebaseServices/Category/categories.service';
import { ProductsService } from 'src/app/firebaseServices/Product/products.service';
import { ProductModel } from 'src/app/models/productModel';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  Avail: boolean = false;

  newProduct: ProductModel;
  CategoryList = [];
  subscription: Subscription[] = [];

  prdID;
  product;

  @ViewChild('SelectCat') SelectCat: ElementRef = new ElementRef('input');
  // @ViewChild('Rating') Rating: ElementRef = new ElementRef('input');
  @ViewChild('Available') Available: ElementRef = new ElementRef('input');
  @ViewChild('description') description: ElementRef = new ElementRef('input');
  @ViewChild('ArabicDescription') ArabicDescription: ElementRef = new ElementRef('input');
  @ViewChild('Stock') Stock: ElementRef = new ElementRef('input');
  @ViewChild('Image') Image: ElementRef = new ElementRef('input');
  @ViewChild('Image') Image1: ElementRef = new ElementRef('input');
  @ViewChild('Image') Image2: ElementRef = new ElementRef('input');
  @ViewChild('Image') Image3: ElementRef = new ElementRef('input');
  @ViewChild('Price') Price: ElementRef = new ElementRef('input');
  @ViewChild('Name') Name: ElementRef = new ElementRef('input');
  @ViewChild('Related') Related: ElementRef = new ElementRef('input');
  @ViewChild('ArabicName') ArabicName: ElementRef = new ElementRef('input');
  constructor(private router: Router, private prdSrv: ProductsService,
    private catSrv: CategoriesService, private activatedroute: ActivatedRoute) {
      this.newProduct = {
        name: "",
        arabicName: "",
        description: "",
        arabicDescription: "",
        price: null,
        stock: null,
        image: "",
        available: true,
        // rating: parseInt(this.Rating.nativeElement.value),
        rating: null,
        categoryID: "",
        relatedProducts: [
          ""
        ],
        images: [
          "",
          "",
          "",
        ]
      };
  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((params: ParamMap) => {
      let PID: string | null = params.get('PID');
      this.prdID = PID;
      this.subscription.push(this.prdSrv.getSpcProduct(this.prdID).subscribe(data => {
        this.product = { id: data.payload.id, ...(data.payload.data() as {}) };
        this.newProduct.rating = this.product.rating
      })
      )
    });
    this.subscription.push(this.catSrv.getCategories().subscribe(data => {
      this.CategoryList = data.map(e => {
        return { id: e.payload.doc.id, ...(e.payload.doc.data() as {}) };
      })
    }))
  }

  ngAfterViewInit(): void {
    this.SelectCat.nativeElement.style.fontStyle = 'italic';
    this.SelectCat.nativeElement.style.fontWeight = 'bold';
    this.SelectCat.nativeElement.style.backgroundColor = 'lightgray';
  }
  editProduct() {
    // if (this.Available.nativeElement.value = "on")
    //   this.Avail = true;
    // else
    //   this.Avail = false;
    // this.newProduct = {
    //   name: this.Name.nativeElement.value,
    //   arabicName: this.ArabicName.nativeElement.value,
    //   description: this.description.nativeElement.value,
    //   arabicDescription: this.ArabicDescription.nativeElement.value,
    //   price: parseFloat(this.Price.nativeElement.value),
    //   stock: parseInt(this.Stock.nativeElement.value),
    //   image: this.Image.nativeElement.value,
    //   available: true,
    //   // rating: parseInt(this.Rating.nativeElement.value),
    //   rating: this.product.rating,
    //   categoryID: this.SelectCat.nativeElement.value,
    //   relatedProducts: [
    //     this.Related.nativeElement.value,
    //   ],
    //   images: [
    //     this.Image1.nativeElement.value,
    //     this.Image2.nativeElement.value,
    //     this.Image3.nativeElement.value
    //   ]
    // };
    this.prdSrv.updateProductByID(this.newProduct, this.prdID);
    this.router.navigate(['Admin/Products']);
  }

}

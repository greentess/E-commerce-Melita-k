import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainInfoComponent } from './components/pages/main-info/main-info.component';
import { CatalogPageComponent } from './components/pages/catalog-page/catalog-page.component';
import { ItemPageComponent } from './components/pages/item-page/item-page.component';
import { SearchComponent } from './components/partials/search/search.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { TagsComponent } from './components/partials/tags/tags.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { TitleComponent } from './components/partials/title/title.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { InputContainerComponent } from './components/partials/input-container/input-container.component';
import { InputValidationComponent } from './components/partials/input-validation/input-validation.component';
import { TextInputComponent } from './components/partials/text-input/text-input.component';
import { DefaultButtonComponent } from './components/partials/default-button/default-button.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { LoadingComponent } from './components/partials/loading/loading.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { OrderItemsListComponent } from './components/partials/order-items-list/order-items-list.component';

import { AuthInterceptor } from './auth/auth.interceptor';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { ContactsComponent } from './components/pages/contacts/contacts.component';
import { NavbarComponent } from './components/partials/navbar/navbar.component';
import { TagsOnMainComponent } from './components/partials/tags-on-main/tags-on-main.component';
import { SliderComponent } from './components/partials/slider/slider.component';
import { OrdersPageComponent } from './components/pages/orders-page/orders-page.component';
import { ManageComponent } from './components/pages/manage/manage.component';
import { BaseComponent } from './components/pages/basic/base.component';
import { AdminNavbarComponent } from './components/partials/admin-navbar/admin-navbar.component';
import { AdminFooterComponent } from './components/partials/admin-footer/admin-footer.component';
import { AdminProductsComponent } from './components/pages/admin-products/admin-products.component';
import { AdminAddproductComponent } from './components/pages/admin-addproduct/admin-addproduct.component';
import { AdminOrdersComponent } from './components/pages/admin-orders/admin-orders.component';
import { SortPipe } from './components/pages/catalog-page/sort.pipe';
import { GalleryDirective } from './components/pages/item-page/gallery.directive';
import { AboutCompanyComponent } from './components/pages/company-about/about-company.component';
import { CompanyKnivesComponent } from './components/pages/company-knives/company-knives.component';
import { CompanyAviaComponent } from './components/pages/company-avia/company-avia.component';
import { DilersComponent } from './components/pages/dilers/dilers.component';
import { TagsOnMainTwoComponent } from './components/partials/tags-on-main-two/tags-on-main-two.component';
import { StartPageComponent } from './components/pages/start-page/start-page.component';
import { StartNavbarComponent } from './components/partials/start-navbar/start-navbar.component';
import { MainStartPageComponent } from './components/pages/main-start-page/main-start-page.component';
import { StartFooterComponent } from './components/partials/start-footer/start-footer.component';
import { PredCatalogComponent } from './components/pages/pred-catalog/pred-catalog.component';
import { FiltersComponent } from './components/partials/filters/filters.component';
import { Ng5SliderModule } from 'ng5-slider';
import { CitySortPipe } from './components/pages/dilers/city-sort.pipe';
import { SplitPipe } from './components/pages/item-page/split.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainInfoComponent,
    CatalogPageComponent,
    ItemPageComponent,
    SearchComponent,
    FooterComponent,
    TagsComponent,
    CartPageComponent,
    TitleComponent,
    NotFoundComponent,
    LoginPageComponent,
    InputContainerComponent,
    InputValidationComponent,
    TextInputComponent,
    DefaultButtonComponent,
    RegisterPageComponent,
    LoadingComponent,
    CheckoutPageComponent,
    OrderItemsListComponent,
    PaymentPageComponent,
    ContactsComponent,
    NavbarComponent,
    TagsOnMainComponent,
    SliderComponent,
    OrdersPageComponent,
    ManageComponent,
    BaseComponent,
    AdminNavbarComponent,
    AdminFooterComponent,
    AdminProductsComponent,
    AdminAddproductComponent,
    AdminOrdersComponent,
    SortPipe,
    GalleryDirective,
    AboutCompanyComponent,
    CompanyKnivesComponent,
    CompanyAviaComponent,
    DilersComponent,
    TagsOnMainTwoComponent,
    StartPageComponent,
    StartNavbarComponent,
    MainStartPageComponent,
    StartFooterComponent,
    PredCatalogComponent,
    FiltersComponent,
    CitySortPipe,
    SplitPipe
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    Ng5SliderModule,
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass:'toast-bottom-right',
      newestOnTop:false
    }),
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi: true },
    {provide:HTTP_INTERCEPTORS, useClass:LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

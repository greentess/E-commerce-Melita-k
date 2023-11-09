import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { CatalogPageComponent } from './components/pages/catalog-page/catalog-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { ContactsComponent } from './components/pages/contacts/contacts.component';
import { ItemPageComponent } from './components/pages/item-page/item-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { MainInfoComponent } from './components/pages/main-info/main-info.component';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { OrdersPageComponent } from './components/pages/orders-page/orders-page.component';

import { BaseComponent } from './components/pages/basic/base.component';
import { ManageComponent } from './components/pages/manage/manage.component';
import { AdminProductsComponent } from './components/pages/admin-products/admin-products.component';
import { AdminAddproductComponent } from './components/pages/admin-addproduct/admin-addproduct.component';
import { AdminOrdersComponent } from './components/pages/admin-orders/admin-orders.component';
import { AboutCompanyComponent } from './components/pages/company-about/about-company.component';
import { DilersComponent } from './components/pages/dilers/dilers.component';
import { CompanyAviaComponent } from './components/pages/company-avia/company-avia.component';
import { CompanyKnivesComponent } from './components/pages/company-knives/company-knives.component';

import { StartPageComponent } from './components/pages/start-page/start-page.component';
import { MainStartPageComponent } from './components/pages/main-start-page/main-start-page.component';
import { PredCatalogComponent } from './components/pages/pred-catalog/pred-catalog.component';
const routes: Routes = [
	{
		path: '',
		pathMatch: "full",
		redirectTo: "start"
	},

  {
		path: "start",
		component: StartPageComponent,
		children: [
			{
				path: '',
				component: MainStartPageComponent,
			},
			{
        path:'contacts', component: ContactsComponent
			},
      {
        path:'about-company',component:AboutCompanyComponent
			},
			{
        path:'company-knives', component: CompanyKnivesComponent
			},
			{
        path:'company-avia',component:CompanyAviaComponent
			}
    ]
	},

	{
		path: "home",
		component: BaseComponent,
		children: [
			{
				path: '',
				component: MainInfoComponent,
			},
      {
        path:'search/:searchTerm',
        component:CatalogPageComponent
			},
			{
        path:'item/:id',
        component:ItemPageComponent
			},
			{
        path:'mainpage',
        component:MainInfoComponent
			},
			{
        path:'catalog',
        component:CatalogPageComponent
			},
      {
        path:'tag/:tag',component:CatalogPageComponent
			},
      {
        path:'catalog/:tag',component:PredCatalogComponent
			},
			{
        path:'cart-page',component:CartPageComponent
			},
			{
        path:'login',component:LoginPageComponent
			},
			{
        path:'register',component:RegisterPageComponent
			},
      {
        path:'checkout', component: CheckoutPageComponent, canActivate:[AuthGuard]
			},
			{
        path:'payment', component: PaymentPageComponent, canActivate:[AuthGuard]
			},
			{
        path:'contacts', component: ContactsComponent
			},
			{
        path:'myorders',component:OrdersPageComponent
			},
      {
        path:'about-company',component:AboutCompanyComponent
			},
			{
        path:'company-knives', component: CompanyKnivesComponent
			},
			{
        path:'company-avia',component:CompanyAviaComponent
			},
      {
        path:'dilers',component:DilersComponent
			}

		]
	},
	{
		path: "manage",
		component: ManageComponent,
		children: [
			{
				path: '',
				component: AdminProductsComponent
			},
      {
				path: 'item/add',
				component: AdminAddproductComponent
			},
      {
				path: 'item/add/:itemId',
				component: AdminAddproductComponent
			},
			{
        path:'orders',component:AdminOrdersComponent
			},
      {
        path:'status/:status',component:AdminOrdersComponent
			},
		]
	}

]


/* const routes: Routes = [
  {path:'', component:MainInfoComponent},
  {path:'search/:searchTerm',component:CatalogPageComponent},
  {path:'item/:id',component:ItemPageComponent},
  {path:'mainpage',component:MainInfoComponent},
  {path:'catalog',component:CatalogPageComponent},
  {path:'tag/:tag',component:CatalogPageComponent},
  {path:'cart-page',component:CartPageComponent},
  {path:'login',component:LoginPageComponent},
  {path:'register',component:RegisterPageComponent},
  {path:'checkout', component: CheckoutPageComponent, canActivate:[AuthGuard]},
  {path:'payment', component: PaymentPageComponent, canActivate:[AuthGuard]},
  {path:'contacts', component: ContactsComponent},

  {path:'orders-page/:name',component:OrdersPageComponent},


]; */

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

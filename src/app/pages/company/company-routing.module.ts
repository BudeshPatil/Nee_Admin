import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyAddComponent } from './company-add/company-add.component';
import { CompanyViewComponent } from './company-view/company-view.component';
import { AuthGuard } from 'src/app/guard/auth.guard';


const routes: Routes = [
	{ path: 'add', component: CompanyAddComponent, canActivate: [AuthGuard] },
	{ path: 'view', component: CompanyViewComponent, canActivate: [AuthGuard] },
	{ path: 'edit/:id', component: CompanyAddComponent, canActivate: [AuthGuard], data: { title: 'edit' } },
	{ path: "**", component: CompanyViewComponent, canActivate: [AuthGuard] }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CompanyRoutingModule { }

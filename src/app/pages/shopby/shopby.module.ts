import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopbyRoutingModule } from './shopby-routing.module';
import { AddShopbyComponent } from './add-shopby/add-shopby.component';
import { ViewShopbyComponent } from './view-shopby/view-shopby.component';
import { DatamoduleModule } from 'src/app/datamodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
	declarations: [
		AddShopbyComponent,
		ViewShopbyComponent
	],
	imports: [
		CommonModule,
		ShopbyRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		NgxUploaderModule,
		AngularEditorModule,
		Ng2SearchPipeModule,
		DatamoduleModule
	]
})
export class ShopbyModule { }

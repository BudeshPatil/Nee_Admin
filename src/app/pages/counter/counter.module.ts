import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterRoutingModule } from './counter-routing.module';
import { ViewCounterComponent } from './view-counter/view-counter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [
		ViewCounterComponent
	],
	imports: [
		CommonModule,
		CounterRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
	]
})
export class CounterModule { }

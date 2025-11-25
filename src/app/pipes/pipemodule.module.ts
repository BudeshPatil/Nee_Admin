import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivefilterPipe } from './activefilter.pipe';
import { TopsearchPipe } from './topsearch.pipe';

@NgModule({
  declarations: [
    ActivefilterPipe,
    TopsearchPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[ActivefilterPipe,TopsearchPipe]
})
export class PipemoduleModule {
  static forRoot(): ModuleWithProviders<PipemoduleModule> {
    return {
      ngModule: PipemoduleModule,
      providers: []
    };
  }
}
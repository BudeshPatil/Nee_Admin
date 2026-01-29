import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivefilterPipe } from './pipes/activefilter.pipe';

@NgModule({
  declarations: [
    ActivefilterPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[ActivefilterPipe]
})
export class PipemoduleModule {
  static forRoot(): ModuleWithProviders<PipemoduleModule> {
    return {
      ngModule: PipemoduleModule,
      providers: []
    };
  }
}
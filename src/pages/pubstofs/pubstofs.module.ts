import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PubstofsPage } from './pubstofs';

@NgModule({
  declarations: [
    PubstofsPage,
  ],
  imports: [
    IonicPageModule.forChild(PubstofsPage),
  ],
  exports: [
    PubstofsPage
  ]
})
export class PubstofsPageModule {}

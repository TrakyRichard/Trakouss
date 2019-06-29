import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PubsvideosPage } from './pubsvideos';

@NgModule({
  declarations: [
    PubsvideosPage,
  ],
  imports: [
    IonicPageModule.forChild(PubsvideosPage),
  ],
  exports: [
    PubsvideosPage
  ]
})
export class PubsvideosPageModule {}

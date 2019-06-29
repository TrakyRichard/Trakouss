import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlbumlistPage } from './albumlist';

@NgModule({
  declarations: [
    AlbumlistPage,
  ],
  imports: [
    IonicPageModule.forChild(AlbumlistPage),
  ],
  exports: [
    AlbumlistPage
  ]
})
export class AlbumlistPageModule {}

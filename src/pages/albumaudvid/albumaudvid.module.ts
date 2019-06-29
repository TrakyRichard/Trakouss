import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlbumaudvidPage } from './albumaudvid';

@NgModule({
  declarations: [
    AlbumaudvidPage,
  ],
  imports: [
    IonicPageModule.forChild(AlbumaudvidPage),
  ],
  exports: [
    AlbumaudvidPage
  ]
})
export class AlbumaudvidPageModule {}

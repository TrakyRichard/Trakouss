import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PubsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pubs',
  templateUrl: 'pubs.html',
})
export class PubsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PubsPage');
  }

  sharetofs()
  {
    this.navCtrl.push('PubstofsPage');
  }

  sharevideos()
  {
    this.navCtrl.push('PubsvideosPage');
  }

  shareaudios()
  {
    this.navCtrl.push('PubsaudiosPage');
  }

  sharedocs()
  {
    this.navCtrl.push('PubsdocsPage');
  }

}
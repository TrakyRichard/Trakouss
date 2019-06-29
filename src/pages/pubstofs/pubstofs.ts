import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,AlertController } from 'ionic-angular';
import {PublicationsProvider} from '../../providers/publications/publications'
/**
 * Generated class for the PubstofsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pubstofs',
  templateUrl: 'pubstofs.html',
})
export class PubstofsPage {
  pick : any;
  select : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public pubservice : PublicationsProvider,
              public loadCtrl : LoadingController, public alertCtrl : AlertController) {
            this.pick = [];
            this.select = [];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PubstofsPage');
  }

  pickImage()
  {
    this.pubservice.getimage().then((pubtofs) =>{
      this.pick = pubtofs;
    }).catch((err) =>{
      alert(err);
    })
  }

  selectImage()
  {
    this.pubservice.getimage().then((pubsvids) =>{
      this.select = pubsvids;
    }).catch((err) =>{
      alert(err);
    })
  }

}

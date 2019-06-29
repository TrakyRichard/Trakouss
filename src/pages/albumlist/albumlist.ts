import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VarGlobal } from '../../global/var.global';
import { listAlbum } from '../../models/interfaces/listAlbum'
import firebase from 'firebase';
import 'firebase/firestore';

/**
 * Generated class for the AlbumlistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-albumlist',
  templateUrl: 'albumlist.html',
})
export class AlbumlistPage {

  Albums: Array<listAlbum> = [];


  constructor(public navCtrl: NavController, public navParams: NavParams,public vg : VarGlobal) {

    this.Albums = []
    let db = firebase.firestore();
    db.settings({ timestampsInSnapshots: true });
    db.collection('Artistes').doc('artiste1').collection('listAlbums')
    .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          console.log(

            this.Albums.push({
              nomAlbum : doc.data().nomAlbum,
              nombreAudios : doc.data().nombreAudios,
              nombreVideos : doc.data().nombreVideos,
              photoAlbum : doc.data().photoAlbum
            })
          )
        })
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlbumlistPage');
  }


  goToAlbumDetail(album: listAlbum) {

    this.vg.idAlbum = album.nomAlbum
    // go to the region detail page
    // and pass in the session data
    this.navCtrl.push('AlbumaudvidPage');
  }

}

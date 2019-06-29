import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import  firebase  from 'firebase';
import 'firebase/firestore';
import { artiste } from '../../models/interfaces/artiste';
import { VarGlobal } from '../../global/var.global';

/**
 * Generated class for the AlbumPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-album',
  templateUrl: 'album.html',
})
export class AlbumPage {

Artiste : Array<artiste> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public vg: VarGlobal) {
      this.Artiste = []
    let db = firebase.firestore();
    db.settings({ timestampsInSnapshots: true });
     db.collection('Artistes')
    .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
          
console.log(

  this.Artiste.push({
    nom_artiste: doc.data().nom,
    photo_artiste: doc.data().photo,
    type_artiste: doc.data().prenom
  }) 
        )
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });


    // let albumRef = artisteRef.doc('allArtiste').collection('listAlbums');
    // let allAlbum = albumRef.get().then(snapshot =>{
    //   snapshot.forEach(doc =>{
    //       console.log(doc.id, '=>', doc.data());
    //   })
    // }).catch(err =>{
    //   console.log(err);
    // })

  }

  showArtisteDetail(artiste : artiste)
  {
    this.vg.idArtiste = artiste.nom_artiste;
    this.navCtrl.push('AlbumlistPage', );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlbumPage');
  }


  searchuser(searchbar) {

  }
}

import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage } from '@ionic/storage';
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { MediaCapture, CaptureVideoOptions, MediaFile } from '@ionic-native/media-capture';
 
/**
 * Generated class for the PubsvideosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
const MEDIA_FILES_KEY = 'mediaFiles'
@IonicPage()
@Component({
  selector: 'page-pubsvideos',
  templateUrl: 'pubsvideos.html',
})
export class PubsvideosPage {

  @ViewChild('myvideo') myVideo : any;

  mediafile = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage : Storage, public media : Media,
              public mediaCapture : MediaCapture, public file : File ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PubsvideosPage');
    this.storage.get(MEDIA_FILES_KEY).then(res =>{
      this.mediafile = JSON.parse(res) || [];
    })
  }

  selectVideos()
  {

  }

  pickVideos()
  {
    let options : CaptureVideoOptions = {
        limit : 1,
        duration : 40
    }

    this.mediaCapture.captureVideo(options).then((res : MediaFile[]) =>{
        let capturedFile = res[0];
        console.log('myFile'+ capturedFile);

        let fileName = capturedFile.name;
        let dir = capturedFile['LocalURL'].split('/');
        dir.pop();
        let fromDirectory = dir.join('/');
        let toDirectory = this.file.dataDirectory;

        this.file.copyFile(fromDirectory, fileName, toDirectory, fileName).then(res =>{          
          this.storeMediaFile([{name : fileName, size : capturedFile.size}])
        })
        

    })
  }
    playfile(myfile)
    {

      let path = this.file.dataDirectory + myfile.name;
      let url = path.replace(/^file:\/\//, '');
      let video = this.myVideo.nativeElement;
      video.src = url;
      video.play();
    }
  storeMediaFile(files)
  {
    console.log('play', files);
    
    this.storage.get(MEDIA_FILES_KEY).then(res =>{
      if (res) {
          let arr = JSON.parse(res);
          arr = arr.concat(files);
          this.storage.set(MEDIA_FILES_KEY, JSON.stringify(arr))
      }

      else {
        this.storage.set(MEDIA_FILES_KEY, JSON.stringify(files))
      }

      this.mediafile = this.mediafile.concat(files);
    })
  }

}

import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';
import { Events } from 'ionic-angular';
/*
  Generated class for the PublicationsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PublicationsProvider {

  fbref : any;
  firegroup = firebase.database().ref('/groups');
  mygroups: Array<any> = [];
  nativepath: any;
  firestore = firebase.storage();
  grouppic;
  groupmsgs;
  currentgroup: Array<any> = [];
  currentgroupname;


  constructor(public filechooser: FileChooser,
    public file: File, public camera : Camera, public events : Events) {
      
      this.fbref = firebase.storage().ref();
    console.log('Hello PublicationsProvider Provider');
  }


  takevideo()
  {

  }


    getvideo()
    {

      var promise = new Promise((resolve, reject) => {
        this.filechooser.open().then((url) => {
          (<any>window).FilePath.resolveNativePath(url, (result) => {
            this.nativepath = result;
            (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
              res.file((resFile) => {
                var reader = new FileReader();
                reader.readAsArrayBuffer(resFile);
                reader.onloadend = (evt: any) => {
                  var imgBlob = new Blob([evt.target.result], { type: 'video/mp4' });
                  var uuid = this.guid();
                  var imageStore = this.firestore.ref('/pubvids').child(firebase.auth().currentUser.uid).child('pubvids' + uuid);
                  imageStore.put(imgBlob).then((res) => {
                    resolve(res.downloadURL);
                  }).catch((err) => {
                    reject(err);
                  })
                    .catch((err) => {
                      reject(err);
                    })
                }
              })
            })
          })
        })
      })
      return promise;
    }

  // chooseImage() {
  //   this.filechooser.open().then((url) => {
  //     alert(url)
  //     this.file.resolveLocalFilesystemUrl(url).then((newUrl) => {
  //       alert(JSON.stringify(newUrl));

  //       let dirpath = newUrl.nativeURL;
  //       let dirPathSegment = dirpath.split('/');     // Rogner la chaine de caractere dans le tableau
  //       dirPathSegment.pop();                         // Le suppriler de l'ncien element
  //       dirpath = dirPathSegment.join('/');

  //       this.file.readAsArrayBuffer(dirpath, newUrl.name).then(async (buffer) => {
  //         await this.upload(buffer, newUrl.name);
  //       })
  //     })
  //   })
  // }

  // async upload(buffer, name) {
  //   let blob = new Blob([buffer], { type: 'image/jpeg' });

  //   let storage = firebase.storage();

  //   storage.ref('/imgPub/' + name).put(blob).then((d) => {
  //     alert('image importer');
  //   }).catch((err) => {
  //     alert(JSON.stringify(err));
  //   })
  // }

  takimage() {

      const options: CameraOptions = {
        sourceType : this.camera.PictureSourceType.SAVEDPHOTOALBUM,
        quality: 80,
        allowEdit : false,
        destinationType: this.camera.DestinationType.FILE_URI,
        mediaType: this.camera.MediaType.ALLMEDIA,
        }


    var promise = new Promise((resolve, reject) => {
      this.camera.getPicture(options).then((url) => {
        (<any>window).FilePath.resolveNativePath(url, (result) => {
          this.nativepath = result;
          (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
            res.file((resFile) => {
              var reader = new FileReader();
              reader.readAsArrayBuffer(resFile);
              reader.onloadend = (evt: any) => {
                var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                var uuid = this.guid();
                var imageStore = this.firestore.ref('/takepubtofs').child(firebase.auth().currentUser.uid).child('takepubtofs' + uuid);
                imageStore.put(imgBlob).then((res) => {
                  resolve(res.downloadURL);
                }).catch((err) => {
                  reject(err);
                })
                  .catch((err) => {
                    reject(err);
                  })
              }
            })
          })
        })
      })
    })
    return promise;
  }

  getimage()
  {
    var promise = new Promise((resolve, reject) => {
      this.filechooser.open().then((url) => {
        (<any>window).FilePath.resolveNativePath(url, (result) => {
          this.nativepath = result;
          (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
            res.file((resFile) => {
              var reader = new FileReader();
              reader.readAsArrayBuffer(resFile);
              reader.onloadend = (evt: any) => {
                var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                var uuid = this.guid();
                var imageStore = this.firestore.ref('/getpubtofs').child(firebase.auth().currentUser.uid).child('getpubtofs' + uuid);
                imageStore.put(imgBlob).then((res) => {
                  resolve(res.downloadURL);
                }).catch((err) => {
                  reject(err);
                })
                  .catch((err) => {
                    reject(err);
                  })
              }
            })
          })
        })
      })
    })
    return promise;
  }

  addgroupmsg(newmessage) {
    return new Promise((resolve) => {


      this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).child('owner').once('value', (snapshot) => {
        var tempowner = snapshot.val();
        this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).child('msgboard').push({
          sentby: firebase.auth().currentUser.uid,
          displayName: firebase.auth().currentUser.displayName,
          photoURL: firebase.auth().currentUser.photoURL,
          message: newmessage,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(() => {
          if (tempowner != firebase.auth().currentUser.uid) {
            this.firegroup.child(tempowner).child(this.currentgroupname).child('msgboard').push({
              sentby: firebase.auth().currentUser.uid,
              displayName: firebase.auth().currentUser.displayName,
              photoURL: firebase.auth().currentUser.photoURL,
              message: newmessage,
              timestamp: firebase.database.ServerValue.TIMESTAMP
            })
          }
          var tempmembers = [];
          this.firegroup.child(tempowner).child(this.currentgroupname).child('members').once('value', (snapshot) => {
            var tempmembersobj = snapshot.val();
            for (var key in tempmembersobj)
              tempmembers.push(tempmembersobj[key]);
          }).then(() => {
            let postedmsgs = tempmembers.map((item) => {
              if (item.uid != firebase.auth().currentUser.uid) {
                return new Promise((resolve) => {
                  this.postmsgs(item, newmessage, resolve);
                })
              }
            })
            Promise.all(postedmsgs).then(() => {
              this.getgroupmsgs(this.currentgroupname);
              resolve(true);
            })
          })
        })
      })
    })
  }

  postmsgs(member, msg, cb) {
    this.firegroup.child(member.uid).child(this.currentgroupname).child('msgboard').push({
      sentby: firebase.auth().currentUser.uid,
      displayName: firebase.auth().currentUser.displayName,
      photoURL: firebase.auth().currentUser.photoURL,
      message: msg,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    }).then(() => {
      cb();
    })
  }

  getgroupmsgs(groupname) {
    this.firegroup.child(firebase.auth().currentUser.uid).child(groupname).child('msgboard').on('value', (snapshot) => {
      var tempmsgholder = snapshot.val();
      this.groupmsgs = [];
      for (var key in tempmsgholder)
        this.groupmsgs.push(tempmsgholder[key]);
      this.events.publish('newgroupmsg');
    })
  }

   //   var promise = new Promise((resolve, reject) => {
  //     this.camera.getPicture(options).then((fileurl) => {
  //       windows.resolveLocalFilesystemUrl("file//" + fileurl, FE => {
  //         FE.file(files => {
  //           const FR = new FileReader();
  //           FR.onloadend = (res: any) => {
  //             let AF = res.target.result;
  //             let blob = new Blob([new Uint8Array(AF)], { type: 'image/png' })
  //             this.uploaderimage(blob);
  //           }
  //           FR.readAsArrayBuffer(files);
  //         })
  //       })
  //       resolve(true)
  //     }).catch((err) => {
  //       reject(err);
  //     })
  //   })

  //   return promise;

  // }

  // uploaderimage(blob : Blob) {
  //   this.fbref.child('image').put(blob);
  // }


  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }



}

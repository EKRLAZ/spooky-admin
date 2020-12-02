import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Story } from 'src/app/shared/models/story.interface';

import * as S3 from 'aws-sdk/clients/s3'

 


@Injectable({
  providedIn: 'root'
})
export class StoryService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  stories(): Observable<Story[]> {

    return this.http.get<Story[]>(`${this.API_URI}/tales`) as Observable<Story[]>

  }



  uploadFile(file: any, key: any): Observable<any> {
  
  
    const bucket = new S3({
      accessKeyId: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXx',
      secretAccessKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      region: 'us-west-1'
    })

    const params = {
      Bucket: 'creepypastas-x0001',
      Key: key ,
      Body: file,
      ACL: 'public-read',
      ContentType: file.type
    }

    const options = { partSize: 10 * 1024 * 1024, queueSize: 1 }


    return Observable.create(emitter => {

    
    
    
      bucket.upload(
        params,
        options
        
        ).on('httpUploadProgress', function (evt) {
        var percent = Math.round(evt.loaded / evt.total * 100)

        console.log(evt.loaded + " : " + evt.total + " :: " + percent);
        

        emitter.next(percent)

      }).send(function (err, data) {
        if (err) {
          emitter.error(err)
          console.log(err)
        }
       
        console.log(err, data);
        
        
        emitter.next(data)
        emitter.complete()


      })

    })

  }


  saveTale(data: Story) {


    data.create_at = Math.floor(new Date().getTime() / 1000.0)

    return this.http.post(`${this.API_URI}/tales`, data)

  }


}

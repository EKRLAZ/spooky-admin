import { Component, OnInit, OnDestroy } from '@angular/core';
import { Publisher } from 'src/app/shared/models/publisher.interface';
import { FormGroupDirective, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { UtilService } from '../../utils/service/util.service';
import { PublisherService } from '../../services/publisher.service';
import { type } from '../../utils/constants';
import { v4 as uuidv4 } from 'uuid';
import { transition, style, animate, trigger } from '@angular/animations';


const enterTransition = transition(':enter', [
  style({
    opacity: 0
  }),
  animate('0.2s ease-in', style({
    opacity: 1
  }))
]);

const leaveTrans = transition(':leave', [
  style({
    opacity: 1
  }),
  animate('0.2s ease-out', style({
    opacity: 0
  }))
])

const fadeIn = trigger('fadeIn', [
  enterTransition
]);

const fadeOut = trigger('fadeOut', [
  leaveTrans
]);


@Component({
  selector: 'app-new-artist',
  templateUrl: './new-artist.component.html',
  styleUrls: ['./new-artist.component.scss'],
  animations: [
    fadeIn,
    fadeOut
  ]
})
export class NewArtistComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription = new Subscription()


  showAlert = false
  show = false

  imgUrl: String = "./assets/icons/podcasts_place_holder.svg"

  form: FormGroup

  constructor(private formBuilder: FormBuilder, private utilService: UtilService, private publisherService: PublisherService) {

    this.form = this.formBuilder.group({
      id: uuidv4(),
      name: ['', Validators.required],
      description: ['', Validators.required],
      img_url: ['', Validators.required],
      instagram: [''],
      facebook: [''],
      twitter: [''],
      youtube: [''],
      web: [''],
      type: type.MUSIC

    })

  }


  ngOnInit(): void {
  }


  imageChange(event: any) {
    this.imgUrl = event
  }


  extractTwitterUserName(value: String) {

     

    let regex = /(?:https?:\/\/)?(?:www\.)?twitter\.com\/(?:#!\/)?@?([^\/\?\s]*)/

    if (value.match(regex) === null) {
      
      this.form.patchValue({
        twitter: ""
      })
      return
    }
   
    let twitterUserName = value.match(regex)[1]
    this.form.patchValue({
      twitter: twitterUserName
    })

  }


  extractFacebookId(value: String) {

    this.form.patchValue({ facebook: "Generando Id..." })

    this.show = true
    let data = { "facebook_url": value }

    let subscription = this.utilService.requireFacebookId(data).subscribe(response => {

      console.log(response);

      let regex = /(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:#!\/)?@?([^\/\?\s]*)/
      let pageName = value.match(regex)[1]

      this.form.patchValue({
        facebook: pageName + "-" + response.id
      })

      this.show = false

    }, (err: HttpErrorResponse) => {

      this.form.patchValue({
        facebook: err.error.id
      })

      this.show = false
    })

    this.subscriptions.add(subscription)

  }


  extractInsgramUserName(value: String) {

    let regex = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:#!\/)?@?([^\/\?\s]*)/

    if (value.match(regex) === null) {
      
      this.form.patchValue({
        instagram: ""
      })
      return
    }

    let instagramUserName = value.match(regex)[1]

    this.form.patchValue({
      instagram: instagramUserName
    })

  }

  extractYoutubeId(value: String) {

    this.form.patchValue({ youtube: "Generando Id..." })

    let data = { "youtube_url": value }

    let subscription = this.utilService.requireYoutubeId(data).subscribe(response => {
      this.form.patchValue({
        youtube: response.id
      })

    }, (err: HttpErrorResponse) => {

      this.form.patchValue({
        youtube: err.error.id
      })
    })

    this.subscriptions.add(subscription)

  }



  saveArtist(publisher: Publisher, formDirective: FormGroupDirective) {

    if (!this.form.valid) {
      alert('Invalid Data')
      return
    }

    this.show = true

    publisher.create_at = Math.floor(new Date().getTime() / 1000.0)


    var subscription = this.publisherService.create(this.form.value).subscribe(response => {
      console.log(response);

      formDirective.resetForm()
      this.form.reset()

      this.show = false
      this.showAlert = true
      this.imgUrl = "./assets/icons/podcasts_place_holder.svg"

    }, throwed => {

    })

    this.subscriptions.add(subscription)

  }



  closeAlert() {
    this.showAlert = false
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}

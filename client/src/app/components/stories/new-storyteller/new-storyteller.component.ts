import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { UtilService } from '../../utils/service/util.service';
import { Subscription } from 'rxjs';
import { transition, style, animate, trigger } from '@angular/animations';
import { type } from '../../utils/constants';

import { v4 as uuidv4 } from 'uuid';
import { Publisher } from 'src/app/shared/models/publisher.interface';
 

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
  selector: 'app-new-storyteller',
  templateUrl: './new-storyteller.component.html',
  styleUrls: ['./new-storyteller.component.scss'],
  animations: [
    fadeIn,
    fadeOut
  ]
})
export class NewStorytellerComponent implements OnInit {

  private subscriptions: Subscription = new Subscription()


  showAlert = false
  show = false

  imgUrl: String = "./assets/icons/podcasts_place_holder.svg"

  form: FormGroup

  constructor(private formBuilder: FormBuilder, private utilService: UtilService) {

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
      type: type.STORY

    })

  }

  ngOnInit(): void {
  }


  extractTwitterUserName(value: String) {
    let regex = /(?:https?:\/\/)?(?:www\.)?twitter\.com\/(?:#!\/)?@?([^\/\?\s]*)/
    let twitterUserName = value.match(regex)[1]
    this.form.patchValue({
      twitter: twitterUserName
    })

  }



  imageChange(event: any) {
    this.imgUrl = event
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

    let instagramUserName = value.match(regex)[1]

    this.form.patchValue({
      instagram: instagramUserName
    })

  }

  extractYoutubeId(value: String) {

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

  saveStory(form: Publisher, formDirective: FormGroupDirective) {

    form.create_at = Math.floor(new Date().getTime() / 1000.0)
    console.log(form);

  } 

  closeAlert() {
    this.showAlert = false

  }
}

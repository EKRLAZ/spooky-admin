import { Component, OnInit, VERSION, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { Podcasts } from 'src/app/shared/models/podcasts.interface';
import { PodcasterService } from '../services/podcaster.service';
import { HttpErrorResponse } from '@angular/common/http';
import { style, transition, animate, trigger } from '@angular/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { v4 as uuidv4 } from 'uuid';
import { type } from '../../utils/constants';
import { UtilService } from '../../utils/service/util.service';
import { Subscription } from 'rxjs';
 
let icon = require("../../../../assets/icons/podcast.svg")


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
  selector: 'app-new-podcaster',
  templateUrl: './new-podcaster.component.html',
  styleUrls: ['./new-podcaster.component.scss'],
  animations: [
    fadeIn,
    fadeOut
  ]
})
export class NewPodcasterComponent implements OnInit, OnDestroy {


  private subscriptions: Subscription = new Subscription()


  showAlert = false
  show = false

  isChecked = false


  form: FormGroup
  imgUrl: String = "./assets/icons/podcasts_place_holder.svg"

  constructor(private breakpointObserver: BreakpointObserver, private formBuilder: FormBuilder, private podcasterService: PodcasterService,
    private utilService: UtilService) {




    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      img_url: ['', Validators.required],
      instagram: [''],
      facebook: [''],
      twitter: [''],
      youtube: [''],
      web: [''],

      explicit: [false]


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

    var subscription = this.utilService.requireFacebookId(data).subscribe(response => {



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

    var subscription =  this.utilService.requireYoutubeId(data).subscribe(response => {
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





  saveStory(podcasts: Podcasts, formDirective: FormGroupDirective) {

    if (!this.form.valid) {
      alert('Invalid Data')
      return
    }

    this.show = true

    podcasts.id = uuidv4()
    podcasts.explicit = this.isChecked
    podcasts.create_at = Math.floor(new Date().getTime() / 1000.0)
    podcasts.type = type.PODCASTS


    console.log(this.form.value);


    var subscription = this.podcasterService.createPodcaster(this.form.value).subscribe(success => {
      console.log(success);

      formDirective.resetForm()
      this.form.reset()

      this.show = false
      this.showAlert = true
      this.imgUrl = "./assets/icons/podcasts_place_holder.svg"

    }, failure => {
      alert("Ups !! algo salio mal")
    })

    this.subscriptions.add(subscription)

  }


  closeAlert() {
    this.showAlert = false

  }

  onValChange(value: any) {

    if (value == "explicit") {
      this.isChecked = true
    } else {
      this.isChecked = false
    }
    console.log(this.isChecked);

  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

}

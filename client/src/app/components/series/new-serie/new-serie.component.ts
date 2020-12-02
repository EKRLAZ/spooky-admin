import { Component, OnInit } from '@angular/core';
import { transition, style, animate, trigger } from '@angular/animations';
import { FormGroup, FormGroupDirective, FormBuilder, Validators } from '@angular/forms';
import { Serie } from 'src/app/shared/models/serie.interface';
import { Publisher } from 'src/app/shared/models/publisher.interface';
import { PublisherService } from '../../services/publisher.service';
import { SeriesService } from '../../services/series.service';
import { type } from '../../utils/constants';

import { v4 as uuidv4 } from 'uuid';

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
  selector: 'app-new-serie',
  templateUrl: './new-serie.component.html',
  styleUrls: ['./new-serie.component.scss'],
  animations: [
    fadeIn,
    fadeOut
  ]
})
export class NewSerieComponent implements OnInit {

  showAlert = false
  show = false

  isChecked = false


  form: FormGroup
  imgUrl: String = "./assets/icons/podcasts_place_holder.svg"

  publishers: Publisher[]

  constructor(private formBuilder: FormBuilder, private publisherService: PublisherService, private seriesService: SeriesService) {

    this.form = this.formBuilder.group({
      id: [uuidv4()],
      name: ['', Validators.required],
      description: ['', Validators.required],
      img_url: ['', Validators.required],
      publisher_id: ['', Validators.required],
      publisher: ['', Validators.required],
      explicit: [this.isChecked],
      external_story_link: ['']

    })

  }

  ngOnInit(): void {

    this.publisherService.get().subscribe(response => {


      this.publishers = response // .filter(res => { return res.type == 2})

    }, err => {

    })
  }

  imageChange(event: any) {
    this.imgUrl = event
  }


  selectChange(value: String) {
    
    let v = this.publishers.find( it =>  it.name == value ) 
    console.log(v.id + " -- "+ v.name);
    this.form.patchValue({
      publisher_id: v.id
    })

  }

  saveStory(form: Serie, formDirective: FormGroupDirective) {

    this.show = true

    form.explicit = this.isChecked
    form.type = type.SERIE
    form.create_at = Math.floor(new Date().getTime() / 1000.0)

    if (this.form.invalid) {
      alert("Opps!! Algunos Campos son requeridos")
      return
    }

  
    this.seriesService.create(form)
      .subscribe(res => {

        console.log(res);
        this.show = false
        this.showAlert = true

      }, failure => {
        console.log(failure);

      })

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

  }

}

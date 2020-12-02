import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoryService } from '../services/story.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { Story } from 'src/app/shared/models/story.interface';

import { Publisher } from 'src/app/shared/models/publisher.interface';

import { type } from '../../utils/constants';
import { PublisherService } from '../../services/publisher.service';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../services/categories.service';
import { SeriesService } from '../../services/series.service';
import { PodcasterService } from '../../podcasts/services/podcaster.service';

import { v4 as uuidv4 } from 'uuid';
import { transition, style, animate, trigger } from '@angular/animations';
import { AlbumService } from '../../services/album.service';



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
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  animations: [
    fadeIn,
    fadeOut
  ]
})
export class UploadComponent implements OnInit, OnDestroy {


  private subscribers = new Subscription()

  progressbarValue: Number = 0



  form: FormGroup

  file: any

  isChecked = false
  isHidden = true


  showAlert = false
  show = false


  imgUrl: String = './assets/icons/podcasts_fill_one.svg'


  subjects: any = []

  publishers: Publisher[] = []


  mediaTypes: any = [{

    "value": 1,
    "name": "Story"
  }, {
    "value": 2,
    "name": "Serie"
  }, {
    "value": 3,
    "name": "Podcasts"
  }, {
    "value": 4,
    "name": "Music"
  }

  ]


  constructor(
    private storyService: StoryService,
    private formBuilder: FormBuilder,
    private publisherService: PublisherService,
    private categoryService: CategoriesService,
    private podcastService: PodcasterService,
    private seriesService: SeriesService,
    private albumService: AlbumService
  ) {

    this.form = this.formBuilder.group({

      id: [''],
      type: [type.STORY, Validators.required],
      title: ['', Validators.required],

      art_url: ['', Validators.required],
      duration: ['', Validators.required],
      explicit: [false],

      description: ['', Validators.required],

      publisher: ['', Validators.required],
      publisher_id: [''],

      subject_to: ['', Validators.required],
      subject_to_id: [''],

      source: ['']


    })
    this.form.controls["publisher"].disable()
    this.form.controls["subject_to"].disable()

  }


  ngOnInit(): void {

  }



  fileChange(event: any) {


    let id = uuidv4()

    this.form.patchValue({ id: id })


    this.file = event[0]

    let title = event[0].name

    title = title.substring(0, title.lastIndexOf("."))


    new Audio(URL.createObjectURL(this.file)).onloadedmetadata = (e: any) => {
      this.isHidden = false
      this.form.patchValue({
        title: title,
        duration: this.forHumans(e.currentTarget.duration)
      })
    }




  }


  openInput() {
    document.getElementById("fileInput").click();
  }

  typeChange(value: number) {


    if (value == 3) {
      this.loadOptions(5)
    } else if (value == 2) {
      this.loadOptions(1)
    } else {
      this.loadOptions(value)
    }

    this.loadSubjectsTo(value)

  }


  loadOptions(type: number) {

    var subscription = this.publisherService.get().subscribe(response => {

      this.publishers = response.filter(it => { return it.type == type })
      this.form.controls["publisher"].enable()
      this.form.controls["subject_to"].enable()
    }, throwed => {

    })

    this.subscribers.add(subscription)

  }


  loadSubjectsTo(type: any) {

    if (type == 2) {
      this.loadSeries()
    } else if (type == 3) {
      this.loadPoscast()
    } else if (type == 4) {
      this.loadAlbums()
    }else {
      this.loadCaegories(type)
    }

  }


  loadPoscast() {

    var subscribe = this.podcastService.podcasters().subscribe(result => {

      this.subjects = result

    }, throwed => {

    })

    this.subscribers.add(subscribe)

  }


  loadSeries() {
    var subscribe = this.seriesService.get().subscribe(result => { this.subjects = result }, throwed => { })
    this.subscribers.add(subscribe)
  }

  loadCaegories(type: number) {

    var subscription_ = this.categoryService.get().subscribe(response => {
      this.subjects = response.filter(it => { return it.type == type })
    }, throwed => {

    })
    this.subscribers.add(subscription_)
  }


  loadAlbums() {

    var subscription_ = this.albumService.get().subscribe(response => {
      this.subjects = response // .filter(it => { return it.type == 4 })
    }, throwed => {

    })
    this.subscribers.add(subscription_)
  }


  publisherChange(name: any) {

    let publishers = this.publishers.find(obj => { return obj.name == name })
    this.form.patchValue({ publisher_id: publishers.id })

  }



  catChange(value: any) {

    let subject_to = this.subjects.find(obj => { return obj.name == value })
    this.form.patchValue({ subject_to_id: subject_to.id })

  }






  imgageChange(event: any) {
    this.imgUrl = event
  }

  saveTale(obj: Story, formDirective: FormGroupDirective) {

  

    if (!this.form.valid) {
      return

    }
    this.show = true
    this.form.patchValue({ explicit: this.isChecked })
    let key = this.buildKey(obj)

    console.log(this.form.value);

    let subscription = this.storyService.uploadFile(this.file, key).subscribe(data => {



      if (typeof data == 'number') {

        this.progressbarValue = data

      } else {


        let source = data.Location.replace(/%20/g, '+')

        this.form.patchValue({ source: source })

        this.storyService.saveTale(this.form.value).subscribe(res => {
          console.log(res);


          formDirective.resetForm()
          this.form.reset()

          this.show = false
          this.showAlert = true
          this.imgUrl = "./assets/icons/podcasts_fill_one.svg"


          
          this.isHidden = true



        }, throwed => {

        })

      }


    }, throwed => {
      console.log(throwed);
      
    })

    this.subscribers.add(subscription)


  }


  buildKey(data: any) {
    let ext = this.file.name.split('.').pop()
    return data.publisher + "/" + data.subject_to + "/" + data.id + "." + ext;
  }

  forHumans(t) {

    var date = new Date(0)
    date.setSeconds(t)
    return date.toISOString().substr(11, 8)

  }


  onValChange(value: any) {
    if (value == "explicit") {
      this.isChecked = true
    } else {
      this.isChecked = false
    }
  }

  closeAlert() {
    this.showAlert = false

  }
  ngOnDestroy(): void {
    this.subscribers.unsubscribe()
  }
}

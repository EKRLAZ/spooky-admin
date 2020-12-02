import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { type } from '../../utils/constants';
import { Album } from 'src/app/shared/models/album.interface';
import { PublisherService } from '../../services/publisher.service';
import { Publisher } from 'src/app/shared/models/publisher.interface';
import { Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { AlbumService } from '../../services/album.service';
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
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.scss'],
  animations: [
    fadeIn,
    fadeOut
  ]
})
export class CreateAlbumComponent implements OnInit {

  imgUrl: String = './assets/icons/podcasts_fill_one.svg'

  private subscribers = new Subscription()

  form: FormGroup

  artists: Publisher[] = []

  showAlert = false
  show = false


  constructor(
    private formBuilder: FormBuilder,
    private publisherService: PublisherService,
    private albumService: AlbumService
    ) { 

    this.form = this.formBuilder.group({

      id: [''],
      name: ['', Validators.required],
      img_url: ['', Validators.required],
      publisher: ['', Validators.required],
      publisher_id: [''],
      external_url: ['', Validators.required],
      copyright: ['', Validators.required],
      create_at: [''],
      type: [type.MUSIC, Validators.required]

    })

  }

  ngOnInit(): void {


    var subscription = this.publisherService.get().subscribe(response => {

      this.artists = response.filter(it => { return it.type == type.MUSIC })
       
      
    }, throwed => {

    })

    this.subscribers.add(subscription)

  }



  artistChange(name: string) {
  
    
    let artist = this.artists.find(obj => { return obj.name == name })
    this.form.patchValue({ publisher_id: artist.id })
  }


  imgageChange(value: String) {
    console.log(value);
    this.imgUrl = value

  }



  closeAlert() {
    this.showAlert = false

  }


  createAlbum(obj: Album, formDirective: FormGroupDirective) {

    obj.id = uuidv4()
    obj.create_at = Math.floor(new Date().getTime() / 1000.0)

   
    
    if (!this.form.valid) {
      return
    }

    this.show = true

    this.albumService.create(obj).subscribe( response => {
      console.log(response);

        formDirective.resetForm()
        this.form.reset()
        
        this.show = false
        this.showAlert = true
        this.imgUrl = "./assets/icons/podcasts_fill_one.svg"

    }, throwable =>{

    })
 
 
    
    
  }
}

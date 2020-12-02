import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoryService } from '../../stories/services/story.service';
import { Story } from 'src/app/shared/models/story.interface';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  
  public stories: Story[]

  private susbcriptions: Subscription = new Subscription()

  constructor(private storyService: StoryService) { }

  

  ngOnInit(): void {

      var disposable  = this.storyService.stories()
      .subscribe( (response: Story[]) => {
        this.stories = response
        console.log(this.stories);
        
      }, err => {

      })

      this.susbcriptions.add(disposable)

  }




  ngOnDestroy(): void {
     console.log("Destroy Component");
     this.susbcriptions.unsubscribe()
     
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadComponent } from './components/stories/upload/upload.component';
import { StoriesModule } from './components/stories/stories/stories.module';
import { StoryComponent } from './components/stories/story/story.component';

import { StoryService } from './components/stories/services/story.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module'


import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PodcastComponent } from './components/podcasts/podcast/podcast.component';
import { NewPodcasterComponent } from './components/podcasts/new-podcaster/new-podcaster.component';
import { PodcastsComponent } from './components/podcasts/podcasts/podcasts.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from "@angular/flex-layout";
import { EditSeriatorComponent } from './components/series/edit-seriator/edit-seriator.component';
import { NewArtistComponent } from './components/song/new-artist/new-artist.component';
import { NewStorytellerComponent } from './components/stories/new-storyteller/new-storyteller.component';
import { NewSerieComponent } from './components/series/new-serie/new-serie.component';
import { CreateAlbumComponent } from './components/song/create-album/create-album.component';


@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    StoryComponent,
    SidenavComponent,
    PodcastComponent,
    NewPodcasterComponent,
    PodcastsComponent,
    EditSeriatorComponent,
    NewArtistComponent,
    
    NewStorytellerComponent,
    NewSerieComponent,
    CreateAlbumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoriesModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    FlexLayoutModule
  ],
  providers: [
    StoryService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

   
}

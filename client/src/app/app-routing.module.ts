import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoriesComponent } from './components/stories/stories/stories.component';
import { UploadComponent } from './components/stories/upload/upload.component';
import { StoryComponent } from './components/stories/story/story.component';
import { NewPodcasterComponent } from './components/podcasts/new-podcaster/new-podcaster.component';
import { NewStorytellerComponent } from './components/stories/new-storyteller/new-storyteller.component';
import { NewSerieComponent } from './components/series/new-serie/new-serie.component';
import { NewArtistComponent } from './components/song/new-artist/new-artist.component';
import { CreateAlbumComponent } from './components/song/create-album/create-album.component';



const routes: Routes = [

  {
    path: '', 
    redirectTo: '/home', 
    pathMatch:'full'
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./components/pages/home/home.module').then(m => m.HomeModule)

  },
  {
    path: 'story/:id', component: StoryComponent

  },
  {
    path: 'upload', component: UploadComponent

  },
  {
    path: 'new-podcaster', component: NewPodcasterComponent

  },
  {
    path: 'new-narrator', component: NewStorytellerComponent

  },
  {
    path: 'new-serie', component: NewSerieComponent

  }
  ,
  {
    path: 'new-artist', component: NewArtistComponent

    
  },
  {
    path: 'create-album', component: CreateAlbumComponent
  }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatButtonToggleModule } from '@angular/material/button-toggle'

import { DomSanitizer } from '@angular/platform-browser';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faFacebook, faFacebookF} from '@fortawesome/free-brands-svg-icons';
import { from } from 'rxjs';




const matComponents = [
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatProgressBarModule,
  MatSlideToggleModule,
  MatExpansionModule,
  MatButtonToggleModule  
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    matComponents
  ],
  exports: [matComponents]
})
export class MaterialModule {


  iconList = [
    'home', 
    'home_active', 
    'my_library', 
    'my_library_active', 
    'upl', 
    'upload', 
    "podcasts_good", 
    "contactless",
    "facebook_brand",
    "twitter_brand",
    "instagram_brand",
    "youtube_brand",
    "web_brand",
    "microphone",
    "record_voice_over",
    "publish_white",
    "sort_white",
    "search_white"
  ]


  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {

    const svg = icon(faFacebookF).html.join('')

    iconRegistry.addSvgIconLiteral(
      'facebook-f',
      sanitizer.bypassSecurityTrustHtml(svg)
    )

    this.iconList.forEach((iconName) => {

      iconRegistry.addSvgIcon(
        iconName,
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/' + iconName + '.svg'))
    })

  }

}

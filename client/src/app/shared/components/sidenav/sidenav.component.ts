import { Component, OnInit } from '@angular/core';
import { NavItem } from './nav-item';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  opened = true;
  over = 'side';

  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;



  menu: NavItem[] = [
    {
      displayName: 'Home',
      iconName: 'home_active',
      route: '/',
    },
    {
      displayName: 'Biblioteca',
      iconName: 'my_library',
      route: 'upload/',
    },
    {
      displayName: 'Podcasts',
      iconName: 'podcasts_good',
      children: [

        {
          displayName: 'New Podcaster',
          iconName: 'record_voice_over',
          route: '/new-podcaster'
        },
        {
          displayName: 'Upload Ep.',
          iconName: 'publish_white',
          route: '/new-podcaster'
        },
        {
          displayName: 'Podcasts',
          iconName: 'sort_white',
          route: '/todos'
        }
      ]
    },
    {
      displayName: 'Tales',
      iconName: 'podcasts_good',
      children: [
        {
          displayName: 'New Narrator',
          iconName: 'microphone',
          route: '/new-narrator'
        }
      ]
    },
    {
      displayName: 'Series',
      iconName: 'podcasts_good',
      children: [
        {
          displayName: 'Búsqueda Perfil',
          iconName: 'microphone',
          route: '/new-serie'
        }
      ]
    },
    {
      displayName: 'Music',
      iconName: 'podcasts_good',
      children: [
        {
          displayName: 'New Artist',
          iconName: 'search_white',
          route: '/new-artist'
        },
        {
          displayName: 'New Album',
          iconName: 'search_white',
          route: '/create-album'
        }
      ]
    }
  ];


  constructor(private breakpointObserver: BreakpointObserver,) {

    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {

      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.opened = false
          this.over = 'over';
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.opened = false
          this.over = 'over';
           
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.opened = true;
          this.over = 'side';
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.opened = true;
          this.over = 'side';
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
           
          this.opened = true;
        this.over = 'side';
        }
      }
    });
  }

  ngOnInit(): void {
  }

}

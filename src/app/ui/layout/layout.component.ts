import { Component, inject, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { SidebarComponent } from '../sidebar/sidebar.component'
import { GetProfileService } from '../../services/get-profile.service'

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  profileService = inject(GetProfileService)

  ngOnInit() {
    this.profileService.getMe().subscribe(profile => {
      console.log(profile)
    })
  }
}

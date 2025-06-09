import { Component, inject } from '@angular/core'
import { ProfileCardComponent } from './ui/profile-card/profile-card.component'
import { GetProfileService } from './services/get-profile.service'
import { IProfile } from './intefaces/profile.inteface'

@Component({
  selector: 'app-root',
  imports: [ProfileCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private profileService = inject(GetProfileService)
  public profiles: IProfile[] = []

  constructor() {
    this.profileService.getTestAccounts().subscribe(val => {
      this.profiles = val
    })
  }
}

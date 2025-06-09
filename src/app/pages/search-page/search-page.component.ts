import { Component, inject } from '@angular/core'
import { ProfileCardComponent } from '../../ui/profile-card/profile-card.component'
import { GetProfileService } from '../../services/get-profile.service'
import { IProfile } from '../../intefaces/profile.inteface'

@Component({
  selector: 'app-search-page',
  imports: [ProfileCardComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  private profileService = inject(GetProfileService)
  public profiles: IProfile[] = []

  constructor() {
    this.profileService.getTestAccounts().subscribe(val => {
      this.profiles = val
    })
  }
}

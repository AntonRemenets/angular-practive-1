import { Component, input } from '@angular/core'
import { IProfile } from '../../intefaces/profile.inteface'
import { ImgUrlPipe } from '../../pipes/img-url.pipe'

@Component({
  selector: 'app-profile-card',
  imports: [ImgUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  public profile = input.required<IProfile>()
}

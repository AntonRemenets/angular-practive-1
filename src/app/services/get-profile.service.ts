import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { IProfile } from '../intefaces/profile.inteface'

@Injectable({
  providedIn: 'root',
})
export class GetProfileService {
  private http = inject(HttpClient)
  private apiUrl = 'https://icherniakov.ru/yt-course/'

  getTestAccounts() {
    return this.http.get<IProfile[]>(`${this.apiUrl}account/test_accounts`)
  }

  getMe() {
    return this.http.get<IProfile>(`${this.apiUrl}account/me`)
  }
}

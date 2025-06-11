import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, tap, throwError } from 'rxjs'
import { ITokenResponse } from './auth.interface'
import { CookieService } from 'ngx-cookie-service'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient)
  router = inject(Router)
  apiUrl = 'https://icherniakov.ru/yt-course/auth/'
  cookieService = inject(CookieService)
  accessToken: string | null = null
  refreshToken: string | null = null

  get isAuth() {
    if (!this.accessToken) {
      this.accessToken = this.cookieService.get('accessToken')
    }
    return !!this.accessToken
  }

  public login(data: { username: string; password: string }) {
    const formData = new FormData()

    formData.append('username', data.username)
    formData.append('password', data.password)
    return this.http
      .post<ITokenResponse>(`${this.apiUrl}token`, formData)
      .pipe(tap(val => this.saveTokens(val)))
  }

  public refreshAuthToken() {
    return this.http
      .post<ITokenResponse>(`${this.apiUrl}token`, {
        refresh_token: this.refreshToken,
      })
      .pipe(
        tap(val => this.saveTokens(val)),
        catchError(e => {
          this.logout()
          return throwError(e)
        }),
      )
  }

  public logout() {
    this.cookieService.deleteAll()
    this.accessToken = null
    this.refreshToken = null
    this.router.navigate(['/login'])
  }

  private saveTokens(res: ITokenResponse) {
    this.accessToken = res.access_token
    this.refreshToken = res.refresh_token

    this.cookieService.set('accessToken', this.accessToken)
    this.cookieService.set('refreshToken', this.refreshToken)
  }
}

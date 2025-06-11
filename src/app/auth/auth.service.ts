import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient)
  apiUrl = 'https://icherniakov.ru/yt-course/auth/'

  public login(data: { username: string; password: string }) {
    const formData = new FormData()

    formData.append('username', data.username)
    formData.append('password', data.password)
    console.log(formData)
    return this.http.post(`${this.apiUrl}token`, formData)
  }
}

/*
* access_token
:
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiYXJlbWVuZXRzIiwiZXhwIjoxNzQ5NjMxMjQ2fQ.3zvOmxe8mXJQ50B9l0w-Z2KlVPQ1C0hWHt1pFlCYsTg"
refresh_token
:
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoicmVmcmVzaCIsInN1YiI6ImFyZW1lbmV0cyIsImV4cCI6MTc1MjIyMjk0Nn0.jDnmFuKv08Am5_A3LZfij0xCIChZB7Ch0IrAWwc2hYY"
token_type
:
"bearer"
*
*
* */

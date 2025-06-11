import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http'
import { AuthService } from './auth.service'
import { inject } from '@angular/core'
import { catchError, switchMap, throwError } from 'rxjs'

let isRefreshing = false

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const accessToken = authService.accessToken

  if (!accessToken) return next(req)

  if (isRefreshing) {
    return refreshAndProceed(authService, req, next)
  }

  return next(addToken(req, accessToken)).pipe(
    catchError(e => {
      if (e.status === 403) {
        return refreshAndProceed(authService, req, next)
      }
      return throwError(e)
    }),
  )
}

const refreshAndProceed = (
  authService: AuthService,
  req: HttpRequest<any>,
  next: HttpHandlerFn,
) => {
  if (!isRefreshing) {
    isRefreshing = true

    return authService.refreshAuthToken().pipe(
      switchMap(res => {
        isRefreshing = false

        return next(addToken(req, res.access_token))
      }),
    )
  }

  return next(addToken(req, authService.accessToken!))
}

const addToken = (req: HttpRequest<any>, accessToken: string) => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

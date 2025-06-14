import { Component, inject } from '@angular/core'
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { AuthService } from '../../auth/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  authService = inject(AuthService)
  router = inject(Router)
  form = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  })

  onSubmit() {
    if (this.form.valid) {
      // Глушим ошибку - так делать не надо
      // @ts-ignore
      this.authService.login(this.form.value).subscribe(val => {
        this.router.navigate([''])
      })
    }
  }
}

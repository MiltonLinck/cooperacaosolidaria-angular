import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .subscribe(
        data => {
          console.log(data);
          localStorage.setItem('token', '' + data.data.token);
          localStorage.setItem("nome", data.data.usuarioLogado.nome)
          this.router.navigate(["/dashboard"]);
        },
        error => {
          console.log("erro", error)
          this.error = error;
          this.loading = false;
        });
  }

  irCampanha() {
    this.router.navigate(["/cadastro-campanha"]);
  }
  irVoluntario() {
    this.router.navigate(["/cadastro-voluntario"]);
  }
  irInstituicao() {
    this.router.navigate(["/cadastro-instituicao"]);
  }
  irInstituicaoContinua(){
    this.router.navigate(["/cadastro-instituicao-completar"]);
  }
  irVoluntarioContinua(){
    this.router.navigate(["/cadastro-voluntario-completar"]);
  }
}
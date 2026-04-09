import { Component } from "@angular/core";
import {
  NbAuthJWTToken,
  NbAuthResult,
  NbLoginComponent,
} from "@nebular/auth";

@Component({
  selector: "ngx-login",
  styleUrls: ["./login.component.scss"],
  templateUrl: "./login.component.html",
})
export class LoginComponent extends NbLoginComponent {
  ngOnInit() {
    this.service.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.router.navigate(["pages/dashboard"]);
      }
    });

    
  }

  ngViewInit() {
    this.user.username = '';
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    const data = {
      username: this.user.username,
      password: this.user.password,
    };
    this.service
      .authenticate(this.strategy, data)
      .subscribe((result: NbAuthResult) => {
        this.submitted = false;

        if (result.isSuccess()) {
          this.messages = result.getMessages();
          localStorage.setItem('token', result.getToken().getPayload().data);
          localStorage.setItem('access-token', result.getToken().getValue());
          this.router.navigate(['/pages/dashboard']);
        } else {
          this.errors = result.getErrors();
        }

        // const redirect = result.getRedirect();
        // console.log(redirect);
        // if (redirect) {
        //   setTimeout(() => {
        //     return this.router.navigateByUrl(redirect);
        //   }, this.redirectDelay);
        // }
        //this.cd.detectChanges();
      });
  }
}

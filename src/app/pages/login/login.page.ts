import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router:Router, private authService: AuthService) { }

  ngOnInit() {
  }
  //Login con firebase
  public async login(email, password){
    await this.authService.login(email, password).then(() => {
      this.router.navigate(['private/tabs/tab1']);
    }).catch(function(error) {
      error.code;
    });
  }
  //Method to navigate to the tabs page
  goToTabsPage(){
    this.router.navigate(['private/tabs/tab1']);
  }
  
}

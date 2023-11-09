import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';
@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
 user!:User;
  constructor(private userService:UserService) {
    userService.userObservable.subscribe((newUser) => {
    this.user = newUser;
  })}

  ngOnInit(): void {
  }
  logout(){
    this.userService.logout();
  }
  get isAuth(){
    return this.user.token;
  }
  get isAdmin(){
    return this.user.isAdmin;
  }
}

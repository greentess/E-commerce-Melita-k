import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }
  get isAdmin(){
    return this.userService.getUserFromLocalStorage().isAdmin;
  }

}

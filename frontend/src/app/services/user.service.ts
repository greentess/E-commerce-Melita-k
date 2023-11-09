import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { User } from '../shared/models/User';
import { IUserRegister } from '../shared/interfaces/IUserRegister';


const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject =
  new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;
  constructor(private http:HttpClient, private toastrService:ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser():User{
    return this.userSubject.value;
  }

  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) =>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          if (!user.isAdmin)
          this.toastrService.success(
            `Добро пожаловать на сайт компании Melita-K, ${user.name}!`,
            'Вы успешно вошли в аккаунт!'
          )
          else
          this.toastrService.success(
           `Добро пожаловать, администратор ${user.name}!`,
           'Вы успешно вошли в аккаунт!'
         )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Не получилось войти в аккаунт :(');
        }
      })
    );
  }


  register(userRegiser:IUserRegister): Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL, userRegiser).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Добро пожаловать на сайт компании Melita-K, ${user.name}`,
            'Регистрация прошла успешно!'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error,
            'Ошибка с регистрацией')
        }
      })
    )
  }



  logout(){
    if (this.getUserFromLocalStorage().isAdmin){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.href = '/home';
    this.toastrService.success(
     `Вы успешно вышли из аккаунта!`
   )
  }
  else{
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
    this.toastrService.success(
     `Вы успешно вышли из аккаунта!`
   )
  }
  }

  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}

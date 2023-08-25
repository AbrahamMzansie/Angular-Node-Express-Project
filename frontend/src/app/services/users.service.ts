import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/user';
import { IUserLogin } from '../shared/interface/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USERS_LOGIN_URL, USERS_REGISTER_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interface/IUserRegister';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );
  public userObservable: Observable<User>;

  constructor(private http: HttpClient, private toastService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }
 public get  currentUser():User{
 return this.userSubject.value;
  }
  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USERS_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user: User) => {         
          this.setUserLocalStorage(user);
          this.userSubject.next(user);
          this.toastService.success(
            `Welcome To Food Website ${user.name}`,
            'Login Succesful'
          );
        },
        error: (errorResponse: any) => {
          this.toastService.error(errorResponse.error, 'Login Failed');
        },
      })
    );
  }

  register(registerUser:IUserRegister):Observable<User>{
    return this.http.post<User>(USERS_REGISTER_URL, registerUser).pipe(
      tap({
        next: (user:User) => {         
          this.setUserLocalStorage(user);
          this.userSubject.next(user);
          this.toastService.success(
            `Registration was successful`,
            'Register Succesful'
          );
        },
        error: (errorResponse: any) => {
          this.toastService.error(errorResponse.error, 'Registration Failed');
        },
      })
    );
  }

  private setUserLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const userData = localStorage.getItem(USER_KEY);
    if (userData) {
      return JSON.parse(userData) as User;
    } else {
      return new User();
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { SERVER_API_URL } from 'src/app/app.constants';
import { User } from 'src/app/core/models/user';
import { LoginCredentials } from 'src/app/core/models/loginCredentials';

@Injectable({ providedIn: 'root' })
export class AuthJWTService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private $localStorage: LocalStorageService,
    private $sessionStorage: SessionStorageService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getToken() {
    return (
      this.$localStorage.retrieve('authenticationToken') ||
      this.$sessionStorage.retrieve('authenticationToken')
    );
  }

  //   login(credentials): Observable<any> {
  //     const data = {
  //         username: credentials.username,
  //         password: credentials.password,
  //         rememberMe: credentials.rememberMe
  //     };
  //     return this.http.post(SERVER_API_URL + 'api/authenticate', data, { observe: 'response' })
  // .pipe(map(authenticateSuccess.bind(this)));

  //     function authenticateSuccess(resp) {
  //         const bearerToken = resp.headers.get('Authorization');
  //         if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
  //             const jwt = bearerToken.slice(7, bearerToken.length);
  //             this.storeAuthenticationToken(jwt, credentials.rememberMe);
  //             return jwt;
  //         }
  //     }
  // }

  login(loginCredentials: LoginCredentials) {
    console.log('AuthJwt login');
    return this.http
      .post<any>(SERVER_API_URL + 'api/authenticate', loginCredentials)
      .pipe(
        map(user => {
          console.log('got answer in authjwt service login');
          console.table(user);
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }

  loginWithToken(jwt, rememberMe) {
    if (jwt) {
      this.storeAuthenticationToken(jwt, rememberMe);
      return Promise.resolve(jwt);
    } else {
      return Promise.reject('auth-jwt-service Promise reject'); // Put appropriate error message here
    }
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  storeAuthenticationToken(jwt, rememberMe) {
    if (rememberMe) {
      this.$localStorage.store('authenticationToken', jwt);
    } else {
      this.$sessionStorage.store('authenticationToken', jwt);
    }
  }

  logout(): Observable<any> {
    return new Observable(observer => {
      this.$localStorage.clear('authenticationToken');
      this.$sessionStorage.clear('authenticationToken');
      observer.complete();
    });
  }
}

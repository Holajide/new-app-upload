import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { AuthConstants } from '../config/auth.constant';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;

  userData$ = new BehaviorSubject<any> ('');
  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router,
  ) { }

  getUserData() {
    this.storageService.get(AuthConstants.AUTH).then( res => {
      this.userData$.next(res);
    });
  }

  login(postData: any): Observable<any> {
    return this.httpService.post('login', postData);
  }

  signup(postData: any): Observable<any> {
    return this.httpService.post('signup', postData);
  }

logout() {
  // this.storageService.clear();
  this.storageService.removeItem(AuthConstants.AUTH).then((res: any) => {
    this.userData$.next(res);
    this.router.navigate(['']);
  });
  }

}

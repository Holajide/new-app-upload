import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { resolve } from 'url';
import { AuthConstants } from '../config/auth.constant';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  constructor(private storageService: StorageService, private router: Router) {}

  Promise() {
    return new Promise(resolve => {
      this.storageService
        .get(AuthConstants.AUTH)
        .then( res => {
          if (res) {
            resolve(true);
          } else {
            this.router.navigate(['']);
            resolve(false);
          }
        })
        .catch(err => {
          resolve(false);
        });
    });
  }

}

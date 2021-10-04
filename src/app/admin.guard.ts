import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {
  // canLoad(
  //   route: Route,
  //   segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  constructor(private router: Router) {}

  canLoad(route: Route): true|UrlTree {
    const url = `/${route.path}`;
    return this.checkRole(url);
  }

  checkRole(url:string): true|UrlTree {
    if (localStorage.getItem('role') === '1') {
      return true;
    }
    return this.router.parseUrl('/unauthorized');
  }

}

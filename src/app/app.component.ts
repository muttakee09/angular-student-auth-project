import { Component } from '@angular/core';
import { delay } from 'rxjs/operators';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-student-auth-project';
  // loading: boolean = false;

  constructor(public loaderService: LoaderService) {}

  // listenToLoading(): void {
  //   this.loaderService.isLoading
  //     .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
  //     .subscribe((loading) => {
  //       this.loading = loading;
  //     });
  // }
}

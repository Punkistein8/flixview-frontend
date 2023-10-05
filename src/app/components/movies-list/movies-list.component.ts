import {
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
} from '@angular/core';
import { MoviesServiceService } from '../../services/movies-list-service/movies-service.service';
import { UsersLoginService } from 'src/app/services/users-login/users-login.service';
import { CartoonMoviesComponent } from './cartoon-component/cartoon-movies/cartoon-movies.component';
import { FamilyMoviesComponent } from './family-component/family-movies/family-movies.component';
import { HorrorMoviesComponent } from './horror-component/horror-movies/horror-movies.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})
export class MoviesListComponent {
  moviesList: any[] = [];
  authenticatedUser: any = {};
  toastr: any;

  constructor(
    private moviesService: MoviesServiceService,
    private authService: UsersLoginService,
    private router: Router,
    private resolver: ComponentFactoryResolver
  ) {
    this.authService.isAuthenticated();
    this.authenticatedUser = this.authService.getAuthenticatedUser();
  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      // redirect to login view
      this.router.navigate(['/users-login']);
      this.toastr.error('You must login first!', 'Error');
    } else {
      this.authenticatedUser = this.authService.getAuthenticatedUser();
      this.moviesService.getMovies('family').subscribe((data) => {
        this.moviesList = data;
      });
    }
  }

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef })
  dynamicComponentContainer: ViewContainerRef | undefined;

  actualListing = 'Family';

  getMovies(genre: string) {
    this.moviesService.getMovies(genre).subscribe((data) => {
      this.moviesList = data;
    });
  }

  setUpdatedAuthenticatedUser(): any {
    this.authService.setUpdatedAuthenticatedUser();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/users-login']);
    this.toastr.success('User logged out successfully!', 'Success');
  }

  loadComponent(component: string) {
    this.dynamicComponentContainer?.clear();
    switch (component) {
      case 'Family':
        this.actualListing = 'Family';
        this.getMovies('family');
        this.dynamicComponentContainer?.createComponent(
          this.resolver.resolveComponentFactory(FamilyMoviesComponent)
        );
        break;
      case 'Horror':
        this.actualListing = 'Horror';
        this.getMovies('horror');
        this.dynamicComponentContainer?.createComponent(
          this.resolver.resolveComponentFactory(HorrorMoviesComponent)
        );
        break;
      case 'Cartoon':
        this.actualListing = 'Cartoon';
        this.getMovies('cartoon');
        this.dynamicComponentContainer?.createComponent(
          this.resolver.resolveComponentFactory(CartoonMoviesComponent)
        );
        break;
      default:
    }
  }
}

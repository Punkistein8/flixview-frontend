import { Component } from '@angular/core';
import { MoviesServiceService } from '../../services/movies-list-service/movies-service.service';
import { UsersLoginService } from 'src/app/services/users-login/users-login.service';
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
    private router: Router
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
      this.moviesService.getMovies().subscribe((data) => {
        this.moviesList = data;
        console.log(this.moviesList);
      });
    }
  }
}

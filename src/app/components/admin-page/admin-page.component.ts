import {
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersLoginService } from 'src/app/services/users-login/users-login.service';
import { RoleComponentComponent } from './role-component/role-component/role-component.component';
import { PlanComponentComponent } from './plan-component/plan-component/plan-component.component';
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent {
  authenticatedUser: any = {};

  constructor(
    private authService: UsersLoginService,
    private router: Router,
    private toastr: ToastrService,
    private resolver: ComponentFactoryResolver
  ) {
    this.authenticatedUser = this.authService.getAuthenticatedUser();
  }

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef })
  dynamicComponentContainer: ViewContainerRef | undefined;

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      // redirect to login view
      this.router.navigate(['/users-login']);
      this.toastr.error('You must login first!', 'Error');
    } else {
      this.authenticatedUser = this.authService.getAuthenticatedUser();
    }
  }

  loadComponent(component: string) {
    this.dynamicComponentContainer?.clear();

    switch (component) {
      case 'A':
        this.dynamicComponentContainer?.createComponent(
          this.resolver.resolveComponentFactory(RoleComponentComponent)
        );
        break;
      case 'B':
        this.dynamicComponentContainer?.createComponent(
          this.resolver.resolveComponentFactory(PlanComponentComponent)
        );
        break;
      default:
        break;
    }
  }
}

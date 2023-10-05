import { Component } from '@angular/core';
import { PlanServiceService } from 'src/app/services/plan-service/plan-service.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Plan } from 'src/app/models/Plan';

@Component({
  selector: 'app-plan-component',
  templateUrl: './plan-component.component.html',
  styleUrls: ['./plan-component.component.css'],
})
export class PlanComponentComponent {
  plans: any[] = [];
  newPlanForm: FormGroup;

  constructor(
    private planService: PlanServiceService,
    private toastr: ToastrService
  ) {
    this.planService.getAllPlans().subscribe((res) => {
      this.plans = res;
    });
    this.newPlanForm = new FormGroup({
      type: new FormControl('', [Validators.required, Validators.minLength(2)]),
      price_pla: new FormControl('', [Validators.required]),
    });
  }

  getAllPlans() {
    this.planService.getAllPlans().subscribe((data) => {
      this.plans = data;
    });
  }

  addPlan() {
    const newPlan: Plan = {
      type: this.newPlanForm.get('type')?.value,
      price_pla: this.newPlanForm.get('price_pla')?.value,
    };
    this.planService.addPlan(newPlan).subscribe((res) => {
      this.toastr.success(res.message, 'Success');
      this.getAllPlans();
      setTimeout(() => {
        document.getElementById('closeModalBtn')?.click();
      }, 200);
    });
  }
}

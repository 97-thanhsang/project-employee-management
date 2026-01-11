import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DesignationFacade } from '@features/employee-manage/data-access/facades/designation.facade';
import { DesignationFormComponent } from '../../../ui/designation/designation-form/designation-form.component';
import { CreateDesignationRequest } from '@features/employee-manage/data-access/models';

@Component({
    selector: 'app-designation-edit',
    standalone: true,
    imports: [CommonModule, DesignationFormComponent],
    template: `
    <app-designation-form
      [designation]="facade.viewModel().selectedDesignation"
      [departments]="facade.viewModel().departments"
      [isLoading]="facade.viewModel().isLoading"
      [isEditMode]="isEditMode"
      [error]="facade.viewModel().error"
      (save)="onSave($event)"
      (cancel)="onCancel()">
    </app-designation-form>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesignationEditComponent implements OnInit {
    facade = inject(DesignationFacade);
    route = inject(ActivatedRoute);
    router = inject(Router);

    isEditMode = false;
    designationId: number | null = null;

    ngOnInit(): void {
        this.facade.loadMasterData();

        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.isEditMode = true;
                this.designationId = parseInt(id, 10);
                this.facade.loadDesignationById(this.designationId);
            } else {
                this.facade.selectDesignation(null);
            }
        });
    }

    onSave(payload: CreateDesignationRequest): void {
        const onSuccess = () => {
            this.router.navigate(['/employee-manage/designations']);
        };

        if (this.isEditMode && this.designationId) {
            this.facade.updateDesignation(this.designationId, payload as any, onSuccess);
        } else {
            this.facade.createDesignation(payload, onSuccess);
        }
    }

    onCancel(): void {
        this.router.navigate(['/employee-manage/designations']);
    }
}

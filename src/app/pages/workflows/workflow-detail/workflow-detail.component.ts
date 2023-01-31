import {Component, OnInit} from '@angular/core';
import {IGroupRole, IWorkflowExtended, IWorkflowItem} from "../../../lib/interfaces";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../../lib/services/toast.service";
import {WorkflowService} from "../../../lib/services/workflow/workflow.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {GroupRoleService} from "../../../lib/services/group-role/group-role.service";
import {PaginationParams} from "../../../lib/classes/pagination-params";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'enr-workflow-detail',
  templateUrl: './workflow-detail.component.html',
  styleUrls: ['./workflow-detail.component.scss']
})
export class WorkflowDetailComponent implements OnInit {
  workflowId!: string;
  workflow: IWorkflowExtended = null!;
  loading = false;
  checked = false;
  isVisible = false;
  isOkLoading = false;
  isDeleting = false;
  validateForm!: UntypedFormGroup;
  formMode: 'new' | 'edit' = "new";
  roles: IGroupRole[] = [];

  constructor(private fb: UntypedFormBuilder, private toastService: ToastService, private workflowService: WorkflowService,
              private _route: ActivatedRoute, private location: Location, private roleService: GroupRoleService,
              private title: Title) {
    this._route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.workflowId = id;
        this.getWorkflow(id);
      } else {
        this.toastService.info('Could not parse ID');
        this.location.back()
      }
    })
  }


  getWorkflow(id: string) {
    this.loading = true;
    this.workflowService.retrieveSingleWorkflow(id)
      .subscribe(
        (response) => {
          if (response) {
            this.title.setTitle(`${response.name}`)
            this.workflow = response
          } else {
            this.toastService.error("An error occurred, please try again")
          }
        },
        (error) => {
          console.error(error)
          this.toastService.error(`${error.error?.error || 'An error occurred'}`);
        },
        () => {
          this.loading = false;
        }
      );
  }

  getGroupRoles() {
    this.loading = true;
    const pg = new PaginationParams()
    pg.take = 20;
    this.roleService.retrieveGroupRoles(pg)
      .subscribe(
        (response) => {
          if (response) {
            this.roles = response.data;
          } else {
            this.toastService.error("An error occurred, please try again")
          }
        },
        (error) => {
          console.error(error)
          this.toastService.error(`${error.error?.error || 'An error occurred'}`);
        },
        () => {
          this.loading = false;
        }
      );
  }

  showModal(): void {
    this.formMode = 'new';
    this.isVisible = true;
  }

  handleOk(): void {
    if (this.validateForm.valid) {
      this.isOkLoading = true;
      if (this.formMode === 'new') {
        this.workflowService.createWorkflowItem(this.workflowId, this.validateForm.value)
          .subscribe(
            (response) => {
              if (response) {
                this.toastService.success(`Added Workflow Item ${response.name}`);
                this.getWorkflow(this.workflowId)
              } else {
                this.toastService.error("An error occurred, please try again")
              }
            },
            (error) => {
              console.error(error)
              this.toastService.error(`${error.error?.error || 'An error occurred'}`);
            },
            () => {
              this.isVisible = false;
              this.isOkLoading = false;
              this.validateForm.reset()
            }
          )
      } else {
        this.workflowService.updateWorkflow(this.workflow.id, this.validateForm.value)
          .subscribe(
            (response) => {
              if (response) {
                this.toastService.success(`Updated Workflow Item ${response.name}`);
                this.getWorkflow(this.workflowId);
              } else {
                this.toastService.error("An error occurred, please try again")
                return
              }
            },
            (error) => {
              console.error(error)
              this.toastService.error(`${error.error?.error || 'An error occurred'}`);
            },
            () => {
              this.isVisible = false;
              this.isOkLoading = false;
              this.workflow = null!;
              this.validateForm.reset()
            }
          );
      }
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  ngOnInit(): void {
    this.title.setTitle("Workflow Details")
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      groupRoleId: [null, [Validators.required]],
    });

    this.getGroupRoles()
  }

  deleteWorkflowItem(data: IWorkflowItem) {
    this.workflowService.deleteSingleWorkflowItem(data.id)
      .subscribe((response) => {
        this.toastService.success(`Deleted ${response.name}`)
        this.getWorkflow(this.workflowId)
      }, ((error) => {
        console.error(error)
        this.toastService.error(error?.error?.error || 'An error occurred')
      }))
  }
}

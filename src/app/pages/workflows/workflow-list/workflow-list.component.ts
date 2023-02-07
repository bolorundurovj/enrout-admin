import {Component, OnInit} from '@angular/core';
import {IPaginatedMetadata, IWorkflow} from "../../../lib/interfaces";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {PaginationParams} from "../../../lib/classes/pagination-params";
import {ToastService} from "../../../lib/services/toast.service";
import {WorkflowService} from "../../../lib/services/workflow/workflow.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'enr-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.scss']
})
export class WorkflowListComponent implements OnInit {
  checked = false;
  loading = false;
  listOfData: readonly IWorkflow[] = [];
  setOfCheckedId = new Set<string>();
  isVisible = false;
  isOkLoading = false;
  isDeleting = false;
  validateForm!: UntypedFormGroup;
  formMode: 'new' | 'edit' = "new";
  workflow: IWorkflow = null!;
  pagination = new PaginationParams()
  paginationMeta: IPaginatedMetadata = {
    "page": 1,
    "take": 10,
    "itemCount": 0,
    "pageCount": 0,
    "hasPreviousPage": false,
    "hasNextPage": true
  };

  constructor(private fb: UntypedFormBuilder, private toastService: ToastService, private workflowService: WorkflowService, private title: Title) {
  }

  showModal(): void {
    this.formMode = 'new';
    this.isVisible = true;
  }

  editGroup(workflow: any) {
    this.formMode = 'edit';
    this.workflow = workflow;
    this.isVisible = true;
    this.validateForm.controls['name'].setValue(workflow.name);
    this.validateForm.controls['designation'].setValue(workflow.designation);
  }

  deleteGroup(workflow: IWorkflow) {
    this.workflow = workflow;
    this.isDeleting = true;
    this.workflowService.deleteSingleWorkflow(workflow.id)
      .subscribe(
        (response) => {
          if (response) {
            this.toastService.success(`Deleted ${response.name} Workflow`)
            this.getWorkflows()
          } else {
            this.toastService.error("An error occurred, please try again")
          }
        },
        (error) => {
          console.error(error)
          this.toastService.error(`${error.error?.error || 'An error occurred'}`);
        },
        () => {
          this.isDeleting = false;
        }
      );
  }

  handleOk(): void {
    if (this.validateForm.valid) {
      this.isOkLoading = true;
      if (this.formMode === 'new') {
        this.workflowService.createWorkflow(this.validateForm.value)
          .subscribe(
            (response) => {
              if (response) {
                this.toastService.success(`Created Workflow ${response.name}`);
                this.getWorkflows()
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
                this.toastService.success(`Updated Workflow ${response.name}`);
                this.getWorkflows();
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

  pageChange(page: number) {
    this.pagination.page = page;
    this.getWorkflows();
  }

  limitChange(limit: number) {
    this.pagination.take = limit;
    this.getWorkflows();
  }

  getWorkflows() {
    this.loading = true;
    this.workflowService.retrieveWorkflows(this.pagination)
      .subscribe(
        (response) => {
          if (response) {
            this.listOfData = response.data;
            this.paginationMeta = response.meta;
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

  ngOnInit(): void {
    this.title.setTitle("Workflows")
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]]
    });

    this.getWorkflows()
  }
}

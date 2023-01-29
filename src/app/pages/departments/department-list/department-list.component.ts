import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../../lib/services/toast.service";
import {IGroup} from "../../../lib/interfaces/igroup";
import {PaginationParams} from "../../../lib/classes/pagination-params";
import {IDepartment, IPaginatedMetadata} from "../../../lib/interfaces";
import {DepartmentService} from "../../../lib/services/department/department.service";
import {GroupService} from "../../../lib/services/group/group.service";


export interface Data {
  id: number;
  name: string;
  group: string;
  disabled: boolean;
}

@Component({
  selector: 'enr-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {
  checked = false;
  loading = false;
  groups: Array<IGroup> = [];
  listOfData: readonly IDepartment[] = [];
  setOfCheckedId = new Set<string>();
  isVisible = false;
  isOkLoading = false;
  isDeleting = false;
  validateForm!: UntypedFormGroup;
  formMode: 'new' | 'edit' = "new";
  department: IDepartment = null!;
  pagination = new PaginationParams()
  paginationMeta: IPaginatedMetadata = {
    "page": 1,
    "take": 10,
    "itemCount": 0,
    "pageCount": 0,
    "hasPreviousPage": false,
    "hasNextPage": true
  };

  constructor(private fb: UntypedFormBuilder, private toastService: ToastService,
              private departmentService: DepartmentService, private groupService: GroupService) {
  }

  showModal(): void {
    this.formMode = 'new';
    this.isVisible = true;
  }

  getDepts() {
    this.loading = true;
    this.departmentService.retrieveDepartments(this.pagination)
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

  editDept(department: IDepartment) {
    this.formMode = 'edit';
    this.department = department;
    this.isVisible = true;
    this.validateForm.controls['name'].setValue(department.name);
    // this.validateForm.controls['groupId'].setValue(department.groupId);
  }

  deleteDept(department: IDepartment) {
    this.department = department;
    this.isDeleting = true;
    this.departmentService.deleteSingleDepartment(department.id)
      .subscribe(
        (response) => {
          if (response) {
            this.toastService.success(`Deleted ${response.name} Department`)
            this.getDepts()
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
      console.log('submit', this.validateForm.value);
      if (this.formMode === 'new') {
        this.departmentService.createDepartment(this.validateForm.value)
          .subscribe(
            (response) => {
              if (response) {
                this.toastService.success(`Created ${response.name} Department`);
                this.getDepts()
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
        this.departmentService.updateDepartment(this.department.id, this.validateForm.value)
          .subscribe(
            (response) => {
              if (response) {
                this.toastService.success(`Updated ${response.name} Department`);
                this.getDepts();
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
              this.department = null!;
            }
          );
      }
      this.department = null!;
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
    this.getDepts();
  }

  limitChange(limit: number) {
    this.pagination.take = limit;
    this.getDepts();
  }

  getGroups() {
    this.loading = true;
    const pg = new PaginationParams()
    pg.take = 20;
    this.groupService.retrieveGroups(pg)
      .subscribe(
        (response) => {
          if (response) {
            this.groups = response.data;
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
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      groupId: [null, [Validators.required]],
    });
    this.getGroups()
    this.getDepts()
  }

}

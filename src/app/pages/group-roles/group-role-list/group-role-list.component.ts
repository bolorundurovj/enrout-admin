import {Component, OnInit} from '@angular/core';
import {enumAsArray} from "../../../lib/utils/functions/functions.utils";
import {StaffDesignation} from "../../../lib/enums";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PaginationParams} from "../../../lib/classes/pagination-params";
import {IGroupRole, IPaginatedMetadata} from "../../../lib/interfaces";
import {ToastService} from "../../../lib/services/toast.service";
import {GroupRoleService} from "../../../lib/services/group-role/group-role.service";

@Component({
  selector: 'enr-group-role-list',
  templateUrl: './group-role-list.component.html',
  styleUrls: ['./group-role-list.component.scss']
})
export class GroupRoleListComponent implements OnInit {
  checked = false;
  loading = false;
  designations: Array<any> = enumAsArray(StaffDesignation)
  listOfData: readonly IGroupRole[] = [];
  setOfCheckedId = new Set<string>();
  isVisible = false;
  isOkLoading = false;
  isDeleting = false;
  validateForm!: FormGroup;
  formMode: 'new' | 'edit' = "new";
  role: IGroupRole = null!;
  pagination = new PaginationParams()
  paginationMeta: IPaginatedMetadata = {
    "page": 1,
    "take": 10,
    "itemCount": 0,
    "pageCount": 0,
    "hasPreviousPage": false,
    "hasNextPage": true
  };

  constructor(private fb: FormBuilder, private toastService: ToastService, private roleService: GroupRoleService) {
  }

  showModal(): void {
    this.formMode = 'new';
    this.isVisible = true;
  }

  editGroup(role: any) {
    this.formMode = 'edit';
    this.role = role;
    this.isVisible = true;
    this.validateForm.controls['name'].setValue(role.name);
    this.validateForm.controls['designation'].setValue(role.designation);
  }

  deleteGroup(role: IGroupRole) {
    this.role = role;
    this.isDeleting = true;
    this.roleService.deleteSingleGroupRole(role.id)
      .subscribe(
        (response) => {
          if (response) {
            this.toastService.success(`Deleted ${response.name} Group Role`)
            this.getGroupROles()
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
        this.roleService.createGroupRole(this.validateForm.value)
          .subscribe(
            (response) => {
              if (response) {
                this.toastService.success(`Created Group Role ${response.name}`);
                this.getGroupROles()
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
        this.roleService.updateGroupRole(this.role.id, this.validateForm.value)
          .subscribe(
            (response) => {
              if (response) {
                this.toastService.success(`Updated Group Role ${response.name}`);
                this.getGroupROles();
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
              this.role = null!;
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
    this.getGroupROles();
  }

  limitChange(limit: number) {
    this.pagination.take = limit;
    this.getGroupROles();
  }

  getGroupROles() {
    this.loading = true;
    this.roleService.retrieveGroupRoles(this.pagination)
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
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      designation: [null, [Validators.required]],
    });

    this.getGroupROles()
  }

}

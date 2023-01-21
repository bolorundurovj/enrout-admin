import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastService} from "../../../lib/services/toast.service";
import {PaginationParams} from "../../../lib/classes/pagination-params";
import {GroupService} from "../../../lib/services/group/group.service";
import {IGroup} from "../../../lib/interfaces/igroup";
import {IPaginatedMetadata} from "../../../lib/interfaces";
import {LoaderService} from "../../../lib/services/loader/loader.service";

export interface Data {
  id: number;
  name: string;
  age: number;
  address: string;
  disabled: boolean;
}

@Component({
  selector: 'enr-group-list',
  templateUrl: './group-list.component.html',

  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: readonly IGroup[] = [];
  listOfCurrentPageData: readonly IGroup[] = [];
  setOfCheckedId = new Set<string>();
  isVisible = false;
  isOkLoading = false;
  isDeleting = false;
  validateForm!: FormGroup;
  formMode: 'new' | 'edit' = "new";
  group: any = {};
  groupPagination = new PaginationParams()
  paginationMeta: IPaginatedMetadata = {
    "page": 1,
    "take": 10,
    "itemCount": 0,
    "pageCount": 0,
    "hasPreviousPage": false,
    "hasNextPage": true
  };

  constructor(private fb: FormBuilder, private toastService: ToastService, private groupService: GroupService, private loader: LoaderService) {
  }

  showModal(): void {
    this.formMode = 'new';
    this.isVisible = true;
  }

  editGroup(group: any) {
    this.formMode = 'edit';
    this.group = group;
    this.isVisible = true;
  }

  deleteGroup(group: any) {
    this.group = group;
    this.isDeleting = true;
    setTimeout(() => {
      this.isDeleting = false;
      this.toastService.sendMessage("Deleted Successfully", "success")
    }, 2000);
  }

  handleOk(): void {
    if (this.validateForm.valid) {
      this.isOkLoading = true;
      console.log('submit', this.validateForm.value);
      if (this.formMode === 'new') {
        setTimeout(() => {
          this.isVisible = false;
          this.isOkLoading = false;
          this.toastService.success("Created!")
        }, 3000);
      } else {
        setTimeout(() => {
          this.isVisible = false;
          this.isOkLoading = false;
          this.toastService.success("Updated!")
        }, 3000);
      }
      this.group = {};
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

  pageChange(page: number){
    this.groupPagination.page = page;
    this.getGroups();
  }

  limitChange(limit: number){
    this.groupPagination.take = limit;
    this.getGroups();
  }

  getGroups() {
    this.loading = true;
    this.groupService.retrieveGroups(this.groupPagination)
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

  // updateCheckedSet(id: number, checked: boolean): void {
  //   if (checked) {
  //     this.setOfCheckedId.add(id);
  //   } else {
  //     this.setOfCheckedId.delete(id);
  //   }
  // }


  // refreshCheckedStatus(): void {
  //   const listOfEnabledData = this.listOfCurrentPageData.filter(({disabled}) => !disabled);
  //   this.checked = listOfEnabledData.every(({id}) => this.setOfCheckedId.has(id));
  //   this.indeterminate = listOfEnabledData.some(({id}) => this.setOfCheckedId.has(id)) && !this.checked;
  // }

  // onItemChecked(id: number, checked: boolean): void {
  //   this.updateCheckedSet(id, checked);
  //   this.refreshCheckedStatus();
  // }

  // onAllChecked(checked: boolean): void {
  //   this.listOfCurrentPageData
  //     .filter(({disabled}) => !disabled)
  //     .forEach(({id}) => this.updateCheckedSet(id, checked));
  //   this.refreshCheckedStatus();
  // }

  // sendRequest(): void {
  //   this.loading = true;
  //   const requestData = this.listOfData.filter(data => this.setOfCheckedId.has(data.id));
  //   console.log(requestData);
  //   setTimeout(() => {
  //     this.setOfCheckedId.clear();
  //     this.refreshCheckedStatus();
  //     this.loading = false;
  //   }, 1000);
  // }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
    });

    this.getGroups()
  }
}

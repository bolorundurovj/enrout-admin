import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../../lib/services/toast.service";


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
  indeterminate = false;
  listOfData: readonly Data[] = [];
  listOfCurrentPageData: readonly Data[] = [];
  setOfCheckedId = new Set<number>();
  isVisible = false;
  isOkLoading = false;
  isDeleting = false;
  validateForm!: FormGroup;
  formMode: 'new' | 'edit' = "new";
  department: any = {};

  constructor(private fb: FormBuilder, private toastService: ToastService) {
  }

  showModal(): void {
    this.formMode = 'new';
    this.isVisible = true;
  }

  editGroup(department: any) {
    this.formMode = 'edit';
    this.department = department;
    this.isVisible = true;
    this.validateForm.controls['name'].setValue(department.name);
    this.validateForm.controls['group'].setValue(department.group);
  }

  deleteGroup(department: any) {
    this.department = department;
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
      this.department = {};
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

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly Data[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(({disabled}) => !disabled);
    this.checked = listOfEnabledData.every(({id}) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({id}) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData
      .filter(({disabled}) => !disabled)
      .forEach(({id}) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  sendRequest(): void {
    this.loading = true;
    const requestData = this.listOfData.filter(data => this.setOfCheckedId.has(data.id));
    console.log(requestData);
    setTimeout(() => {
      this.setOfCheckedId.clear();
      this.refreshCheckedStatus();
      this.loading = false;
    }, 1000);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      group: [null, [Validators.required]],
    });
    this.listOfData = new Array(100).fill(0).map((_, index) => ({
      id: index,
      name: `Department ${index}`,
      group: `seet`,
      disabled: index % 2 === 0
    }));
  }

}

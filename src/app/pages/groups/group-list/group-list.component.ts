import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
  listOfData: readonly Data[] = [];
  listOfCurrentPageData: readonly Data[] = [];
  setOfCheckedId = new Set<number>();
  isVisible = false;
  isOkLoading = false;
  isDeleting = false;
  validateForm!: FormGroup;
  formMode: 'new' | 'edit' = "new";
  group: any = {name: ''};

  constructor(private fb: FormBuilder) {
  }

  showModal(): void {
    this.isVisible = true;
  }

  editGroup(group: any) {
    this.formMode = 'edit';
    this.group = group;
  }

  deleteGroup(group: any) {
    this.group = group;
    this.isDeleting = true;
    setTimeout(() => {
      this.isDeleting = false;
    }, 5000);
  }

  handleOk(): void {
    if (this.validateForm.valid) {
      this.isOkLoading = true;
      console.log('submit', this.validateForm.value);
      setTimeout(() => {
        this.isVisible = false;
        this.isOkLoading = false;
      }, 3000);
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
    });
    this.listOfData = new Array(100).fill(0).map((_, index) => ({
      id: index,
      name: `Group ${index}`,
      age: 32,
      address: `London, Park Lane no. ${index}`,
      disabled: index % 2 === 0
    }));
  }
}

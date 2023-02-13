import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {AdminService} from "../../lib/services/admin/admin.service";
import {IEntityCount} from "../../lib/interfaces/ientity-count";

@Component({
  selector: 'enr-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  stats: IEntityCount = {
    groups: 0,
    groupRoles: 0,
    departments: 0,
    documents: 0,
    students: 0,
    staff: 0,
    users: 0,
    admins: 0,
    workflows: 0,
  };

  constructor(private title: Title, private adminService: AdminService) {
  }

  ngOnInit() {
    this.title.setTitle("Dashboard")

    this.adminService.retrieveEntityCounts()
      .subscribe((res) => {
        this.stats = res;
      }, (error) => {
        console.error(error)
      })
  }

}

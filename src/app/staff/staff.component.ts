import 'rxjs/add/operator/finally';

import { Component, OnInit } from '@angular/core';

import { Staff } from '../shared/model/staff';
import { StaffService } from './staff.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  staff: Staff;
  isLoading: boolean;

  constructor(private staffService: StaffService) {}

  ngOnInit() {
    this.isLoading = true;
    this.staffService.getStaff()
      .finally(() => { this.isLoading = false; })
      .subscribe((staff: Staff) => { this.staff = staff; });
  }

}

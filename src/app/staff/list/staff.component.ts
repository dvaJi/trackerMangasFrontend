import { Component, OnInit } from '@angular/core';

import Staff from './../../models/staff';
import { StaffService } from './../../services/staff.service';
import { finalize } from 'rxjs/operators/finalize';

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
    this.staffService.getStaffs()
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((staff: Staff) => { this.staff = staff; });
  }

}

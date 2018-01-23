import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Staff } from '@app/models';
import { StaffService } from '@app/services';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.scss']
})
export class StaffDetailComponent implements OnInit {

  staff: Staff;
  isLoading: boolean;

  constructor(private staffService: StaffService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.isLoading = true;
    const staffId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.staffService.getStaff({ id: staffId })
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((staff: Staff) => { this.staff = staff; });
  }

}

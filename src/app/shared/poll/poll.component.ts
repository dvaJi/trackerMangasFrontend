import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Poll } from '../../home/poll';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {

  @Input() isLoading = false;
  @Input() poll: Poll = null;
  @Input() showDesc = false;
  @Input() title = 'h4';
  @Input() color = 'info';
  @Output() notify: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() { }

  onClick(value: number) {
    this.notify.emit(value);
  }

  getPollProgress(votes: number): number {
    if (this.poll.totalVotes === 0) {
      return 0;
    }
    return (votes / this.poll.totalVotes) * 100;
  }

}

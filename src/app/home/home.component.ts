import 'rxjs/add/operator/finally';

import { Component, OnInit } from '@angular/core';

import { PollsService } from './../services/polls.service';
import { NewsService } from './../services/news.service';
import Poll from './../models/poll';
import News from './../models/news';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  poll: Poll;
  polls: Array<Poll>;
  news: Array<News>;
  isLoading: boolean;
  pollAnswer: any;
  pollAlert: { active: boolean, msg: string };

  constructor(private pollsService: PollsService, private newsService: NewsService) { }

  onNotify(answer: number): void {
    this.pollAnswer = answer;
  }

  ngOnInit() {
    this.pollAlert = { active: false, msg: '' };
    this.isLoading = true;
    this.pollsService.getPoll({ active: true, latest: true })
      .finally(() => { this.isLoading = false; })
      .subscribe((poll: Poll) => { this.poll = poll; });
    this.pollsService.getPolls({ active: false, latest: false })
      .finally(() => { this.isLoading = false; })
      .subscribe((polls: Poll[]) => { this.polls = polls; });
    this.newsService.getAllNews()
      .finally(() => { this.isLoading = false; })
      .subscribe((news: News[]) => { this.news = news; });
  }

  vote() {
    this.pollsService.setPoll(this.pollAnswer)
      .subscribe(response => {
        this.poll = this.updatePoll();
      }, error => {
        this.pollAlert = { active: true, msg: error };
      });
  }

  updatePoll(): Poll {
    const newPoll = this.poll;
    newPoll.answered = true;
    newPoll.totalVotes += 1;
    newPoll.answers.forEach((ans) => {
      if (ans.id === this.pollAnswer) {
        ans.votes += 1;
      }
    });

    return newPoll;
  }

  public closeAlert(alert: { active: boolean, msg: string }) {
    this.pollAlert = { active: false, msg: '' };
  }

}

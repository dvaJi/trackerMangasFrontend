import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss']
})
export class CoverComponent implements OnInit {

  @Input() imgSrc: string = null;
  @Input() name: string = null;

  constructor() { }

  ngOnInit() { }

}
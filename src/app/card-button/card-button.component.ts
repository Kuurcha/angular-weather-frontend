import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-button',
  templateUrl: './card-button.component.html',
  styleUrls: ['./card-button.component.scss'],
})
export class CardButtonComponent implements OnInit {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() link: string = '#';

  constructor() {}

  ngOnInit(): void {}
}

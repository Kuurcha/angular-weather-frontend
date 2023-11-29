import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-list-display',
  templateUrl: './text-list-display.component.html',
  styleUrls: ['./text-list-display.component.scss'],
})
export class FileDisplayComponent implements OnInit {
  @Input() items: string[] = [];
  @Input() label: string = '';

  constructor() {}

  ngOnInit(): void {}
}

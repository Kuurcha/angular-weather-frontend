import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-display',
  templateUrl: './file-display.component.html',
  styleUrls: ['./file-display.component.scss'],
})
export class FileDisplayComponent implements OnInit {
  @Input() fileNames: string[] = [];
  constructor() {}

  ngOnInit(): void {}
}

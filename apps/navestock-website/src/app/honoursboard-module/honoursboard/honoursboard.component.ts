import { Component, OnInit } from '@angular/core';
import { HonoursBoardService } from './honours-board.service';
import {HonoursBoardPerYear } from './honours-board.object';
import { Observable } from 'rxjs';



@Component({
  selector: 'ncc-app-honoursboard',
  templateUrl: './honoursboard.component.html',
  styleUrls: ['./honoursboard.component.scss']
})
export class HonoursboardComponent implements OnInit {
  public hounoursBoard_perYear!: Observable<HonoursBoardPerYear[]>;

  constructor( private honoursBoardService: HonoursBoardService) {
   }

  ngOnInit(): void {
    this.hounoursBoard_perYear = this.honoursBoardService.createHonoursBoard_perYear(this.honoursBoardService.getHonoursBoardData());
  }

}


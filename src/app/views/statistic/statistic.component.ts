import {Component, Input, OnInit} from '@angular/core'

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
  @Input()
  completeTasksInCategory: number
  @Input()
  totalTasksInCategory: number
  @Input()
  uncompleteTasksInCategory: number

  @Input()
  showStat: boolean

  constructor() {
  }

  ngOnInit(): void {
  }

}

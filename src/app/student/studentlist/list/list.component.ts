import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StudentView } from '../../../utillity/StudentView';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  @Input() students$ : any;
  @Output() toDetailPage = new EventEmitter();
  @Output() toUpdatePage = new EventEmitter();
  @Output() toDeletePage = new EventEmitter();
  @Output() sortStudents = new EventEmitter();


  trackByID(index: number, item: StudentView): number { return item.Id; }




  constructor() { }

  ngOnInit(): void {

  }

}

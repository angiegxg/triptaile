import { Component } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-drop-down',
  standalone: true,
  imports: [NzDropDownModule],
  templateUrl: './drop-down.component.html'
})
export class DropDownComponent {}

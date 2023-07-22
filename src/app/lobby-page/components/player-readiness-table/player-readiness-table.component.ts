import { Component, Input } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-player-readiness-table',
  templateUrl: './player-readiness-table.component.html',
  styleUrls: ['./player-readiness-table.component.css']
})
export class PlayerReadinessTableComponent {
  @Input()
  players!: FormArray<FormControl<string | null>>;
}

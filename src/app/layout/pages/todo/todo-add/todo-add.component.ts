import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: '[app-todo-add]',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent implements OnInit {

  color = 'accent';
  checked = false;
  disabled = false;

  todoFormControl = new FormControl('', [
    Validators.required
  ]);

  model = {
    content: '',
    visibility: this.checked
  }

  constructor(public thisDialogRef: MatDialogRef<TodoAddComponent>) { }

  ngOnInit() {
  }

  onCloseCreate(model) {
    if (this.todoFormControl.status === 'VALID') {
      this.thisDialogRef.close(model);
    }
  }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
}

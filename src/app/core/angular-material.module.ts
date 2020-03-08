import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule
} from '@angular/material';

const modules = [
  MatCardModule,
  MatButtonModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatInputModule,
  MatDividerModule,
  MatCheckboxModule
];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules]
})
export class AngularMaterialModule {
}

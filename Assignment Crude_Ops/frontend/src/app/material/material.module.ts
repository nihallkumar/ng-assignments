import { NgModule } from '@angular/core';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatButtonModule} from '@angular/material/button';


const MaterialComponents=[
  MatFormFieldModule,
  MatButtonModule,

];


@NgModule({
  imports: [
    MaterialComponents
  ],
  exports:[MaterialComponents]
})
export class MaterialModule { }

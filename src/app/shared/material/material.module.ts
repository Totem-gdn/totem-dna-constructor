
import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

const MaterialComponents = [
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule,
  MatButtonModule,
  ClipboardModule,
  MatTooltipModule
]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents],
})
export class MaterialModule { }

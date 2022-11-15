import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogsviewComponent } from './blogsview/blogsview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BlogcommentComponent } from './blogcomment/blogcomment.component';
import { LanguagePipe } from './../services/language.pipe';

@NgModule({
  declarations: [
    BlogsviewComponent,
    BlogcommentComponent,
    LanguagePipe
  ],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BlogsModule { }

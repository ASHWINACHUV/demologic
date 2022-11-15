import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsviewComponent } from './blogsview/blogsview.component';

const routes: Routes = [{
  path:'',
  component:BlogsviewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogsRoutingModule { }

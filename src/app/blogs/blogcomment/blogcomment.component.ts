import { Component, OnInit , Input } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blogcomment',
  templateUrl: './blogcomment.component.html',
  styleUrls: ['./blogcomment.component.scss']
})
export class BlogcommentComponent implements OnInit {
@Input('currentindex') currentindex:any;
@Input('selectedblog') selectedblog:any;
@Input('selectedcomments') selectedcomments:any;
blogsubcomment:any;
  constructor(private blogservice:BlogService) { }

  ngOnInit(): void {
    if(this.selectedcomments){
      this.selectedcomments.forEach((element:any) => {
        element.isLike = false;
      });
    }
  }
  updateCommentLike(data:any){
    data.isLike = !data.isLike;
    let likecount = data?.likecount ?? 0;
    if(!data.isLike && likecount>0){
      likecount = likecount-1;
      data.likecount = likecount;
    }else if(data.isLike){
      likecount = likecount+1;
      data.likecount = likecount;
    }
    this.blogservice.updateBlogs(this.selectedblog,this.currentindex);
  }

  postsubcomment(item:any){
    if(this.blogsubcomment!=''){
      const subcoments = item?.comments ?? [];
      const commentdata ={
        likecount:0,
        val:this.blogsubcomment
      }
      subcoments.push(commentdata)
      item.comments = subcoments;
      item.replyshow = false;
      this.blogservice.updateBlogs(this.selectedblog,this.currentindex);
      this.blogsubcomment = '';
    }
  }
}

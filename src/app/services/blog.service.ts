import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor() { }

  getBlogs(){
  let data:any =   localStorage.getItem('blogsdata');
  let returnarray = JSON.parse(data);
  return returnarray ??[];
  }
  insertBlogs(blog:any){
    let blogdata:any =  this.getBlogs();
    blogdata.push(blog);
    localStorage.setItem('blogsdata',JSON.stringify(blogdata));
    return true;
    }
    getblogbyindex(index:number){
      let blogdata:any =  this.getBlogs();
      return blogdata[index] ?? null;
    }

    removeblogbyindex(index:number){
      let blogdata:any =  this.getBlogs();
      if(blogdata[index]){
        blogdata.splice(index,1);
        localStorage.setItem('blogsdata',JSON.stringify(blogdata));
      }
     return blogdata;
    }
    updateBlogs(blog:any,index:number){
      let blogdata:any =  this.getBlogs();
      blogdata[index] = blog;
      localStorage.setItem('blogsdata',JSON.stringify(blogdata));
      return true;
      }
   
    addLikeByIndex(index:number,isLike:boolean){
      let blogsdata:any =  this.getBlogs();
      let currentblog = blogsdata[index];
      if(currentblog){
        const likecount = (currentblog.likecount)??0;
        if(likecount > 0 && !isLike){
          currentblog.likecount = likecount-1;
          this.updateBlogs(currentblog,index);
        }else if(isLike){
          currentblog.likecount = likecount+1;
          this.updateBlogs(currentblog,index);
        }
         
      
      }
    }

    addCommentsByIndex(index:number,comment:any){
      let blogsdata:any =  this.getBlogs();
      let currentblog = blogsdata[index];
      if(currentblog){
        const currentcomments  = currentblog?.comments ??[];
        const commentdata ={
          likecount:0,
          val:comment
        }
        currentcomments.push(commentdata);
        currentblog.comments = currentcomments;
        this.updateBlogs(currentblog,index);
      }

    }
}

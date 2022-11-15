import { Component, OnInit ,ViewChild,ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder,ValidatorFn, ValidationErrors } from '@angular/forms'
import { Observable, ReplaySubject } from 'rxjs';
import { BlogService } from 'src/app/services/blog.service';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-blogsview',
  templateUrl: './blogsview.component.html',
  styleUrls: ['./blogsview.component.scss']
})
export class BlogsviewComponent implements OnInit {
  blogcomment:any='';
  @ViewChild("fileinput", {static: false})fileinput!: ElementRef;
  blogformgroup!:FormGroup;
  allblogs:any =[];
  selectedblog:any =null;
  currentindex:number|null=null;
  data: any[]=[];
  sorted: any[]=[];
  featuredPost: any=[{
    imgurl:'https://loremflickr.com/g/600/400/paris',
    title:'Hi im testing the description',
    desc:''

  }]
  isFetching: boolean = false
  error: string='';
  searchText:string ='';
  featuredPostsorted: any[]=[];
  commenData: any = []
  constructor(private fb:FormBuilder,private blogservice:BlogService,public translate: TranslateService) { 
    this.blogformgroup = this.fb.group({
      tittle:[],
      description:['',Validators.required],
      filepath:['',Validators.required],
      createddatetime:['']
    });
  }

  ngOnInit(): void {
   this.getAllBlogs();
  }
getAllBlogs(){
  this.allblogs = this.blogservice.getBlogs();
  if(this.allblogs && this.allblogs.length>0){
    this.loadBlog(0);
  }
}
  
  onFileSelected(fileInput: any) {
    let errormessage = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      
    
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = (rs:any) => {
              


                
                    const imgBase64Path = e.target.result;
                    this.blogformgroup.get('filepath')?.setValue(imgBase64Path);
                  
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
    }
}
  onFileSelecteddemo(event:any) {
    if(event){
      this.convertFile(event.target.files[0]).subscribe(base64 => {
        this.blogformgroup.get('filepath')?.setValue(base64);
       })
    }else{
      this.blogformgroup.get('filepath')?.setValue(null);
    }
   
  }
  
  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event:any) => result.next(btoa(event.target.result.toString()));
    return result;
  }
  blogsubmit(){
    this.blogformgroup.get('createddatetime')?.setValue(new Date());
    this.blogservice.insertBlogs(this.blogformgroup.value);
    this.blogformgroup.reset();
    this.fileinput.nativeElement.value ='';
    this.getAllBlogs();
  }
  loadBlog(index:number){
    this.currentindex = index;
    const blog = this.blogservice.getblogbyindex(index);
    this.selectedblog = blog;
  }
  likeCount(){
    
    if(this.currentindex!=null && this.currentindex >=0){
      this.selectedblog.isLike = !this.selectedblog.isLike
      this.blogservice.addLikeByIndex(this.currentindex,this.selectedblog.isLike);
      this.getCurrentBlog(this.currentindex,this.selectedblog.isLike);
    }
  }
  getCurrentBlog(index:number,islike:boolean){
    const blog = this.blogservice.getblogbyindex(index);
    this.selectedblog = blog;
    this.selectedblog.isLike = islike
  }
  postcomment(){
    if(this.blogcomment!='' && this.currentindex!=null && this.currentindex >=0){
      this.blogservice.addCommentsByIndex(this.currentindex,this.blogcomment);
      this.getCurrentBlog(this.currentindex,this.selectedblog.isLike);
      this.blogcomment =null;
    }
   
  }
  setLang(lang:string){
    localStorage.setItem("language",lang);
    this.translate.use(lang);
    window.location.reload();
  }
 
}

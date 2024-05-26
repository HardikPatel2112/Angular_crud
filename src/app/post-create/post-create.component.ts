import { Component, OnInit } from '@angular/core';
import { PostModel } from '../Models/PostModel';
import { PostService } from '../services/post.service';
import {  ActivatedRoute,  Router } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent implements OnInit {
 
  post: PostModel  = { id: 0, title: '', body: '', userId: 0 };
  isEditMode=false;
  constructor(private postService : PostService,private router: Router,private route : ActivatedRoute ){

  } 
   ngOnInit(): void {
    var id = + (this.route.snapshot.paramMap.get('id') ?? 0);
    if (id) {
      this.isEditMode = true;
      this.postService.getPost(id).subscribe(data => {
        this.post = data ?? this.post ;
      });
    }
  }
     
  
  submitPost(){
    console.log(this.post);
    if(this.isEditMode){
      this.postService.updatePost(this.post.id,this.post);
    }else{      
      this.post.time=new Date();
      this.postService.createPost(this.post);
    }
  
    this.router.navigate(['/posts']);
  }

}

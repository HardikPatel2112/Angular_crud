import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { PostModel } from '../../Models/PostModel';



@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: PostModel  = { id: 0, title: '', body: '', userId: 0 };
  isEditMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    var id = + (this.route.snapshot.paramMap.get('id') ?? 0);
    if (id) {
      this.isEditMode = true;
      this.postService.getPost(id).subscribe(data => {
        this.post = data ?? this.post ;
      });
    }
  }

  savePost(): void {
    if (this.isEditMode && this.post?.id) {
      this.postService.updatePost(this.post?.id, this.post).subscribe(() => {
        this.router.navigate(['/posts']);
      });
    } 
    else
     {
      this.post &&  this.postService.createPost(this.post).subscribe(() => {
        this.router.navigate(['/posts']);
      });
    }
  }
}

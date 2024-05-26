import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { PostModel } from '../../Models/PostModel';
import { Router } from '@angular/router';



@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: PostModel[] = [];

  constructor(private postService: PostService, private router : Router ) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(data => {
      this.posts = data;
    });
  }

  deletePost(id: number): void {

    this.postService.deletePost(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);     
    });

    this.postService.getPosts().subscribe(data => {
      this.posts = data;
    });

  }

  editPost(id: number){
    this.router.navigate([`/posts/edit/${id}`]);
  }
 
}

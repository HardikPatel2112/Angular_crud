import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PostModel } from '../Models/PostModel';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private storageKey = 'posts';

  constructor() { }

  // Helper method to get all posts from local storage
  private getStoredPosts(): PostModel[] {
    const posts = localStorage.getItem(this.storageKey);
    return posts ? JSON.parse(posts) : [];
  }

  // Helper method to save posts to local storage
  private savePosts(posts: PostModel[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(posts));
    console.log("post Saved" + JSON.stringify(posts));
  }

  getPosts(): Observable<PostModel[]> {
    return of(this.getStoredPosts());
  }

  getPost(id: number): Observable<PostModel | null> {
    const posts = this.getStoredPosts();
    const post = posts.find(p => p.id === id) ?? null;
    return of(post);
  }

  createPost(post: PostModel): Observable<PostModel> {
    const posts = this.getStoredPosts();
    post.id = posts.length ? Math.max(...posts.map(p => p.id)) + 1 : 1; // Assign a new ID
    posts.push(post);
    this.savePosts(posts);
    return of(post);
  }

  updatePost(id: number, post: PostModel): Observable<PostModel> {
    const posts = this.getStoredPosts();
    const index = posts.findIndex(p => p.id === id);
    if (index !== -1) {
      posts[index] = post;
      this.savePosts(posts);
    }
    return of(post);
  }

  deletePost(id: number): Observable<void> {
    let posts = this.getStoredPosts();
    posts = posts.filter(p => p.id !== id);
    this.savePosts(posts);
    return of();
  }
}


// following code is for when you want to use actual api service 
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { PostModel } from '../Models/PostModel';



// @Injectable({
//   providedIn: 'root'
// })
// export class PostService {
//   private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

//   constructor(private http: HttpClient) { }

//   getPosts(): Observable<PostModel[]> {
//     return this.http.get<PostModel[]>(this.apiUrl);
//   }

//   getPost(id: number): Observable<PostModel> {
//     return this.http.get<PostModel>(`${this.apiUrl}/${id}`);
//   }

//   createPost(post: PostModel): Observable<PostModel> {
//     return this.http.post<PostModel>(this.apiUrl, post, {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json'
//       })
//     });
//   }

//   updatePost(id: number, post: PostModel): Observable<PostModel> {
//     return this.http.put<PostModel>(`${this.apiUrl}/${id}`, post, {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json'
//       })
//     });
//   }

//   deletePost(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`);
//   }
// }





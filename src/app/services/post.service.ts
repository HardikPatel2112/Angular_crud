import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostModel } from '../Models/PostModel';



@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(this.apiUrl);
  }

  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>(`${this.apiUrl}/${id}`);
  }

  createPost(post: PostModel): Observable<PostModel> {
    return this.http.post<PostModel>(this.apiUrl, post, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updatePost(id: number, post: PostModel): Observable<PostModel> {
    return this.http.put<PostModel>(`${this.apiUrl}/${id}`, post, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}





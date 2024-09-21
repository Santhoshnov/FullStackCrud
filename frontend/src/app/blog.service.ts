import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from './blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:5000/api/blog';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl);
  }

  createPost(post: Blog): Observable<Blog> {
    return this.http.post<Blog>(this.apiUrl, post);
  }

  updatePost(id: number, post: Blog): Observable<Blog> {
    return this.http.put<Blog>(`${this.apiUrl}/${id}`, post);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { Blog } from '../blog.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})

export class BlogComponent implements OnInit {
  posts: Blog[] = [];
  newPost: Blog = { id: 0, title: '', body: '' }; // Initialize a new post object
  isEditing: boolean = false; // Track if we are editing a post
  currentPostId: number | null = null; // Store the ID of the post being edited

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.blogService.getPosts().subscribe(data => {
      this.posts = data;
    });
  }

  createPost(): void {
    this.blogService.createPost(this.newPost).subscribe(post => {
      this.posts.push(post); // Add new post to the list
      this.newPost = { id: 0, title: '', body: '' }; // Reset the new post object
    });
  }

  editPost(post: Blog): void {
    this.isEditing = true;
    this.currentPostId = post.id;
    this.newPost = { ...post }; // Pre-fill the form with the selected post
  }

  updatePost(): void {
    if (this.currentPostId !== null) {
      this.blogService.updatePost(this.currentPostId, this.newPost).subscribe(updatedPost => {
        const index = this.posts.findIndex(p => p.id === this.currentPostId);
        this.posts[index] = updatedPost; // Update the post in the list
        this.cancelEdit();
      });
    }
  }

  deletePost(id: number): void {
    this.blogService.deletePost(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id); // Remove the deleted post
    });
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.currentPostId = null;
    this.newPost = { id: 0, title: '', body: '' }; // Reset the form
  }
}
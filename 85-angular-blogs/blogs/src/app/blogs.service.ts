import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
    })
export class BlogsService {
    constructor(private httpClient: HttpClient) {}

    blogsSubject = new BehaviorSubject([]);

    blogs: any[];
    blogGroup: number = 0;
    amountToShow: number = 3;
    firstBlogToShow: number;
    isTherePreviousBlogs: boolean;
    isThereNextBlogs: boolean;

    blogsToShow = firstBlogToIndex => {
        let blogsToShow = [];
        for (
            let blog_index = firstBlogToIndex, i = 0;
            i < this.amountToShow && blog_index < this.blogs.length && blog_index >= 0;
            blog_index++, i++
        ) {
            blogsToShow.push(this.blogs[blog_index]);
        }
        this.blogsSubject.next(blogsToShow);
    };

    nextBlogs = () => {
        if (this.blogGroup * this.amountToShow < this.blogs.length) {
            const firstBlogToShow = this.blogGroup++ * this.amountToShow;
            this.blogsToShow(firstBlogToShow);
            this.setIsThereMoreBlogs(this.blogGroup);
        }
    };

    previousBlogs = () => {
        if (this.blogGroup > 1) {
            this.blogGroup--;
            const firstBlogToShow = (this.blogGroup - 1) * this.amountToShow;
            this.blogsToShow(firstBlogToShow);
            this.setIsThereMoreBlogs(this.blogGroup);
        }
    };

    setIsThereMoreBlogs = blogGroup => {
        if (blogGroup > 1) {
            this.isTherePreviousBlogs = true;
        } else {
            this.isTherePreviousBlogs = false;
        }
        if (blogGroup * this.amountToShow >= this.blogs.length) {
            this.isThereNextBlogs = false;
        } else {
            this.isThereNextBlogs = true;
        }
    };

    getBlogs(bloggerId) {
        this.httpClient
            .get<any[]>(`https://jsonplaceholder.typicode.com/posts?userId=${bloggerId}`)
            .subscribe(blogs => {
                this.blogs = blogs;
                this.blogGroup = 0;
                this.nextBlogs();
            });
        return this.blogsSubject;
    }
}

import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css'],
    })
export class BlogComponent implements OnInit {
    constructor() {}
    @Input()
    blog;
    @Input()
    firstBlogId: number;

    showingComments: boolean;
    blogNum: number;

    toggleComments() {
        this.showingComments = !this.showingComments;
    }

    ngOnInit() {
        this.blogNum = this.blog.id - this.firstBlogId + 1;
    }
}

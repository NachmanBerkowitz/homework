import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BlogsService } from './../../blogs.service';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-blogs',
    templateUrl: './blogs.component.html',
    styleUrls: ['./blogs.component.css'],
    })
export class BlogsComponent implements OnInit, OnDestroy {
    constructor(private route: ActivatedRoute, private blogsService: BlogsService) {}

    blogs;
    blogsSubjectSubscription;
    firstBlogId: number;
    ngOnInit() {
        this.blogsSubjectSubscription = this.route.paramMap
            .pipe(switchMap((params: ParamMap) => this.blogsService.getBlogs(params.get('id'))))
            .subscribe(blogs => (this.blogs = blogs));
    }

    ngOnDestroy() {
        this.blogsSubjectSubscription.unsubscribe();
    }
}

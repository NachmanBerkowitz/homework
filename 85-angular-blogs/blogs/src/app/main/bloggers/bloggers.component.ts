import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BloggersService } from 'src/app/bloggers.service';

@Component({
    selector: 'app-bloggers',
    templateUrl: './bloggers.component.html',
    styleUrls: ['./bloggers.component.css'],
    })
export class BloggersComponent implements OnInit, OnDestroy {
    constructor(private bloggersService: BloggersService) {}
    bloggers: any[];
    bloggersSubjectSubscription: Subscription;

    ngOnInit() {
        this.bloggersSubjectSubscription = this.bloggersService
            .getBloggers()
            .subscribe(bloggers => (this.bloggers = bloggers));
    }

    ngOnDestroy() {
        this.bloggersSubjectSubscription.unsubscribe();
    }
}

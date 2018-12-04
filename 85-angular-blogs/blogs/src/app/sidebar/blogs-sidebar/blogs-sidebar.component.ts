import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BloggersService } from './../../bloggers.service';
import { BlogsService } from './../../blogs.service';
import { Subscription } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
    selector: 'app-blogs-sidebar',
    templateUrl: './blogs-sidebar.component.html',
    styleUrls: ['./blogs-sidebar.component.css'],
    })
export class BlogsSidebarComponent implements OnInit, OnDestroy {
    constructor(
        private route: ActivatedRoute,
        private bloggersService: BloggersService,
        private blogsService: BlogsService,
    ) {}
    blogger;
    id;
    bloggersSubjectSubscription: Subscription;
    ngOnInit() {
        this.bloggersSubjectSubscription = this.route.paramMap
            .pipe(
                switchMap((params: ParamMap) =>
                    this.bloggersService
                        .getBloggers()
                        .pipe(map(bloggers => bloggers.find(blogger => blogger.id === +params.get('id')))),
                ),
            )
            .subscribe(blogger => {
                this.blogger = blogger;
            });
    }

    ngOnDestroy() {
        this.bloggersSubjectSubscription.unsubscribe();
    }
}

import { Component, OnInit, Input } from '@angular/core';
import { CommentsService } from '../comments.service';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css'],
    })
export class CommentsComponent implements OnInit {
    constructor(private commentsService: CommentsService) {}

    @Input()
    blogId;

    comments: any[];

    ngOnInit() {
        this.commentsService.getComments(this.blogId).subscribe(comments => (this.comments = comments));
    }
}

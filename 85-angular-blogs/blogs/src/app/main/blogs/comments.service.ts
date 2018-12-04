import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
    })
export class CommentsService {
    constructor(private httpClient: HttpClient) {}

    getComments(id) {
        return this.httpClient.get<any[]>(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
    }
}

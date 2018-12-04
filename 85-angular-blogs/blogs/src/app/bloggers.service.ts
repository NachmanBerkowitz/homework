import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
    })
export class BloggersService {
    constructor(private httpClient: HttpClient) {}
    fetchedOnce: boolean = false;
    bloggersSubject = new BehaviorSubject([]);

    getBloggers() {
        if (!this.fetchedOnce) {
            this.httpClient.get<any[]>('https://jsonplaceholder.typicode.com/users').subscribe(blogs => {
                this.fetchedOnce = true;
                this.bloggersSubject.next(blogs);
            });
        }
        return this.bloggersSubject;
    }
}

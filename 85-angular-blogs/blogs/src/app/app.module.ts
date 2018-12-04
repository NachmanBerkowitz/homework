import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BloggersComponent } from './main/bloggers/bloggers.component';
import { BloggerComponent } from './main/bloggers/blogger/blogger.component';
import { BlogsComponent } from './main/blogs/blogs.component';
import { BlogComponent } from './main/blogs/blog/blog.component';
import { BloggersSidebarComponent } from './sidebar/bloggers-sidebar/bloggers-sidebar.component';
import { MissionStatementComponent } from './mission-statement/mission-statement.component';
import { BlogsSidebarComponent } from './sidebar/blogs-sidebar/blogs-sidebar.component';
import { CommentsComponent } from './main/blogs/comments/comments.component';
import { CommentComponent } from './main/blogs/comments/comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    SidebarComponent,
    BloggersComponent,
    BloggerComponent,
    BlogsComponent,
    BlogComponent,
    BloggersSidebarComponent,
    MissionStatementComponent,
    BlogsSidebarComponent,
    CommentsComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

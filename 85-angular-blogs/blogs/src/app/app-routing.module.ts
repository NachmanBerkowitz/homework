import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BloggersComponent } from './main/bloggers/bloggers.component';
import { BlogsComponent } from './main/blogs/blogs.component';
import { BloggersSidebarComponent } from './sidebar/bloggers-sidebar/bloggers-sidebar.component';
import { BlogsSidebarComponent } from './sidebar/blogs-sidebar/blogs-sidebar.component';

const routes: Routes = [
    {
        path: 'bloggers',
        children: [
            { path: '', outlet: 'primary', component: BloggersComponent },
            { path: '', outlet: 'sidebar', component: BloggersSidebarComponent },
        ],
    },
    {
        path: 'blogs/:id',
        children: [
            { path: '', outlet: 'primary', component: BlogsComponent },
            { path: '', outlet: 'sidebar', component: BlogsSidebarComponent },
        ],
    },
    { path: '', redirectTo: '/bloggers', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    })
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllPostsComponent } from './views/all-posts/all-posts.component';
import { PostDetailsComponent } from './views/post-details/post-details.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommentComponent } from './components/comment/comment.component';
import { PostComponent } from './components/post/post.component';
import { UserProfileComponent } from './views/user-profile/user-profile.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { AllUsersComponent } from './views/all-users/all-users.component';
@NgModule({
  declarations: [AppComponent, AllPostsComponent, PostDetailsComponent, CommentComponent, PostComponent, UserProfileComponent, NotFoundComponent, AllUsersComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PaginationModule.forRoot(),
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

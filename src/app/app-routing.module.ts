import { PostDetailsComponent } from './views/post-details/post-details.component';
import { UserProfileComponent } from './views/user-profile/user-profile.component';
import { AllPostsComponent } from './views/all-posts/all-posts.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'posts', component: AllPostsComponent },
  { path: 'post/details/:postId', component: PostDetailsComponent },
  { path: 'user/:userId', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

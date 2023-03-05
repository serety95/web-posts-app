import { AllUsersComponent } from './views/all-users/all-users.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { PostDetailsComponent } from './views/post-details/post-details.component';
import { UserProfileComponent } from './views/user-profile/user-profile.component';
import { AllPostsComponent } from './views/all-posts/all-posts.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: AllPostsComponent },
  { path: 'post/details/:postId', component: PostDetailsComponent },
  {
    path: 'users',
    children: [
      { path: '', component: AllUsersComponent },
      { path: ':userId', component: UserProfileComponent },
    ],
  },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

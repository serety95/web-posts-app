import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { UserModel } from './../../models/user-model';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss'],
})
export class AllUsersComponent implements OnInit {
  usersList: UserModel[] = [];
  activeUser: number = 0;
  constructor(
    private userService: UserService,

    private router: Router
  ) {
    // this.router.events
    //   .pipe(
    //     filter(
    //       (e) =>
    //         e instanceof ActivationEnd &&
    //         Object.keys(e.snapshot.params).length > 0
    //     ),
    //     map((e) => (e instanceof ActivationEnd ? e.snapshot.params : {}))
    //   )
    //   .subscribe((params) => {
    //     console.log(params);
    //     this.activeUser = params['userId'];
    //     // Do whatever you want here!!!!
    //   });
  }

  ngOnInit(): void {
    if (this.userService.usersList.value.length < 1) {
      this.getUsers();
    } else {
      this.usersList = [...this.userService.usersList.value];
    }
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (res) => {
        this.usersList = Object.values(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getAvatarLink(userId): string {
    if (userId > 8) {
      return `https://bootdey.com/img/Content/avatar/avatar8.png`;
    } else {
      return `https://bootdey.com/img/Content/avatar/avatar${userId}.png`;
    }
  }
}

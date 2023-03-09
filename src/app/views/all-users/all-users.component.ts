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
    this.userService.getUsersData();
    this.usersList=this.userService.usersList.value
    // this.getUsers();
  }
  
  // getUsers() {
  //   this.userService.getUsers().subscribe(
  //     (res) => {
  //       console.log('users', res);
  //       this.usersList = Object.values(res);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }
}

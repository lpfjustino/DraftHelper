import { Component, OnInit }        from '@angular/core';

import { User }                     from '../_models/index';
import { UserService }              from '../_services/index';

import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: 'summoner-info.component.html',
    styleUrls: [ 'summoner-info.component.css' ]
})

export class SummonerInfoComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService,
                private router: Router,) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    onLogout() {
        this.router.navigate([{ outlets: { authOutlet: 'auth/login' }}]);
    }
}
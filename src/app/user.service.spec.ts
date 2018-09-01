import { TestBed, inject } from '@angular/core/testing';
import { UserService } from './user.service';

describe(`DemoService`, ()=>{
    beforeEach(()=>{
        TestBed.configureTestingModule({
           providers:[
               UserService
           ]
        });
    });
    var s;
    beforeAll(inject([UserService], (service: UserService)=>{
        s=service;
    }));

    it(`checking getUserLoggedIn`,()=>{
        expect(s.getUserLoggedIn()).toEqual(false)
    });

    it( `Checking is logged in`, ()=>{
        expect(s.isUserLoggedIn).toEqual(false);
    })

    it( `LogOut Function`, ()=>{
        expect(s.logOut()).toBeTruthy;
    });
})
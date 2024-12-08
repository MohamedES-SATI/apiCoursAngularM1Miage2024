import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public users = [
    { username: 'simo', password: 'simo', role: 'user' },
    { username: 'admin', password: 'admin', role: 'admin' },

  ];
  

  loggedIn = false;
  currentUser: any;


  logIn(username: string, password: string) {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.loggedIn = true;
      this.currentUser = user;
      return true;
    }
    return false;
  }

  logOut(){
    this.loggedIn = false;
  } 

  isLogged(): boolean {
    return this.loggedIn;
  }
  
  isAdmin(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (this.currentUser && this.currentUser.role === 'admin') {
      resolve(true);
    } else {
      reject(false);
    }
  });
}


  constructor() {
    this.loggedIn = false;
   }
}

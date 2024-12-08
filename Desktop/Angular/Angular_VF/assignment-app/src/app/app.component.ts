import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon'; 
import { AssignmentsComponent } from './assignments/assignments.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AssignmentsService } from './shared/assignments.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,  
    AssignmentsComponent,
    RouterOutlet,
    RouterLink,
    MatSlideToggleModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor (private authService:AuthService, private router:Router,private assignmentsService: AssignmentsService ){
    this.peuplerBD(); 
  }
  login(){
    if(!this.authService.loggedIn){
      this.authService.isLogged();
      console.log("Connecté");
    }else{
      this.authService.logOut();
      this.router.navigate(['/home']);
      console.log("De-Connecté");

    }
  }

  isAdmin(){
    return this.authService.isAdmin();
  }

  peuplerBD() {
    console.log("Appel de peuplerBD");
    this.assignmentsService.peuplerBD();
  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Assignment } from '../assignment.model';
import { Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { AssignmentsService } from '../../shared/assignments.service';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule} from '@angular/router';
import { AuthService } from '../../shared/auth.service';


@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [  CommonModule, MatCardModule, MatCheckboxModule, MatIcon, MatButtonModule, RouterModule],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent implements OnInit{
/*@Input()*/ assignmentTransmis :Assignment | undefined;

@Output() deleteAssignment = new EventEmitter<Assignment>();


  constructor(private assignmentsService: AssignmentsService,
              private route: ActivatedRoute,
              private router:Router,         
              private authService: AuthService
            ){}
  ngOnInit(): void {
      this.getAssignment();
  }

getAssignment(){
  const id = +this.route.snapshot.params['id'];
  this.assignmentsService.getAssignment(id)
      .subscribe(assignment => this.assignmentTransmis = assignment);
}  
onAssignmentRendu(){
  if(this.assignmentTransmis){
    this.assignmentTransmis.rendu = true ;
    this.assignmentsService.updateAssignment(this.assignmentTransmis)
      .subscribe(message => {console.log(message)
        this.router.navigate(["/home"]);});

      
  }
}
deleteElem() {
  this.deleteAssignment.emit(this.assignmentTransmis);
}
 onDelete(){
  if(this.assignmentTransmis){
  this.assignmentsService.deleteAssignment(this.assignmentTransmis)
  .subscribe((message) =>{console.log(message)
    this.router.navigate(["/home"]);} );
  
  
  }
 }
 onClickEdit(){
  if (this.assignmentTransmis) {
    this.router.navigate(["/assignment", this.assignmentTransmis.id, 'edit'], 
      {queryParams: {nom: this.assignmentTransmis.nom}, fragment: 'edition'}
    );
  }
 }

 isAdmin(): boolean {

  return this.authService.loggedIn;
 }
}

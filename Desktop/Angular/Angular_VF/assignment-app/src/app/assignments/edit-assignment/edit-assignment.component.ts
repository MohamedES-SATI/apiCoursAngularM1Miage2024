import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-edit-assignment',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    CommonModule,
    MatNativeDateModule
    

  ],
  templateUrl: './edit-assignment.component.html',
  styleUrl: './edit-assignment.component.css'
})
export class EditAssignmentComponent implements OnInit {
  assignment: Assignment | undefined;
  assignmentTransmis :Assignment | undefined;
  //pour les champs de formulaire 
  nomAssignment = '';
  dateRendu?: Date = undefined;

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private route: ActivatedRoute
  ){}
  ngOnInit(): void {
    this.getAssignment();

    console.log("Query Params :");
    console.log(this.route.snapshot.queryParams);
    console.log("Fragment :");
    console.log(this.route.snapshot.fragment);
  }

  getAssignment(){
    const id = +this.route.snapshot.params['id'];
    //this.assignmentsService.getAssignment(id)
      //  .subscribe(assignment => this.assignmentTransmis = assignment);
      this.assignmentsService.getAssignment(id).subscribe((assignment) => {
        if (!assignment) return;
        this.assignment = assignment;
        this.nomAssignment = assignment.nom;
        this.dateRendu = assignment.dateRendu;
      });
    } 


  onSaveAssignment(){
    if (!this.assignment) return; 
    if (this.nomAssignment == '' || this.dateRendu == undefined)
      return;

    this.assignment.nom = this.nomAssignment;
    this.assignment.dateRendu = this.dateRendu ;
    this.assignmentsService
    .updateAssignment(this.assignment)
    .subscribe(message => {
      console.log(message); 

      this.router.navigate(['/home']);
    })
  }

}

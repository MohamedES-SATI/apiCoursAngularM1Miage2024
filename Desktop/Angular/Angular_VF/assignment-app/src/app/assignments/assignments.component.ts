import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenduDirective } from '../shared/rendu.directive';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { AssignmentDetailComponent } from "./assignment-detail/assignment-detail.component";
import { MatListModule } from '@angular/material/list';
import { MatPaginator } from '@angular/material/paginator';
import { Assignment } from './assignment.model';
import { AddAssignmentComponent } from "./add-assignment/add-assignment.component";
import { AssignmentsService } from '../shared/assignments.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [
    CommonModule,
    RenduDirective,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    AssignmentDetailComponent,
    MatListModule,
    AddAssignmentComponent,

    RouterLink
],
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  titre = "Mon application sur les Assignments !";
  ajoutActive = false;
  nomDevoir: string = "";
  dateRendu: Date | null = null; // Déclare la variable pour la date de rendu
  assignmentSelectionne!: Assignment;
  assignments: Assignment[] = [];
  formVisible = false ;
  

  page = 1;
  limit = 10;
  totalDocs !:number;
  totalPages !:number;
  nextPage !:number;
  prevPage !:number;
  hasPrevPage !:boolean;
  hasNextPage !:boolean;
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor (private AssignmentsService:AssignmentsService){}
  ngOnInit(): void {
    setTimeout(() => {
      this.ajoutActive = true;
    }, 2000);
    //this.assignments = this.AssignmentsService.getAssignments();
    //this.getAssignments();

    this.AssignmentsService.getAssignmentsPagine(this.page, this.limit)
    .subscribe(
      data => {
      this.assignments = data.docs;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.nextPage = data.nextPage;
      this.prevPage = data.prevPage;
      this.hasPrevPage = data.hasPrevPage;
      this.hasNextPage = data.hasNextPage;
      console.log("Données reçues");
    
    });
    this.loadAssignments();
  }

  
/*
  onNouvelAssignment(event:Assignment){
    //this.assignments.push(event);
    this.AssignmentsService.addAssignment(event)
      .subscribe(message => console.log(message));
    this.formVisible = false ;
  }*/
  
    goToPage(page: number): void {
      if (page < 1 || page > this.totalPages) return;
    
      this.page = page;
      this.loadAssignments();
    }
    
    loadAssignments(): void {
      this.AssignmentsService.getAssignmentsPagine(this.page, this.limit)
        .subscribe(data => {
          this.assignments = data.docs;
          this.totalDocs = data.totalDocs;
          this.totalPages = data.totalPages;
          this.nextPage = data.nextPage;
          this.prevPage = data.prevPage;
          this.hasPrevPage = data.hasPrevPage;
          this.hasNextPage = data.hasNextPage;
        });
    }
    
   
    
  
  onDeleteAssignment(assignment: Assignment) {
    this.assignments = this.assignments.filter(a => a !== assignment);
    this.assignmentSelectionne = null!;
  }
  
  onAddAssignmentBtnClick () {
    //this.formVisible = true ; 
  }
  assignmentClique(assignment: Assignment ) {
    this.assignmentSelectionne = assignment;
  }
  getAssignments(){
    this.AssignmentsService.getAssignments()
    .subscribe(assignments =>this.assignments = assignments)
  }
  
  
}


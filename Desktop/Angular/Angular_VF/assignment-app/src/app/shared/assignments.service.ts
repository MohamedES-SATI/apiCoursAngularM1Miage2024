import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import {  forkJoin, Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { bdInitialAssignments } from './data';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  private HttpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  };
  /*titre = "Mon application sur les Assignments !";
  ajoutActive = false;
  id!: number;
  nomDevoir: string = "";
  dateRendu: Date | null = null; // Déclare la variable pour la date de rendu
  assignmentSelectionne!: Assignment;
  
  formVisible = false ;*/

  /*assignments:Assignment[] = [
    { id:1, 
      nom: 'Devoir Angular', 
      dateRendu: new Date('2023-09-20'), 
      rendu: true 
    },
    { id:2, 
      nom: 'Devoir TypeScript', 
      dateRendu: new Date('2023-09-22'), 
      rendu: false 
    }
  ];*/

  /**httpClient */
  url = 'http://localhost:8010/api/assignments';
  constructor(private loggingService:LoggingService,private http:HttpClient,private router: Router) { }
  getAssignments():Observable<Assignment[]>{return this.http.get<Assignment[]>(this.url);} 
  getAssignment(id: number): Observable<Assignment> {
    return this.http.get<Assignment>(this.url + '/' + id).pipe(map(a => {a.nom +=' transforme avec un pipe ...'; return a;}),
    tap(_ => console.log("getAssignment id="+id+"requete GET envoyee sur MongoDb")),
    catchError(this.handleError<Assignment>('getAssignment id=${id}'))
  );
  }  

peuplerBDavecForkJoin():Observable<any>{
  let appelsVersAddAssignment: Observable<any>[] = [];

  bdInitialAssignments.forEach(a => {
  const nouvelAssignment = new Assignment();
  nouvelAssignment.id = a.id;
  nouvelAssignment.nom = a.nom;
  nouvelAssignment.dateRendu = new Date(a.dateRendu);
  nouvelAssignment.rendu = a.rendu;

    appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
  });

  return forkJoin(appelsVersAddAssignment);
}
  
peuplerBD(){
  this.peuplerBDavecForkJoin()
.subscribe(() => {
  console.log("LA BD A ÉTÉ PEUPLÉE, TOUS LES ASSIGNMENTS AJOUTÉS");

  // Actualiser la vue
  this.router.navigate(["/home"], { replaceUrl: true });
});
}

  getAssignmentsPagine(page:number, limit:number):Observable<any>{
    return this.http.get<Assignment[]>(this.url+'?page='+page+'&limit='+limit);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    return this.http.put<Assignment>(this.url, assignment);
  }
 
  deleteAssignment(assignment: Assignment): Observable<any> {
    let deleteUrl = `${this.url}/${assignment._id}`;
    return this.http.delete<Assignment>(deleteUrl);
  }
 
  addAssignment(assignment: Assignment): Observable<any> {
    return this.http.post<Assignment>(this.url, assignment,this.HttpOptions);
  }
 
 private handleError<T>(operation :any, result?: T) {
  return (error:any):Observable<T> => {
    console.log(error);
    console.log(operation+'echoue'+error.message);
    return of(result as T);
  }
 }
 
  /*onSubmit() {
    console.log(this.nomDevoir, this.dateRendu); // Affiche le nom et la date
    // Ajoute la logique pour ajouter l'assignement à la liste
    if (this.nomDevoir && this.dateRendu) {
      this.assignments.push({
        id:this.id,
        nom: this.nomDevoir,
        dateRendu: this.dateRendu,
        rendu: false // par défaut non rendu
      });

      // Réinitialiser le formulaire
      this.nomDevoir = '';
      this.dateRendu = null;
    }
  }*/
  

 /* assignmentClique(assignment: Assignment ) {
    this.assignmentSelectionne = assignment;
  }*/

  /*onAddAssignmentBtnClick () {
    this.formVisible = true ; 
  }*/

  /*onNouvelAssignment(event:Assignment){
    this.assignments.push(event);
    this.formVisible = false ;
  }*/
  
  /*onDeleteAssignment(assignment: Assignment) {
    this.assignments = this.assignments.filter(a => a !== assignment);
    this.assignmentSelectionne = null!;
    return of("Assignment service: assignment supprimé")
  
  }*/
  
  /*updateAssignment(assignment:Assignment):Observable<string>{
    return of ("Assignmentservice: assignment modifié !")
  }*/

  /*constructor(private loggingService:LoggingService) { }

  getAssignments():Observable<Assignment[]>{
    return of(this.assignments);
  }

  addAssignment(assignment: Assignment): Observable<string>{
    this.assignments.push(assignment);
    this.loggingService.log(assignment.nom,"ajouté");

    return of ('Assignment ajouté')
  }

  deleteAssignment(assignment:Assignment): Observable<string>{
    let pos = this.assignments.indexOf(assignment);
    this.assignments.splice(pos,1);

    return of("Assignment service: assignment supprimé")
  }
  getAssignment(id:number):Observable<Assignment|undefined>{
    const a:Assignment| undefined = this.assignments.find(a => a.id === id);
    return of(a);
  }*/
  
}

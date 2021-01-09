import { Injectable } from '@angular/core';
import { Movie } from './../models/movie.class';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { Subscription } from 'rxjs/Subscription';
//ngrx store
import { Store } from '@ngrx/store';
import { AppState } from '../state/moives.state';
import * as Actions from '../action/movies.actions';
//ngrx effects
import { delay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
const baseUrl = 'http://localhost:8081/api/film';
@Injectable({
  providedIn: 'root'  
  //Angular creates a single, shared instance of loogingService and injects it into any class that asks for it
  //The service will be available application wide as a singleton with no need to add it to a module's providers array 
})
export class LogingService {
  public idx: number;
  public subscription: Subscription;
  movies: Movie[];
  movie: Movie;
  constructor(
    public http: HttpClient,
    private store: Store<AppState>,
    public activatedRoute: ActivatedRoute
  ) { console.log(activatedRoute) }

  passMovies() {
    console.log('test')
    return this.movies;
  }
  getMoviesFromServer(): Observable<{}> {
    return this.http.get(baseUrl)
  }
  getOnePage(no:number):Observable<{}>{
    return this.http.get(`${baseUrl}/${no}`)
  }
  addMovie(movie: Movie): Observable<{}> {
    return this.http.post(baseUrl,movie )
  }
  delMovie(id: string): Observable<{}> {
    return this.http.delete(`${baseUrl}/${id}`)
  }

  saveMovie(id: string, movie: Movie): Observable<{}> {
    return this.http.put(`${baseUrl}/${id}`, movie)
  }
  getMovieById(id: string) {
    return this.http.get(`${baseUrl}/${id}`)
  }
  getId() {
    return this.activatedRoute.params;
  }
  //------------
  ngAddMovie(movie: Movie) {
    this.store.dispatch(new Actions.AddMovie(movie));//
  }
  ngSaveMovie(movie: Movie) {
    this.store.dispatch(new Actions.SaveMovie(movie));
  }
  ngLoadMovie() {
    this.store.dispatch(new Actions.LoadMovie());
  }
  ngLoadOnePage(no:number){
    this.store.dispatch(new Actions.LoadOnePage(no));
  }
  ngDelMovie(id: string) {
    this.store.dispatch(new Actions.RemoveMovie(id));
  }
 
  ngGetMovies(): Observable<Movie[]> {
    return this.store.select('movie');
  }
  // handlReq(page, id){
  //   let type:number;
  //   this.store.select('movie').subscribe(data => {
  //     this.movies = data['list'];
      
  //   for(let i in this.movies){
  //     if(this.movies[i]._id===id){
  //       if(+i<5&&page==2){
  //           return 2;
  //       }
  //       else if(+i>=5&&page==1){
  //         return 1;
  //       }
  //     }
  //   }
  //   console.log(`type = ${type}, page = ${page}, id = ${id}`)
    
  //   });
    //return type;
  // }
}

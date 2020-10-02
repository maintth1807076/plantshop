import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const token = localStorage.getItem('user');
@Injectable({
  providedIn: 'root'
})
export class TreeService {
  private apiServer = 'http://localhost:8080';

  private options = {headers: new HttpHeaders().set('Authorization', token)};

  constructor( private http: HttpClient) { }

  getAllTree() {

    return this.http.get(this.apiServer + '/api/trees', this.options);
  }

  loadCategory() {

    return this.http.get(this.apiServer + '/api/categories', this.options);
  }
  getTreeService(id) {
    return this.http.get(this.apiServer + '/api/trees/' + id, this.options);
  }
  addTree(data) {
    return this.http.post(this.apiServer + '/api/trees', data, this.options);
  }
  updateTree(id, data) {
    return this.http.put(this.apiServer + '/api/trees/' + id, data, this.options);
  }
  deleteTree(id) {
    return this.http.delete(this.apiServer + '/api/trees/' + id, this.options);
  }

  doLogin(data){
    return this.http.post(this.apiServer + '/auth/login', data);
  }
  doRegister(data){
    return this.http.post(this.apiServer + '/auth/register', data);
  }
}


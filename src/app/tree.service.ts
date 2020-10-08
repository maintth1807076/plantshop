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
  getAllCategory() {
    return this.http.get(this.apiServer + '/api/categories', this.options);
  }

  getCategory(id) {
    return this.http.get(this.apiServer + '/api/categories/' + id, this.options);
  }
  addCategory(data) {
    return this.http.post(this.apiServer + '/api/categories', data, this.options);
  }
  updateCategory(id, data) {
    return this.http.put(this.apiServer + '/api/categories/' + id, data, this.options);
  }
  deleteCategory(id) {
    return this.http.delete(this.apiServer + '/api/categories/' + id, this.options);
  }

  getAllTree() {

    return this.http.get(this.apiServer + '/api/trees', this.options);
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
  getUser(id) {
    return this.http.get(this.apiServer + '/api/users/' + id, this.options);
  }
  updateUser(id, data){
    return this.http.put(this.apiServer + '/api/users/' + id, data, this.options);
  }
  getAllUser() {

    return this.http.get(this.apiServer + '/api/users', this.options);
  }

}


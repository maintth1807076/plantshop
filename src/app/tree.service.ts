import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TreeService {
  private apiServer = 'http://localhost:8080';

  private options;

  constructor( private http: HttpClient) {
    let userLocal = localStorage.getItem('user');
    if (userLocal != null){
      let user = JSON.parse(userLocal);
      this.options = {headers: new HttpHeaders().set('Authorization', user['token'])};
    }
  }
  getAllCategory() {
    return this.http.get(this.apiServer + '/categories', this.options);
  }

  getCategory(id) {
    return this.http.get(this.apiServer + '/categories/' + id, this.options);
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
    return this.http.get(this.apiServer + '/trees', this.options);
  }
  getAllTreeByUserId(userId) {
    return this.http.get(this.apiServer + '/trees/findTreeByUser/' + userId, this.options);
  }
  getAllTreeByCategoryId(categoryId) {
    return this.http.get(this.apiServer + '/trees/findTreeByCategory/' + categoryId);
  }
  getTreeService(id) {
    return this.http.get(this.apiServer + '/trees/' + id, this.options);
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
  doLogout(){
    return this.http.get(this.apiServer + '/auth/logout', this.options)
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
  addOrder(data) {
    return this.http.post(this.apiServer + '/api/orders', data, this.options);
  }
  updateOrder(id) {
    return this.http.get(this.apiServer + '/api/orders/paidOrder/' + id, this.options);
  }
  getOrderByUserId(id) {
    return this.http.get(this.apiServer + '/api/orders/findOrderByUser/' + id, this.options);
  }
  getOrderBySellerId(id) {
    return this.http.get(this.apiServer + '/api/orders/findOrderBySeller/' + id, this.options);
  }
  confirmOrder(id) {
    return this.http.get(this.apiServer + '/api/orders/confirmOrder/' + id, this.options);
  }
}


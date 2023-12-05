import { Injectable } from '@angular/core';
import { Http, HttpResponse } from '@capacitor-community/http';
import { StorageService } from '../storage/storage.service';
import { CapacitorHttp } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  baseUrl:string = "http://127.0.0.1:8000/api";

  constructor(
    private storage: StorageService,
  ) {}

  async postLogin(credentials:any) {
    const data = { username: credentials.username, password: credentials.password };

    const options = {
      url: this.baseUrl + "/login",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      data: data,
    };

    const response: HttpResponse = await CapacitorHttp.post(options);

    return response.data
  }

  async postRegister(credentials:any) {
    const data = { email: credentials.email, password: credentials.password, username: credentials.username, phone: credentials.phone, userType: credentials.userType };

    const options = {
      url: this.baseUrl + "/register",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      data: data,
    };

    const response: HttpResponse = await CapacitorHttp.post(options);

    return response.data
  }

  async getDashboardData(id:any) {
    const token = await this.storage.get('token')
    const data = { id: id };

    const options = {
      url: this.baseUrl + "/dashboard",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : 'Bearer ' + token },
      data: data,
    };

    const response: HttpResponse = await CapacitorHttp.post(options);

    return response.data
  }

  async getBudget(id:any, type:any = null) {
    const token = await this.storage.get('token')
    const data = { user_id: id, type: type };

    const options = {
      url: this.baseUrl + "/budget/get",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : 'Bearer ' + token },
      data: data,
    };

    const response: HttpResponse = await CapacitorHttp.post(options);

    return response.data
  }

  async postBudget(id:any, type:any = null, value:any) {
    const token = await this.storage.get('token')
    const data = { user_id: id, type: type, value: value };

    const options = {
      url: this.baseUrl + "/budget/post",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : 'Bearer ' + token },
      data: data,
    };

    const response: HttpResponse = await CapacitorHttp.post(options);

    return response.data
  }

  async postPNToken(pnToken:any, id:any) {
    const data = { pnToken: pnToken, id: id };
    const token = await this.storage.get('token')

    const options = {
      url: this.baseUrl + "/user/pnToken",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : 'Bearer ' + token },
      data: data,
    };

    const response: HttpResponse = await CapacitorHttp.post(options);

    return response.data
  }

  async postNotifications(msg:any, id:any) {
    const data = { msg: msg, id: id };
    const token = await this.storage.get('token')

    const options = {
      url: this.baseUrl + "/notifications/post",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : 'Bearer ' + token },
      data: data,
    };

    const response: HttpResponse = await CapacitorHttp.post(options);

    return response.data
  }

  async getNotifications(id:any) {
    const data = { id: id };
    const token = await this.storage.get('token')

    const options = {
      url: this.baseUrl + "/notifications/get",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : 'Bearer ' + token },
      data: data,
    };

    const response: HttpResponse = await CapacitorHttp.post(options);

    return response.data
  }

  async deleteNotifications(id:any, noti_id:any) {
    const data = { id: id, noti_id: noti_id };
    const token = await this.storage.get('token')

    const options = {
      url: this.baseUrl + "/notifications/delete",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : 'Bearer ' + token },
      data: data,
    };

    const response: HttpResponse = await CapacitorHttp.post(options);

    return response.data
  }

  async updateUser(data:any) {
    const token = await this.storage.get('token')

    const options = {
      url: this.baseUrl + "/user/update",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : 'Bearer ' + token },
      data: data,
    };

    const response: HttpResponse = await CapacitorHttp.post(options);

    return response.data
  }

  async getUsers() {
    const token = await this.storage.get('token')
    const data = {}
    const options = {
      url: this.baseUrl + "/user/all",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : 'Bearer ' + token },
      data: data,
    };

    const response: HttpResponse = await CapacitorHttp.post(options);

    return response.data
  }

  async notifyUser(tokens:any) {
    const token = await this.storage.get('token')
    const data = { tokens: tokens }
    const options = {
      url: this.baseUrl + "/notifications/simulate",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : 'Bearer ' + token },
      data: data,
    };

    const response: HttpResponse = await CapacitorHttp.post(options);

    return response.data
  }

  async getUsageHistory(id:any,) {
    const token = await this.storage.get('token')
    const data = { id: id }
    const options = {
      url: this.baseUrl + "/usage/history",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : 'Bearer ' + token },
      data: data,
    };

    const response: HttpResponse = await CapacitorHttp.post(options);

    return response.data
  }

  async postForget(data:any) {
    const token = await this.storage.get('token')
    const options = {
      url: this.baseUrl + "/user/forget",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      data: data,
    };

    const response: HttpResponse = await CapacitorHttp.post(options);

    return response.data
  }

  async postOTP(data:any) {
    const token = await this.storage.get('token')
    const options = {
      url: this.baseUrl + "/user/forget/otp",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      data: data,
    };

    const response: HttpResponse = await CapacitorHttp.post(options);

    return response.data
  }

  async postChangePassword(data:any) {
    const token = await this.storage.get('token')
    const options = {
      url: this.baseUrl + "/user/forget/changePassword",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      data: data,
    };

    const response: HttpResponse = await CapacitorHttp.post(options);

    return response.data
  }
}

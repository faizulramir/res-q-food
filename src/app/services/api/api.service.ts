import { Injectable } from '@angular/core';
import { Http, HttpResponse } from '@capacitor-community/http';
import { StorageService } from '../storage/storage.service';
import { CapacitorHttp } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  baseUrl:string = "https://resq.fzlxtech.my/api"; //dev

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
    const data = { email: credentials.email, password: credentials.password, username: credentials.username, phone: credentials.phone, userType: credentials.userType, registration_number: credentials.registrationNumber };

    const options = {
      url: this.baseUrl + "/register",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
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

  async postNotifications(msg:any, multi:any, id:any) {
    const data = { msg: msg, multi: multi, id: id };
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

  async updatePic(data:any) {
    const token = await this.storage.get('token')

    const options = {
      url: this.baseUrl + "/user/update/pic",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : 'Bearer ' + token },
      data: data,
    };

    const response: HttpResponse = await CapacitorHttp.post(options);

    return response.data
  }

  async getUser(data:any) {
    const token = await this.storage.get('token')
    const options = {
      url: this.baseUrl + "/user/get",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : 'Bearer ' + token },
      data: data,
    };

    const response: HttpResponse = await CapacitorHttp.post(options);

    return response.data
  }

  async getUsersOnline() {
    const token = await this.storage.get('token')
    const options = {
      url: this.baseUrl + "/users/online",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : 'Bearer ' + token },
      data: {},
    };

    const response: HttpResponse = await CapacitorHttp.post(options);

    return response.data
  }

  async notifyUsers(title:any, id:any) {
    const token = await this.storage.get('token')
    const data = { title: title, id: id }
    const options = {
      url: this.baseUrl + "/notifications/send/all",
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

  async postFood(data:any) {
    const token = await this.storage.get('token')

    const options = {
      url: this.baseUrl + "/food/post",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : 'Bearer ' + token },
      data: data,
    };

    const response: HttpResponse = await CapacitorHttp.post(options);

    return response.data
  }

  async getFood(data:any) {
    const token = await this.storage.get('token')

    const options = {
      url: this.baseUrl + "/food/get",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : 'Bearer ' + token },
      data: data,
    };

    const response: HttpResponse = await CapacitorHttp.post(options);

    return response.data
  }

  async acceptFood(data:any) {
    const token = await this.storage.get('token')

    const options = {
      url: this.baseUrl + "/food/accept",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : 'Bearer ' + token },
      data: data,
    };

    const response: HttpResponse = await CapacitorHttp.post(options);

    return response.data
  }

  async postRoom(data:any) {
    const token = await this.storage.get('token')

    const options = {
      url: this.baseUrl + "/room/post",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : 'Bearer ' + token },
      data: data,
    };

    const response: HttpResponse = await CapacitorHttp.post(options);

    return response.data
  }

  async getRoom(data:any) {
    const token = await this.storage.get('token')

    const options = {
      url: this.baseUrl + "/room/get",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : 'Bearer ' + token },
      data: data,
    };

    const response: HttpResponse = await CapacitorHttp.post(options);

    return response.data
  }

  async postChat(data:any) {
    const token = await this.storage.get('token')

    const options = {
      url: this.baseUrl + "/chat/post",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : 'Bearer ' + token },
      data: data,
    };

    const response: HttpResponse = await CapacitorHttp.post(options);

    return response.data
  }

  async getChat(data:any) {
    const token = await this.storage.get('token')

    const options = {
      url: this.baseUrl + "/chat/get",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : 'Bearer ' + token },
      data: data,
    };

    const response: HttpResponse = await CapacitorHttp.post(options);

    return response.data
  }

  async getAddress(data:any) {
    console.log(data)
    const options = {
      url: `https://nominatim.openstreetmap.org/reverse?lat=${data.lat}&lon=${data.lon}&format=json`,
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    };

    const response: HttpResponse = await CapacitorHttp.get(options);

    return response.data
  }

  
}

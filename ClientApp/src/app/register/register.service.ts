import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRegisterDTO } from '../interfaces/register-DTO.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient) {
  }

  register(dto: IRegisterDTO) {
    return this.http.post('User/Register', dto);
  }
}

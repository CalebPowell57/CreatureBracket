import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IVerifyAccountDTO } from '../interfaces/verifyAccountDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class VerifyAccountService {
  constructor(private http: HttpClient) {
  }

  verify(dto: IVerifyAccountDTO) {
    let response = this.http.post('User/Verify', dto);

    return response;
  }
}

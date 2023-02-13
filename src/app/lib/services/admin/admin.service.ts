import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IEntityCount} from "../../interfaces/ientity-count";


const apiUrl = `${environment.apiUrl}/admin`;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  /**
   * It returns an Observable of type IEntityCount
   * @returns An observable of type IEntityCount
   */
  retrieveEntityCounts(): Observable<IEntityCount> {
    return this.http.get<IEntityCount>(`${apiUrl}/entity-count`);
  }
}

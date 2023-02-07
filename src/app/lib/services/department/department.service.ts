import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {IDepartment, IDepartmentPayload, IPaginatedResponse, IPaginationParams} from "../../interfaces";
import {Observable} from "rxjs";

const apiUrl = `${environment.apiUrl}/departments`;

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) {
  }

  /**
   * It takes an object of type IDepartmentPayload, sends it to the server, and returns an object of type IDepartment
   * @param {IDepartmentPayload} group - IDepartmentPayload
   * @returns An observable of type IDepartment
   */
  createDepartment(group: IDepartmentPayload): Observable<IDepartment> {
    return this.http
      .post<IDepartment>(
        apiUrl + '/',
        group
      );
  }


  /**
   * It takes an object of type `IPaginationParams` as a parameter, and returns an observable of type
   * `IPaginatedResponse<IDepartment>`
   * @param {IPaginationParams} params - IPaginationParams
   * @returns An observable of type IPaginatedResponse<IDepartment>
   */
  retrieveDepartments(params: IPaginationParams): Observable<IPaginatedResponse<IDepartment>> {
    const queryParams = new HttpParams().set('order', params.order).set('page', params.page)
      .set('take', params.take)
    if (params?.q) queryParams.set('q', params.q)

    return this.http.get<IPaginatedResponse<IDepartment>>(apiUrl, {params: queryParams})
  }


  /**
   * It returns an Observable of type IDepartment
   * @param {string} id - string - The id of the department to be retrieved.
   * @returns An observable of type IDepartment
   */
  retrieveSingleDepartment(id: string): Observable<IDepartment> {
    return this.http.get<IDepartment>(`${apiUrl}/${id}`);
  }


  /**
   * It takes an id as a parameter, and returns an observable of type IDepartment
   * @param {string} id - string - The id of the department to be deleted.
   * @returns An observable of type IDepartment.
   */
  deleteSingleDepartment(id: string): Observable<IDepartment> {
    return this.http.delete<IDepartment>(`${apiUrl}/${id}`);
  }


  /**
   * This function takes an id and a group object as parameters, and returns an observable of type IDepartment
   * @param {string} id - string - The id of the department you want to update
   * @param {IDepartmentPayload} group - IDepartmentPayload
   * @returns An observable of type IDepartment
   */
  updateDepartment(id: string, group: IDepartmentPayload): Observable<IDepartment> {
    return this.http
      .patch<IDepartment>(
        `${apiUrl}/${id}`,
        group
      );
  }
}

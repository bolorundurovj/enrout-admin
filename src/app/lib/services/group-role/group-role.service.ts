import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {IGroupRole, IGroupRolePayload, IPaginatedResponse, IPaginationParams} from "../../interfaces";
import {Observable} from "rxjs";

const apiUrl = `${environment.apiUrl}/group-roles`;

@Injectable({
  providedIn: 'root'
})
export class GroupRoleService {

  constructor(private http: HttpClient) {
  }

  /**
   * It takes an object of type IGroupRolePayload, sends it to the server, and returns an object of type IGroupRole
   * @param {IGroupRolePayload} role - IGroupRolePayload
   * @returns An observable of type IGroupRole
   */
  createGroupRole(role: IGroupRolePayload): Observable<IGroupRole> {
    return this.http
      .post<IGroupRole>(
        apiUrl + '/',
        role
      );
  }

  /**
   * It takes in a pagination object, converts it to query parameters, and then makes a GET request to the API
   * @param {IPaginationParams} params - IPaginationParams
   * @returns An observable of type IPaginatedResponse<IGroupRole>
   */
  retrieveGroupRoles(params: IPaginationParams): Observable<IPaginatedResponse<IGroupRole>> {
    const queryParams = new HttpParams().set('order', params.order).set('page', params.page)
      .set('take', params.take)
    if (params?.q) queryParams.set('q', params.q)

    return this.http.get<IPaginatedResponse<IGroupRole>>(apiUrl, {params: queryParams})
  }

  /**
   * This function retrieves a single group role from the database
   * @param {string} id - The id of the group role you want to retrieve.
   * @returns An observable of type IGroupRole
   */
  retrieveSingleGroupRole(id: string): Observable<IGroupRole> {
    return this.http.get<IGroupRole>(`${apiUrl}/${id}`);
  }


  /**
   * This function takes an id as a parameter and returns an observable of type IGroupRole
   * @param {string} id - The id of the group role you want to delete.
   * @returns An observable of type IGroupRole
   */
  deleteSingleGroupRole(id: string): Observable<IGroupRole> {
    return this.http.delete<IGroupRole>(`${apiUrl}/${id}`);
  }

  /**
   * It takes an id and a role, and returns an observable of type IGroupRole
   * @param {string} id - The id of the group role you want to update
   * @param {IGroupRolePayload} role - IGroupRolePayload
   * @returns An observable of type IGroupRole
   */
  updateGroupRole(id: string, role: IGroupRolePayload): Observable<IGroupRole> {
    return this.http
      .patch<IGroupRole>(
        `${apiUrl}/${id}`,
        role
      );
  }
}

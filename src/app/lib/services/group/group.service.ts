import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ToastService} from "../toast.service";
import {LoaderService} from "../loader/loader.service";
import {BehaviorSubject, Observable} from "rxjs";
import {IGroup} from "../../interfaces/igroup";
import {IGroupPayload, IPaginatedResponse, IPaginationParams} from "../../interfaces";
import {environment} from "../../../../environments/environment";

const apiUrl = `${environment.apiUrl}/groups`;

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  allGroups$ = new BehaviorSubject<IGroup[]>([]);

  constructor(private http: HttpClient, private toast: ToastService, private loader: LoaderService) {
  }

  /**
   * It returns the value of the allGroups$ BehaviorSubject
   * @returns The value of the BehaviorSubject.
   */
  get allGroups(): IGroup[] {
    return this.allGroups$.getValue();
  }


  /**
   * It takes an object of type IGroupPayload, sends it to the server, and returns an object of type IGroup
   * @param {IGroupPayload} group - IGroupPayload
   * @returns An observable of type IGroup
   */
  createGroup(group: IGroupPayload): Observable<IGroup> {
    return this.http
      .post<IGroup>(
        apiUrl + '/',
        group
      );
  }


  /**
   * It takes in a pagination object, creates a query string, and returns an observable of a paginated response
   * @param {IPaginationParams} params - IPaginationParams
   * @returns An observable of type IPaginatedResponse<IGroup>
   */
  retrieveGroups(params: IPaginationParams): Observable<IPaginatedResponse<IGroup>> {
    this.loader.startLoading();
    const queryParams = new HttpParams().set('order', params.order).set('page', params.page)
      .set('take', params.take)
    if (params?.q) queryParams.set('q', params.q)

    return this.http.get<IPaginatedResponse<IGroup>>(apiUrl, {params: queryParams})
  }

  /**
   * This function retrieves a single group from the database by its id
   * @param {string} id - string - The id of the group you want to retrieve.
   * @returns An observable of type IGroup
   */
  retrieveSingleGroups(id: string): Observable<IGroup> {
    return this.http.get<IGroup>(`${apiUrl}/${id}`);
  }


  /**
   * This function takes in an id of a group and deletes it from the database
   * @param {string} id - string - The id of the group you want to delete.
   * @returns An observable of type IGroup
   */
  deleteSingleGroups(id: string): Observable<IGroup> {
    return this.http.delete<IGroup>(`${apiUrl}/${id}`);
  }


  /**
   * It takes an id and a group payload, and returns an observable of type IGroup
   * @param {string} id - The id of the group you want to update.
   * @param {IGroupPayload} group - IGroupPayload
   * @returns An observable of type IGroup
   */
  updateGroup(id: string, group: IGroupPayload): Observable<IGroup> {
    return this.http
      .patch<IGroup>(
        `${apiUrl}/${id}`,
        group
      );
  }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {
  IPaginatedResponse,
  IPaginationParams,
  IWorkflow,
  IWorkflowExtended,
  IWorkflowItem,
  IWorkflowItemPayload,
  IWorkflowPayload
} from "../../interfaces";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

const apiUrl = `${environment.apiUrl}/workflows`;

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  constructor(private http: HttpClient) {
  }


  /**
   * It takes a payload of type IWorkflowPayload, and returns an observable of type IWorkflow
   * @param {IWorkflowPayload} role - IWorkflowPayload
   * @returns Observable<IWorkflow>
   */
  createWorkflow(role: IWorkflowPayload): Observable<IWorkflow> {
    return this.http
      .post<IWorkflow>(
        apiUrl + '/',
        role
      );
  }


  /**
   * It takes an object of type `IPaginationParams` as a parameter, and returns an observable of type
   * `IPaginatedResponse<IWorkflow>`
   * @param {IPaginationParams} params - IPaginationParams
   * @returns An observable of type IPaginatedResponse<IWorkflow>
   */
  retrieveWorkflows(params: IPaginationParams): Observable<IPaginatedResponse<IWorkflow>> {
    const queryParams = new HttpParams().set('order', params.order).set('page', params.page)
      .set('take', params.take)
    if (params?.q) queryParams.set('q', params.q)

    return this.http.get<IPaginatedResponse<IWorkflow>>(apiUrl, {params: queryParams})
  }


  /**
   * This function retrieves a single workflow from the database
   * @param {string} id - The id of the workflow to retrieve.
   * @returns An observable of type IWorkflow
   */
  retrieveSingleWorkflow(id: string): Observable<IWorkflowExtended> {
    return this.http.get<IWorkflowExtended>(`${apiUrl}/${id}`);
  }


  /**
   * It takes an id as a parameter, and returns an observable of type IWorkflow
   * @param {string} id - string - The id of the workflow to be deleted.
   * @returns An observable of type IWorkflow
   */
  deleteSingleWorkflow(id: string): Observable<IWorkflow> {
    return this.http.delete<IWorkflow>(`${apiUrl}/${id}`);
  }


  /**
   * It takes an id and a role, and returns an observable of type IWorkflow
   * @param {string} id - The id of the workflow you want to update.
   * @param {IWorkflowPayload} role - IWorkflowPayload
   * @returns Observable<IWorkflow>
   */
  updateWorkflow(id: string, role: IWorkflowPayload): Observable<IWorkflow> {
    return this.http
      .patch<IWorkflow>(
        `${apiUrl}/${id}`,
        role
      );
  }

  /**
   * It takes an id and a data object, and returns an observable of type IWorkflowItem
   * @param {string} id - The id of the workflow you want to add a workflow item to.
   * @param {IWorkflowItemPayload} data - IWorkflowItemPayload
   * @returns An observable of type IWorkflowItem
   */
  createWorkflowItem(id: string, data: IWorkflowItemPayload): Observable<IWorkflowItem> {
    return this.http
      .post<IWorkflowItem>(
        apiUrl + '/' + id + '/items',
        data
      );
  }

  /**
   * This function deletes a single workflow item from the database
   * @param {string} id - The id of the workflow you want to delete the item from.
   * @returns An observable of type IWorkflowItem
   */
  deleteSingleWorkflowItem(id: string): Observable<IWorkflowItem> {
    return this.http.delete<IWorkflowItem>(`${apiUrl}/${id}/items`);
  }
}

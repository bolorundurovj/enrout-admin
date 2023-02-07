import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private isLoading$ = new BehaviorSubject<boolean>(false);

  get isLoading(): boolean {
    return this.isLoading$.getValue();
  }

  startLoading(): void {
    this.isLoading$.next(true)
  }

  stopLoading(): void {
    this.isLoading$.next(false)
  }
}

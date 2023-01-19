import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

export class ToastMessage {
  key: string = (Math.random() * 10000).toString();
  content: string;
  style: "success" | "info" | "warning" | "error";
  time: Number = new Date().getTime()

  constructor(content: string, style?: "success" | "info" | "warning" | "error") {
    this.content = content;
    this.style = style || 'info';
  }
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  messages$: BehaviorSubject<Array<ToastMessage>> = new BehaviorSubject<Array<ToastMessage>>([])

  constructor() {
  }

  getMessages() {
    return this.messages$.asObservable();
  }

  sendMessage(content: string, style: "success" | "info" | "warning" | "error" = "info") {
    const message = new ToastMessage(content, style);
    this.messages$.next([...this.messages$.value, message])
  }

  dismissMessage(messageKey: string) {
    const arr = this.messages$.value.filter((x) => x.key !== messageKey)
    this.messages$.next(arr)
  }
}

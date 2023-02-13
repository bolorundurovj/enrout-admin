import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

export class ToastMessage {
  key: string = (Math.random() * 10000).toString();
  content: string;
  style: "success" | "info" | "warning" | "error";
  time: number = new Date().getTime()

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

  getMessages() {
    return this.messages$.asObservable();
  }

  sendMessage(content: string, style: "success" | "info" | "warning" | "error" = "info") {
    const message = new ToastMessage(content, style);
    this.messages$.next([...this.messages$.value, message])
  }

  success(content: string) {
    const message = new ToastMessage(content, "success");
    this.messages$.next([...this.messages$.value, message])
    this.timeMessage(message.key)
  }

  info(content: string) {
    const message = new ToastMessage(content, "info");
    this.messages$.next([...this.messages$.value, message])
    this.timeMessage(message.key)
  }

  warning(content: string) {
    const message = new ToastMessage(content, "warning");
    this.messages$.next([...this.messages$.value, message])
    this.timeMessage(message.key)
  }

  error(content: string) {
    const message = new ToastMessage(content, "error");
    this.messages$.next([...this.messages$.value, message])
    this.timeMessage(message.key)
  }

  dismissMessage(messageKey: string) {
    const arr = this.messages$.value.filter((x) => x.key !== messageKey)
    this.messages$.next(arr)
  }

  timeMessage(message: string) {
    setTimeout(() => {
      this.dismissMessage(message)
    }, 3000)
  }
}

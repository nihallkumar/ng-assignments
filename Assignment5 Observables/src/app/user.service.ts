import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService {
  // activatedEmmiter = new EventEmitter<boolean>();
  activatedEmmiter = new Subject<boolean>();
}

import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Paiement} from "../model/paiement.model";

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  private url = environment.apiUrl + 'paiement/'
  private _items: Array<Paiement>;
  private _selected: Paiement;
  private _selectes: Array<Paiement>;

  private _createDialog: boolean;
  private _editDialog: boolean;
  private _viewDialog: boolean;
  private _submitted: boolean;


  // constructor(private messageService: MessageService,
  //             private confirmationService: ConfirmationService, private http: HttpClient) {
  // }
  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<Array<Paiement>> {
    return this.http.get<Array<Paiement>>(this.url);
  }

  public save(): Observable<Paiement> {
    return this.http.post<Paiement>(this.url, this.selected);
  }

  public edit(): Observable<Paiement> {
    return this.http.put<Paiement>(this.url, this.selected);
  }

  public deleteByReference(): Observable<number> {
    return this.http.delete<number>(this.url + 'reference/' + this.selected.ref);
  }

  public deleteMultipleByReference(): Observable<number> {
    return this.http.post<number>(this.url + 'delete-multiple-by-reference' , this.selectes);
  }

  public findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  public deleteIndexById(id: number) {
    this.items.splice(this.findIndexById(id), 1);
  }

  public deleteMultipleIndexById() {
    for (const item of this.selectes){
      this.deleteIndexById(item.id);
    }
  }

  get items(): Array<Paiement> {
    return this._items;
  }

  set items(value: Array<Paiement>) {
    this._items = value;
  }

  get selected(): Paiement {
    return this._selected;
  }

  set selected(value: Paiement) {
    this._selected = value;
  }

  get selectes(): Array<Paiement> {
    return this._selectes;
  }

  set selectes(value: Array<Paiement>) {
    this._selectes = value;
  }


  get createDialog(): boolean {
    return this._createDialog;
  }

  set createDialog(value: boolean) {
    this._createDialog = value;
  }

  get editDialog(): boolean {
    return this._editDialog;
  }

  set editDialog(value: boolean) {
    this._editDialog = value;
  }

  get submitted(): boolean {
    return this._submitted;
  }

  set submitted(value: boolean) {
    this._submitted = value;
  }

  get viewDialog(): boolean {
    return this._viewDialog;
  }

  set viewDialog(value: boolean) {
    this._viewDialog = value;
  }
}

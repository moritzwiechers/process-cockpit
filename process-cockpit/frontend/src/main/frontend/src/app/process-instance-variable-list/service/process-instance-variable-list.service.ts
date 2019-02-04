import { Injectable } from '@angular/core';
import {SettingsService} from "../../settings/service/settings.service";
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProcessInstanceVariableListService {
  private endpointVariableInstance : string =  'variable-instance';

  constructor(private http: HttpClient, private SettingsService:SettingsService) { }

  public getVariables(searchRequest) {
    return this.http.post(this.SettingsService.getRestCallUrl(this.endpointVariableInstance),searchRequest);
  }
}

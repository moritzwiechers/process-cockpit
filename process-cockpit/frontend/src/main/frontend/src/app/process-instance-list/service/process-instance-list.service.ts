import { Injectable } from '@angular/core';
import {SettingsService} from "../../settings/service/settings.service";
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProcessInstanceListService {
  private endpointXML : string =  'process-instance';

  constructor(private http: HttpClient, private SettingsService:SettingsService) { }

  public getInstances(searchRequest : any) {
    return this.http.post(this.SettingsService.getRestCallUrl(this.endpointXML),searchRequest);
  }
}

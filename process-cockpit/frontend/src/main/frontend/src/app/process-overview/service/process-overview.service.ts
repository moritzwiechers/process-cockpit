
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SettingsService} from "../../settings/service/settings.service";
@Injectable({
  providedIn: 'root'
})
export class ProcessOverviewService {

  private endpoint : string = 'process-definition/statistics?incidents=true';

  private endpointLatestVersions : string =  'process-definition?latestVersion=true';

  private retryJob : string =  'job/{jobId}/retries';

  private allJobsWithException : string = 'job?withException=true';

  constructor(private http: HttpClient, private SettingsService:SettingsService) { }

  getProcessStatistics() {
    return this.http.get(this.SettingsService.getRestCallUrl(this.endpoint));
  }

  getProcessList() {
    return this.http.get(this.SettingsService.getRestCallUrl(this.endpointLatestVersions));
  }
  private retries = {"retries": 1};

  retryAllProcesses() {
    this.http.get(this.SettingsService.getRestCallUrl(this.allJobsWithException)).subscribe((data:any[]) => {
      data.forEach(job =>{
          this.http.put(this.SettingsService.getRestCallUrl(this.retryJob.replace('{jobId}',job.id)),this.retries).subscribe();
        }
      );
      return data.length;
    });
  }
}


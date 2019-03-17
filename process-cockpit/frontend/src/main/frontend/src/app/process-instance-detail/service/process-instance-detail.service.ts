import {Injectable} from '@angular/core';
import {SettingsService} from "../../settings/service/settings.service";
import {HttpClient} from '@angular/common/http';
import {ProcessDetailService} from "../../process-detail/service/process-detail.service";
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProcessInstanceDetailService {

  private endpointProcessInstance: string = 'process-instance/{id}';

  private endpointToken: string = 'process-instance/{id}/activity-instances';

  private endpointModification: string = 'process-instance/{id}/modification';

  private endpointIncidents: string = 'incident?processInstanceId={id}';

  private endpointActivityHistory: string = 'history/activity-instance?processInstanceId={id}&sortBy=startTime&sortOrder=asc';

  private allJobsWithException: string = 'job?withException=true&processInstanceId={id}';

  private endpointSubProcessInstance: string = 'process-instance?key={key}&superProcessInstance={id}';

  constructor(private http: HttpClient, private SettingsService: SettingsService, private ProcessDetailService: ProcessDetailService, private Router: Router) {
  }

  public getProcessInstance(processInstanceId){
    return this.http.get(this.SettingsService.getRestCallUrl(this.endpointProcessInstance.replace('{id}', processInstanceId)));
  }

  public getProcessTokens(processInstanceId) {
    return this.http.get(this.SettingsService.getRestCallUrl(this.endpointToken.replace('{id}', processInstanceId)));
  }

  public getActivityHistory(processDefinitionId) {
    return this.http.get(this.SettingsService.getRestCallUrl(this.endpointActivityHistory.replace('{id}', processDefinitionId)));
  }

  public getIncidents(processInstanceId) {
    return this.http.get(this.SettingsService.getRestCallUrl(this.endpointIncidents.replace('{id}', processInstanceId)));
  }

  retryAllIncidents(processInstanceId) {
    this.http.get(this.SettingsService.getRestCallUrl(this.allJobsWithException.replace('{id}', processInstanceId))).subscribe((data: any[]) => {
      data.forEach(job => {
        this.ProcessDetailService.retrySingleJob(job);
        }
      );
      return data.length;
    });
  }




  addTokenBefore(processInstanceId: string, activityId: string) {
    let body = {
      "skipCustomListeners": false,
      "skipIoMappings": true,
      "instructions": [
      {
        "type": "startBeforeActivity",
        "activityId": activityId
      }
    ]
    }
    return this.http.post(this.SettingsService.getRestCallUrl(this.endpointModification.replace('{id}', processInstanceId)),body);
  }

  removeToken(processInstanceId: string, activityId: string) {
    let body = {
      "skipCustomListeners": false,
      "skipIoMappings": true,
      "instructions": [
        {
          "type": "cancel",
          "activityId": activityId
        }
      ]
    }
    return this.http.post(this.SettingsService.getRestCallUrl(this.endpointModification.replace('{id}', processInstanceId)),body);
  }

  addTokenAfter(processInstanceId: string, activityId: string) {
    let body = {
      "skipCustomListeners": false,
      "skipIoMappings": true,
      "instructions": [
        {
          "type": "startAfterActivity",
          "activityId": activityId
        }
      ]
    }
    return this.http.post(this.SettingsService.getRestCallUrl(this.endpointModification.replace('{id}', processInstanceId)),body);
  }

  public getSubProcess(superProcessInstanceId, processDefinitionKey) {
    return this.http.get(this.SettingsService.getRestCallUrl(this.endpointSubProcessInstance.replace('{key}', processDefinitionKey).replace('{id}',superProcessInstanceId)));
  }

  openSubProcess(superProcessInstanceId, processDefinitionKey) {
    this.getSubProcess(superProcessInstanceId,processDefinitionKey).subscribe(data =>{
      this.Router.navigate(['/processInstanceDetail', data[0].id]);
    });
  }
}

export interface ProcessInstanceIncidents {
  id: string;
  processDefinitionId: string;
  processInstanceId: string;
  executionId: string;
  incidentTimestamp: Date;
  incidentType: string;
  activityId: string;
  causeIncidentId: string;
  rootCauseIncidentId: string;
  configuration: string;
  incidentMessage?: any;
  tenantId?: any;
  jobDefinitionId?: any;
}


  export interface ChildActivityInstance {
    id: string;
    parentActivityInstanceId: string;
    activityId: string;
    activityType: string;
    processInstanceId: string;
    processDefinitionId: string;
    childActivityInstances: any[];
    childTransitionInstances: any[];
    executionIds: string[];
    activityName?: any;
    name?: any;
  }

  export interface ActivityInstances {
    id: string;
    parentActivityInstanceId?: any;
    activityId: string;
    activityType: string;
    processInstanceId: string;
    processDefinitionId: string;
    childActivityInstances: ChildActivityInstance[];
    childTransitionInstances: any[];
    executionIds: string[];
    activityName?: any;
    name?: any;
}

export interface ActivityHistory {
  id: string;
  parentActivityInstanceId: string;
  activityId: string;
  activityName: string;
  activityType: string;
  processDefinitionKey: string;
  processDefinitionId: string;
  processInstanceId: string;
  executionId: string;
  taskId: string;
  calledProcessInstanceId?: any;
  calledCaseInstanceId?: any;
  assignee?: any;
  startTime: Date;
  endTime?: Date;
  durationInMillis?: number;
  canceled: boolean;
  completeScope: boolean;
  tenantId?: any;
  occurance?:any;
}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProcessDetailService} from "../process-detail/service/process-detail.service";
import {
  ActivityHistory,
  ActivityInstances,
  ProcessInstanceDetailService,
  ProcessInstanceIncidents
} from "./service/process-instance-detail.service";
import {
  ActivityHistoryInformation,
  ActivityInstanceInformation
} from "../process-instance-viewer/process-instance-viewer.component";

@Component({
  selector: 'app-process-instance-detail',
  templateUrl: './process-instance-detail.component.html',
  styleUrls: ['./process-instance-detail.component.css']
})
export class ProcessInstanceDetailComponent implements OnInit {

  public processInstanceId:string;
  public processInstance:any;
  public xml:string;
  public history: ActivityHistoryInformation[];
  public tokens: ActivityInstanceInformation[] =[];

  constructor(private route: ActivatedRoute, private ProcessDetailService : ProcessDetailService, private ProcessInstanceDetailService : ProcessInstanceDetailService) { }

  private subscribeToParameterMap() {
    this.route.paramMap.subscribe(params =>
      this.processInstanceId = params.get('id'));
  }

  ngOnInit() {
    this.subscribeToParameterMap();
    this.ProcessInstanceDetailService.getProcessInstance(this.processInstanceId).subscribe(value => {this.processInstance = value;
    this.loadXMLData();
    this.loadTokens();
    });
  }

  loadXMLData(){
    this.ProcessDetailService.getProcessXML(this.processInstance.definitionId)
      .subscribe((data: any) => {
        this.xml = data.bpmn20Xml+ '--' + this.processInstance.definitionId;
      });
  }

  retry() {

  }

  showHistory() {
    if(this.history==null){
    this.ProcessInstanceDetailService.getActivityHistory(this.processInstanceId).subscribe((history : ActivityHistory[])=> {
      for(let i=0; i< history.length;i++){
        history[i].occurance = i+1;
      }
      let tmpHistory = [];
      let groupedHistory = this.groupBy(history,"activityId");
      for (var property in groupedHistory) {
        if (groupedHistory.hasOwnProperty(property)) {
          tmpHistory.push({
            id: property,
            history: groupedHistory[property]
          });
        }
      }
      this.history = tmpHistory;
    });
    }else{
      this.history = null;
    }
  }
  groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  private loadTokens() {

    let tmpTokens = [];
    this.ProcessInstanceDetailService.getProcessTokens(this.processInstanceId).subscribe((processInstanceActivites: ActivityInstances) =>{
      this.ProcessInstanceDetailService.getIncidents(this.processInstanceId).subscribe((processInstanceIncidents:ProcessInstanceIncidents)=>{
        let groupedTokens :any[]= this.groupBy(processInstanceActivites.childActivityInstances,"activityId");
        let groupedIncidents :any[]= this.groupBy(processInstanceIncidents,"activityId");
        for (var property in groupedTokens) {
          if (groupedTokens.hasOwnProperty(property)) {
            tmpTokens.push({id: property,
              incidents: groupedIncidents[property] != null ? groupedIncidents[property]:[],
              tokens: groupedTokens[property]})
          }
        }
        this.tokens = tmpTokens;
      });
    });
  }

  tokensChanged($event: String) {
    this.loadTokens();
  }
}

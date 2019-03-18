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
import {IResizeEvent} from "angular2-draggable/lib/models/resize-event";

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
  public canvsHeight:number = 600;

  constructor(private route: ActivatedRoute, private ProcessDetailService : ProcessDetailService, private ProcessInstanceDetailService : ProcessInstanceDetailService) { }

  private subscribeToParameterMap() {
    this.route.paramMap.subscribe(params =>{
      this.processInstanceId = params.get('id');
      this.load();
    });
  }
  ngOnInit(){
    this.subscribeToParameterMap();
  }
  load() {
    this.ProcessInstanceDetailService.getProcessInstance(this.processInstanceId).subscribe(value => {this.processInstance = value;
    this.loadXMLData();
    this.loadTokens();
    });
  }

  loadXMLData(){
    this.ProcessDetailService.getProcessXML(this.processInstance.definitionId)
      .subscribe((data: any) => {
        this.xml = data.bpmn20Xml+ '--' + this.processInstance.definitionId;
        window.setTimeout(()=>this.setCanvasSize(this.canvsHeight),500);
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


  private getAllChildren(children, list){
    children.forEach(child=>{
      list.push(child);
      if(child.childActivityInstances!=null && child.childActivityInstances.length >0){
        this.getAllChildren(child.childActivityInstances,list);
      }
      if(child.childTransitionInstances != null && child.childTransitionInstances.length >0){
        this.getAllChildren(child.childTransitionInstances,list);
      }
    });
  }

  private loadTokens() {

    let tmpTokens = [];
    this.ProcessInstanceDetailService.getProcessTokens(this.processInstanceId).subscribe((processInstanceActivites: ActivityInstances) =>{
      this.ProcessInstanceDetailService.getIncidents(this.processInstanceId).subscribe((processInstanceIncidents:ProcessInstanceIncidents)=>{
        let tokenList = [];
        this.getAllChildren(processInstanceActivites.childActivityInstances,tokenList);
        this.getAllChildren(processInstanceActivites.childTransitionInstances,tokenList);
        let groupedTokens :any[]= this.groupBy(tokenList,"activityId");
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

  onResizeStart($event:IResizeEvent){
    let elementsByClassNameElement: any = document.getElementsByClassName('bjs-container')[0];
    elementsByClassNameElement.style.display ='none';
  }

  onResizeStop($event: IResizeEvent) {
    let elementsByClassNameElement: any = document.getElementsByClassName('bjs-container')[0];
    elementsByClassNameElement.style.display ='block';
    this.canvsHeight = $event.size.height;
    this.setCanvasSize(this.canvsHeight);
  }

  private setCanvasSize(canvasHeight: number) {
    document.getElementById("canvas").style.height = canvasHeight + 'px ';
    let elementsByClassNameElement:any = document.getElementsByClassName('bjs-container')[0];
    elementsByClassNameElement.style.height = canvasHeight + 'px ';
    document.getElementById('processList').style.height= (window.innerHeight-canvasHeight-120) + 'px';
  }
}

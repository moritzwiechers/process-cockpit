import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProcessDetailService} from "./service/process-detail.service";
import {Router} from '@angular/router';

@Component({
  selector: 'process-detail',
  templateUrl: './process-detail.component.html',
  styleUrls: ['./process-detail.component.css']
})
export class ProcessDetailComponent implements OnInit {

  private id:string;
  private key:string;
  private xml:string;
  private tokens: any[];
  private heatmap: any[];
  private searchRequest;
  private versions: any[];
  private version : number;

  constructor(
    private route: ActivatedRoute, private ProcessDetailService : ProcessDetailService, private router: Router)
  {}

  ngOnInit() {
   this.subscribeToParameterMap();
   this.loadTokens();
   this.loadXMLData();
   this.loadVersions();
  }

  loadXMLData(){
    this.ProcessDetailService.getProcessXML(this.id)
      .subscribe((data: any) => {
        this.xml = data.bpmn20Xml+ '--' + this.id;
      });
  }

  loadTokens(){
    this.ProcessDetailService.getProcessTokens(this.id)
      .subscribe((data: any[]) => {
        this.tokens = data;
      });
  }

  loadTokenAndXml(){
    this.ProcessDetailService.getProcessTokens(this.id)
      .subscribe((data: any[]) => {
        this.tokens = data;
        this.loadXMLData();
      });
  }

  showHeatmap(){
    if(this.heatmap==null) {
      this.ProcessDetailService.getActivityHistory(this.id).subscribe((data:any[]) => {
        console.log(data);
        var temp = {};
        var obj = null;
        for(var i=0; i < data.length; i++) {
          obj=data[i];
          if(!temp[obj.activityId]) {
            temp[obj.activityId] = {
              id: obj.activityId,
              count : 1
            }
          } else {
            temp[obj.activityId].count += 1;
          }
        }
        let result = [];
        for (var prop in temp)
          result.push(temp[prop]);
        console.log(result);

        this.heatmap = result;
      });
    }else{
      this.heatmap = null;
    }
  }

  elementSelected(elementId){
    if(elementId!=null){
      this.searchRequest ={...this.searchRequest, activityIdIn: [elementId]};
    }else{
      this.searchRequest ={...this.searchRequest, activityIdIn: undefined};
    }
  }

  private subscribeToParameterMap() {
    this.route.paramMap.subscribe(params =>
      this.setNewProcessId(params.get('id'))
    );
  }

  private setNewProcessId(id: string) {
    this.id = id;
    this.searchRequest =  {'firstResult':0,'sortBy':'instanceId','sortOrder':'desc','processDefinitionId':this.id};
    this.key = this.id.substr(0,this.id.indexOf(':'));
    this.loadTokenAndXml();
  }

  private loadVersions() {
    this.ProcessDetailService.getAllVersions(this.key)
      .subscribe((data: any[]) => {
        this.versions = data;
        this.version = data.find(processData => processData.id === this.id);
        console.log(this.version);
      });
  }

  versionSelected(selected){
    this.setNewProcessId(selected.id);
    this.router.navigate(['processDetail',selected.id]);
  }

  private retryAll(){
    this.ProcessDetailService.retryAllProcesses(this.key);
  }

    private deleteAll(){
        this.ProcessDetailService.deleteAllProcesses(this.id);
    }
}

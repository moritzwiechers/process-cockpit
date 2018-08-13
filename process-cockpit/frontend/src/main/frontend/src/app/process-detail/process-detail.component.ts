import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProcessDetailService} from "./service/process-detail.service";

@Component({
  selector: 'process-detail',
  templateUrl: './process-detail.component.html',
  styleUrls: ['./process-detail.component.css']
})
export class ProcessDetailComponent implements OnInit {

  private id:string;
  private xml:string;
  private tokens: any[];
  private heatmap: any[];
  private searchRequest;

  constructor(
    private route: ActivatedRoute, private ProcessDetailService : ProcessDetailService)
  {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.searchRequest =  {'firstResult':0,'sortBy':'instanceId','sortOrder':'desc','processDefinitionId':this.id}
      this.loadXMLData();
    });
  }

  loadXMLData(){
    this.ProcessDetailService.getProcessXML(this.id)
      .subscribe((data: any) => {
        this.xml = data.bpmn20Xml;
        this.loadTokens();
      });
  }

  loadTokens(){
    this.ProcessDetailService.getProcessTokens(this.id)
      .subscribe((data: any[]) => {
        this.tokens = data;
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
      this.searchRequest.activityIdIn = elementId;
    }else{
      this.searchRequest.activityIdIn = undefined;
    }
  }
}

import { Component, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import {Input} from '@angular/core';
import {ProcessInstanceVariableListService} from "./service/process-instance-variable-list.service";
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'process-instance-variable-list',
  templateUrl: './process-instance-variable-list.component.html',
  styleUrls: ['./process-instance-variable-list.component.css']
})
export class ProcessInstanceVariableListComponent implements OnInit {

  @Input() id:string;
  searchRequest:any;

  private instances :any[];
  displayedColumns: string[] = ['name', 'value'];
  dataSource = new MatTableDataSource([]);

  constructor(private ProcessInstanceVariableListService : ProcessInstanceVariableListService) { }

  ngOnInit() {
    this.searchRequest = {
      'processInstanceIdIn' : [this.id],
      'sorting':[{
        'sortBy':'variableName',
        'sortOrder' : 'asc'
      }]
    };
    this.loadProcessInstanceList();
  }
  private loadProcessInstanceList() {
    this.ProcessInstanceVariableListService.getVariables(this.searchRequest).subscribe((data: any[]) => {
      this.instances = data;
      this.dataSource = new MatTableDataSource(this.instances);
    });
  }

  setDefaultSearchRequest(origin){
    if(origin == null){
      origin = {};
    }
    origin.firstResult=0;
    origin.sortBy='instanceId';
    origin.sortOrder='desc';
    origin.processDefinitionId=this.id;
    return origin;
  }

  // setFilter(){
  //   if(this.key.trim().length>0 && this.value.trim().length>0){
  //     this.searchRequest.variables = [{
  //       name : this.key,
  //       operator : 'like',
  //       value : '%'+this.value+'%'
  //     }];
  //   }else{
  //     this.searchRequest.variables = undefined;
  //   }
  //   this.loadProcessInstanceList();
  // }

}

import { Component, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import {Input} from '@angular/core';
import {ProcessInstanceListService} from "./service/process-instance-list.service";
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'process-instance-list',
  templateUrl: './process-instance-list.component.html',
  styleUrls: ['./process-instance-list.component.css']
})
export class ProcessInstanceListComponent implements OnChanges,OnInit {

  @Input() id:string;
  @Input() searchRequest:any;

  private instances :any[];
  displayedColumns: string[] = ['id', 'details'];
  dataSource = new MatTableDataSource([]);

  private key : string = 'vertragsnummer';
  private value : string = '12345';

  constructor(private ProcessInstanceListService : ProcessInstanceListService) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    const searchRequest: SimpleChange = changes.searchRequest;
    this.searchRequest = searchRequest.currentValue;
    this.loadProcessInstanceList();
  }

  private loadProcessInstanceList() {
    this.ProcessInstanceListService.getInstances(this.searchRequest).subscribe((data: any[]) => {
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

  setFilter(){
    if(this.key.trim().length>0 && this.value.trim().length>0){
      this.searchRequest.variables = [{
        name : this.key,
        operator : 'like',
        value : '%'+this.value+'%'
      }];
    }else{
      this.searchRequest.variables = undefined;
    }
    this.loadProcessInstanceList();
  }

}

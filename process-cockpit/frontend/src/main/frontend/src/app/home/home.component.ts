import {Component, Input, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {MatTableDataSource} from "@angular/material";
import {ProcessInstanceListService} from "../process-instance-list/service/process-instance-list.service";

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    @Input() id:string;
    searchRequest:any;

    private instances :any[];
    displayedColumns: string[] = ['id', 'definitionId'];
    dataSource = new MatTableDataSource([]);

    private key : string = 'vertragsnummer';
    private value : string = '12345';

    constructor(private ProcessInstanceListService : ProcessInstanceListService) { }

    ngOnInit() {
        this.searchRequest =  {'firstResult':0,'sortBy':'instanceId','sortOrder':'desc'};
        this.loadProcessInstanceList();
    }

    private loadProcessInstanceList() {
        this.ProcessInstanceListService.getInstances(this.searchRequest).subscribe((data: any[]) => {
            this.instances = data;
            this.dataSource = new MatTableDataSource(this.instances);
        });
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

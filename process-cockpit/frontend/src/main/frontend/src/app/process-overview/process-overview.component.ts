import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {ProcessOverviewService} from "./service/process-overview.service";
import Utils from "../util/utils";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface ProcessListElement  {
  key: string,
  id: string,
  instanceCount?: number,
  incidentCount?: number
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'process-overview',
  templateUrl: './process-overview.component.html',
  styleUrls: ['./process-overview.component.css']
})
export class ProcessOverviewComponent implements OnInit {
  displayedColumns: string[] = ['key', 'instanceCount', 'incidentCount'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  private processList : any[];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private ProcessOverviewService: ProcessOverviewService) { }

  ngOnInit() {
    this.loadProcessOverviewList();

  }

  private loadProcessOverviewList() {
    this.ProcessOverviewService.getProcessList()
      .subscribe((data: any[]) => {
        this.processList = data.map(processListElement => <ProcessListElement>{key:processListElement.key, id:processListElement.id});
        this.loadStatistics();
      });
  }

  private loadStatistics(){
    this.ProcessOverviewService.getProcessStatistics()
      .subscribe((data: any[]) => {
        this.processList  = this.processList.map(processListElement => {
          let statistic = data.filter(statisicsElement => statisicsElement.definition.key === processListElement.key);
          let instances = statistic.map(value => value.instances).reduce((x, y) => x + y,0);
          let incidents =  statistic.map(value => value.incidents).reduce((previousValue, currentValue) => previousValue.concat(currentValue),[]);
          return <ProcessListElement>{key:processListElement.key, id: processListElement.id, instanceCount : instances, incidentCount: Utils.getIncidentCount(incidents)};
        });
        this.dataSource = new MatTableDataSource(this.processList);
      });
  }

  private retryAll(){
    this.ProcessOverviewService.retryAllProcesses();
  }

}

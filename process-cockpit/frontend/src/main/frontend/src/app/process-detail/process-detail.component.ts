import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProcessDetailService} from "./service/process-detail.service";
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {ProcessMigrationDialogComponent} from "../process-migration-dialog/process-migration-dialog.component";
import {IResizeEvent} from "angular2-draggable/lib/models/resize-event";

@Component({
  selector: 'process-detail',
  templateUrl: './process-detail.component.html',
  styleUrls: ['./process-detail.component.css']
})
export class ProcessDetailComponent implements OnInit {

  private id: string;
  private key: string;
  private xml: string;
  private tokens: any[];
  private heatmap: any[];
  private searchRequest;
  private versions: any[];
  private version: number;
  private canvasHeight:number = 600;

  constructor(public dialog: MatDialog,
              private route: ActivatedRoute, private ProcessDetailService: ProcessDetailService, private router: Router) {
  }

  ngOnInit() {
    this.subscribeToParameterMap();
    this.loadTokens();
    this.loadXMLData();
    this.loadVersions();
  }

  loadXMLData() {
    this.ProcessDetailService.getProcessXML(this.id)
      .subscribe((data: any) => {
        this.xml = data.bpmn20Xml + '--' + this.id;
        window.setTimeout(()=>this.setCanvasSize(this.canvasHeight),500);
      });
  }

  loadTokens() {
    this.ProcessDetailService.getProcessTokens(this.id)
      .subscribe((data: any[]) => {
        this.tokens = data;
      });
  }

  loadTokenAndXml() {
    this.ProcessDetailService.getProcessTokens(this.id)
      .subscribe((data: any[]) => {
        this.tokens = data;
        this.loadXMLData();
      });
  }

  showHeatmap() {
    if (this.heatmap == null) {
      this.ProcessDetailService.getActivityHistory(this.id).subscribe((data: any[]) => {
        console.log(data);
        var temp = {};
        var obj = null;
        for (var i = 0; i < data.length; i++) {
          obj = data[i];
          if (!temp[obj.activityId]) {
            temp[obj.activityId] = {
              id: obj.activityId,
              count: 1
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
    } else {
      this.heatmap = null;
    }
  }

  elementSelected(elementId) {
    if (elementId != null) {
      this.searchRequest = {...this.searchRequest, activityIdIn: [elementId]};
    } else {
      this.searchRequest = {...this.searchRequest, activityIdIn: undefined};
    }
  }

  private subscribeToParameterMap() {
    this.route.paramMap.subscribe(params =>
      this.setNewProcessId(params.get('id'))
    );
  }

  private setNewProcessId(id: string) {
    this.id = id;
    this.searchRequest = {
      'firstResult': 0,
      'sortBy': 'instanceId',
      'sortOrder': 'desc',
      'processDefinitionId': this.id
    };
    this.key = this.id.substr(0, this.id.indexOf(':'));
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

  versionSelected(selected) {
    this.setNewProcessId(selected.id);
    this.router.navigate(['processDetail', selected.id]);
  }

  private retryAll() {
    this.ProcessDetailService.retryAllProcesses(this.key);
  }

  private migrateDialog() {
    const dialogRef = this.dialog.open(ProcessMigrationDialogComponent, {
      width: '250px',
      data: this.key
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  private deleteAll() {
    this.ProcessDetailService.deleteAllProcesses(this.id);
  }

  private removeDefinition() {
    this.ProcessDetailService.removeProcessDefinition(this.key);
  }

  onResizeStart($event: IResizeEvent) {
    let elementsByClassNameElement: any = document.getElementsByClassName('bjs-container')[0];
    elementsByClassNameElement.style.display = 'none';
  }

  onResizeStop($event: IResizeEvent) {
    let elementsByClassNameElement: any = document.getElementsByClassName('bjs-container')[0];
    elementsByClassNameElement.style.display ='block';
    this.canvasHeight = $event.size.height;
    this.setCanvasSize(this.canvasHeight);
  }

  private setCanvasSize(canvasHeight: number) {
    document.getElementById("canvas").style.height = canvasHeight + 'px ';
    let elementsByClassNameElement: any = document.getElementsByClassName('bjs-container')[0];
    elementsByClassNameElement.style.height = canvasHeight + 'px ';
    document.getElementById('processList').style.height = (window.innerHeight - canvasHeight - 170) + 'px';
  }
}

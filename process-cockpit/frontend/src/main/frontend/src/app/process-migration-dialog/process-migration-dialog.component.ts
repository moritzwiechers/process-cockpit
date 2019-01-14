import { Component} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Inject} from '@angular/core';
import {ProcessDetailService} from "../process-detail/service/process-detail.service";

@Component({
  templateUrl: './process-migration-dialog.component.html'
})
export class ProcessMigrationDialogComponent {

  private versions: any[];

  private versionFrom:any;
  private versionTo:any;

  constructor(
    private ProcessDetailService : ProcessDetailService,
    public dialogRef: MatDialogRef<ProcessMigrationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.loadVersions();
  }

  private loadVersions() {
    this.ProcessDetailService.getAllVersions(this.data)
      .subscribe((data: any[]) => {
        this.versions = data;
        this.versionTo = data[data.length-1];
        this.versionFrom = data.length > 1 ? data[data.length-2] : data[data.length-1];
      });
  }

  onMigrateClick(): void {
    this.ProcessDetailService.migrateVersion(this.data,this.versionFrom.id,this.versionTo.id)
    this.dialogRef.close();
  }

}

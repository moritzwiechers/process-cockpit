import {Component, OnInit} from '@angular/core';
import {Viewer} from "../bpmn-js/bpmn-js"
import {Input} from '@angular/core';
import Utils from "../util/utils";
import {OnChanges} from '@angular/core';
import {SimpleChanges} from '@angular/core';
import {SimpleChange} from '@angular/core';
import * as h337 from 'heatmap.js';
import {Output} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {HostListener} from '@angular/core';
import {
  ActivityHistory,
  ProcessInstanceDetailService
} from "../process-instance-detail/service/process-instance-detail.service";

@Component({
  selector: 'process-instance-viewer',
  templateUrl: './process-instance-viewer.component.html'
})
export class ProcessInstanceViewerComponent implements OnInit, OnChanges {

  @Output() tokensChanged = new EventEmitter<String>();

  @Input() xml: string;
  @Input() processInstanceId: string;
  @Input() tokens: ActivityInstanceInformation[];
  @Input() history: ActivityHistoryInformation[];
  viewer: any;
  overlays: any;

  private contextPad;

  constructor(private ProcessInstanceDetailService:ProcessInstanceDetailService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.xml!=null){
      this.xml = changes.xml.currentValue;
      if(this.viewer!=null){
        this.loadXML();
      }
    }
    if(changes.tokens!=null ){
      this.tokens = changes.tokens.currentValue;
      if(this.viewer!=null && this.overlays != null){
        this.removeOverlays();
        if(this.history!=null) {
          this.showHistory();
        }else{
          this.showTokens();
        }
      }
    }
    if(changes.history!=null ){
      this.history = changes.history.currentValue;
      if(this.viewer!=null && this.overlays != null){
        if(this.history!=null){
        this.removeOverlays();
        this.showHistory();
        }else{
          this.removeOverlays();
          this.showTokens();
        }
      }
    }
  }

  ngOnInit() {
    this.viewer = new Viewer({
      container: '#canvas',
      width: '100%',
      height: '430px'
    });

    this.loadXML();
  }

  private loadXML() {
    this.viewer.importXML(this.xml, () => this.handleLoadingResult(null));
  }

  handleLoadingResult(err: any) {
    if (err) {
      return console.error('Ups, error: ', err);
    }

    this.overlays = this.viewer.get('overlays');

    this.removeOverlays();
    this.showTokens();
    this.registerEvents();
  }

  showTokens() {
    this.tokens.forEach(token => {
      let html = '<div id="token_"'+token.id+'" style="display:flex;"><div style="float:left; color:white; background-color: blue;border-radius: 15px; padding-left:5px; padding-right:5px;">' + token.tokens.length + '</div>';
      html = html + (token.incidents.length > 0 ? '<div style="float:left; color:white; background-color: red;border-radius: 15px; padding-left:5px; padding-right:5px;">' + token.incidents.length + '</div></div>' : '');

      this.overlays.add(token.id, {
        position: {
          bottom: 0,
          left: 0
        },
        html: html
      });
    });
  }

  removeOverlays() {
    this.overlays.clear();
  }

  registerEvents(): any {
    let eventBus = this.viewer.get('eventBus');
    let events = [
      'element.hover',
      'element.out',
      'element.click',
      'element.dblclick',
      'element.mousedown',
      'element.mouseup',
      'canvas.viewbox.changing',
    'canvas.viewbox.changed'];

    events.forEach((event) => {
      eventBus.on(event, e => {
        // e.element = the model element
        // e.gfx = the graphical element
        // console.log(event, 'on', e.element.id);
        if (event === 'element.click') {
          let elementId = e.element.type==='bpmn:Process' ? null : e.element.id;
          if(this.contextPad!=null){
            this.overlays.remove(this.contextPad);
          }
          if(elementId!=null){
            let buttons ='';
            if(e.element.type !== 'bpmn:CallActivity'){
              let addTokenBeforeLink = '<div style=" background-color:white;height:20px; text-align: center; width:20px; border:2px dotted grey; border-radius: 10px;"><a style="text-decoration:none; color:green; font-size:20px; font-family: arial;font-weight: bold;" href="javascript:void(0)" title="Add Token Before" onclick=\'window.dispatchEvent(new CustomEvent("custom-event",{"detail":{"action":"addTokenBefore","activityId" :"'+elementId+'"}}));\'>+</a></div>';
              let addTokenAfterLink = '<div style=" background-color:white;height:20px; text-align: center; width:20px; border:2px dotted grey; border-radius: 10px;"><a style="text-decoration:none; color:green; font-size:20px; font-family: arial;font-weight: bold;" href="javascript:void(0)" title="Add Token After" onclick=\'window.dispatchEvent(new CustomEvent("custom-event",{"detail":{"action":"addTokenAfter","activityId" :"'+elementId+'"}}));\'>+</a></div>';
              let removeTokenLink = '<div style=" background-color:white;height:20px; text-align: center; width:20px; border:2px dotted grey; border-radius: 10px;"><a style="text-decoration:none; color:red; font-size:20px; font-family: arial;font-weight: bold;" href="javascript:void(0)" title="Remove Token" onclick=\'window.dispatchEvent(new CustomEvent("custom-event",{"detail":{"action":"removeToken","activityId" :"'+elementId+'"}}));\'>-</a></div>';
              buttons = addTokenBeforeLink + addTokenAfterLink;
              buttons += this.tokens.filter(value => value.id==elementId).length>0 ? removeTokenLink : "";
            }
            buttons+= '<div>'+elementId+'</div>';
            this.contextPad = this.overlays.add(elementId, {
              position: {
                top: 0,
                right: -10
              },
              html: '<div style="color:black">'+buttons+'</div>'
            });
          }
        }
      });
    });
  }

  @HostListener('window:custom-event', ['$event'])
  updateNodes(event) {
    if(event.detail.action === 'addTokenBefore'){
      this.ProcessInstanceDetailService.addTokenBefore(this.processInstanceId, event.detail.activityId).subscribe(value => this.tokensChanged.emit("tokensChanged"));
    }
    else if(event.detail.action === 'addTokenAfter'){
      this.ProcessInstanceDetailService.addTokenAfter(this.processInstanceId, event.detail.activityId).subscribe(value => this.tokensChanged.emit("tokensChanged"));
    }
    else if(event.detail.action === 'removeToken'){
      this.ProcessInstanceDetailService.removeToken(this.processInstanceId, event.detail.activityId).subscribe(value => this.tokensChanged.emit("tokensChanged"));
    }
    if(this.contextPad!=null){
      this.overlays.remove(this.contextPad);
    }

  }

  private showHistory() {
    this.history.forEach((history:ActivityHistoryInformation) => {

      let html = '<div style="overflow: auto; max-height: 80px;">';
      for(let i = 0; i<history.history.length;i++){
        let text = 'Start: ' + history.history[i].startTime + "  End: " + history.history[i].endTime;
        html+='<a href="javascript:void(0)" onclick=\'alert("'+text +'");\' title="'+history.history[i].startTime+'"><div style="float:left; color:white; background-color: grey;border-radius: 15px; padding-left:5px; padding-right:5px;">' + history.history[i].occurance + '</div></a>';
      }
    html+='</div>';
    try{
      this.overlays.add(history.id, {
        position: {
          bottom: 0,
          right: 50
        },
        html: html
      });
    }catch (e) {
        console.log('Missing Element: ' + history.id);
    }
    });
    this.showTokens();
  }
}


export interface ActivityHistoryInformation {
  id:string,
  history: ActivityHistory[]
}
export interface ActivityInstanceInformation {
  id: string;
  incidents: any[];
  tokens: any[];
}

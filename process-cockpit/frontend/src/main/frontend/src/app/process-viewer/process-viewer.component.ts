import { Component, OnInit } from '@angular/core';
import {Viewer} from "../bpmn-js/bpmn-js"
import {Input} from '@angular/core';
import Utils from "../util/utils";
import {OnChanges} from '@angular/core';
import {SimpleChanges} from '@angular/core';
import {SimpleChange} from '@angular/core';
import * as h337 from 'heatmap.js';
import {Output} from '@angular/core';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'process-viewer',
  templateUrl: './process-viewer.component.html',
  styleUrls: ['./process-viewer.component.css']
})
export class ProcessViewerComponent implements OnInit, OnChanges {

  @Output() elementSelected = new EventEmitter<String>();

  @Input() xml: string;
  @Input() tokens: any[];
  @Input() heatmap: any[];
  viewer : any;
  overlays : any;
  heatmapInstance: any;
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    const heatmap: SimpleChange = changes.heatmap;
    console.log('prev value: ', heatmap.previousValue);
    console.log('got name: ', heatmap.currentValue);
    this.heatmap = heatmap.currentValue;
    if(this.viewer!=null){
      if(this.heatmap == null){
        this.removeOverlays();
        this.removeHeatmap();
        this.showTokens();
      }else{
        this.removeOverlays();
        this.showHeatmap();
      }
    }
  }

  ngOnInit() {
    this.viewer = new Viewer({
      container: '#canvas',
      width: '100%',
      height: '230px'
    });

    this.viewer.importXML(this.xml, ()=>this.handleLoadingResult(null));
  }

  handleLoadingResult(err: any) {
    if (err) {
      return console.error('Ups, error: ', err);
    }

    this.overlays = this.viewer.get('overlays');

    this.showTokens();
    this.registerEvents();
  }

  showTokens(){
    this.tokens.forEach(token => {
      let incidentCount = Utils.getIncidentCount(token.incidents);
      let html = '<div style="display:flex;"><div style="float:left; color:white; background-color: blue;border-radius: 15px; padding-left:5px; padding-right:5px;">'+token.instances+'</div>';
      html = html + (incidentCount > 0 ? '<div style="float:left; color:white; background-color: red;border-radius: 15px; padding-left:5px; padding-right:5px;">'+incidentCount+'</div></div>' : '');

      this.overlays.add(token.id, {
        position: {
          bottom: 0,
          left: 0
        },
        html: html
      });

    });
  }

  showHeatmap(){
    this.viewer.get('canvas').zoom('fit-viewport');

    if(this.heatmapInstance == null){
      var config = {
        container: document.getElementById("heatmap"),
        radius: 30,
        maxOpacity: .5,
        minOpacity: 0,
        blur: .75
      };
      this.heatmapInstance = h337.create(config);

    }
    let elementRegistry = this.viewer.get('elementRegistry');

    let points = [];
    let min = 99999;
    let max = 0;
    this.heatmap.forEach(entry => {
      let shape = elementRegistry.get(entry.id);
      let value = entry.count;
      let overlayHtml ='<div style="opacity: 0.6; width:' + shape.width+'px; height:' + shape.height + 'px;"><div style="text-align: center; vertical-align:middle; line-height: '+(shape.height-15)+'px">'+value+'</div></div>';
      this.overlays.add(entry.id, {
        position: {
          top: 0,
          left: 0
        },
        html: overlayHtml
      });
      if(value < min){
        min = value;
      }
      if(value > max){
        max = value;
      }
      points.push({x: shape.x + (shape.width/2), y: shape.y + (shape.height/2), value: entry.count});
    });

    let data = {
      max: max+1,
      min: min-1,
      data: points
    };
    this.heatmapInstance.setData(data);
  }

  removeOverlays(){
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
      'element.mouseup'
    ];

    events.forEach((event) =>{
      eventBus.on(event, e=> {
        // e.element = the model element
        // e.gfx = the graphical element
        // console.log(event, 'on', e.element.id);
        if(event === 'element.click'){
          this.elementSelected.emit(e.element.type !== 'bpmn:Task' ? null : e.element.id);
        }
      });
    });
  }


  private removeHeatmap() {
    let data = {
      max: 2,
      min: 1,
      data: []
    };
    this.heatmapInstance.setData(data);
    this.heatmapInstance.repaint();
     }
}

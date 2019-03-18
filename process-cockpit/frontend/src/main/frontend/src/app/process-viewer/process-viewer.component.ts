import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Viewer} from "../bpmn-js/bpmn-js"
import Utils from "../util/utils";
import * as h337 from 'heatmap.js';
import {ProcessDetailService} from "../process-detail/service/process-detail.service";

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
  viewer: any;
  overlays: any;
  heatmapInstance: any;

  constructor(private ProcessDetailService:ProcessDetailService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.heatmap != null) {
      this.heatmap = changes.heatmap.currentValue;
      if (this.viewer != null) {
        if (this.heatmap == null) {
          this.removeOverlays();
          this.removeHeatmap();
          this.showTokens();
          document.getElementById('canvas').className = document.getElementById('canvas').className.replace(' showHeatmap','');
        } else {
          this.removeOverlays();
          this.showHeatmap();
          document.getElementById('canvas').className = document.getElementById('canvas').className + ' showHeatmap';
        }
      }
      return;
    }
    if(changes.xml!=null){
      this.xml = changes.xml.currentValue;
      this.loadXML();
    }
  }

  ngOnInit() {
    this.viewer = new Viewer({
      container: '#canvas',
      width: '100%',
      height: '600px'
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

    this.showTokens();
    this.registerEvents();
  }

  showTokens() {
    this.tokens.forEach(token => {
      let incidentCount = Utils.getIncidentCount(token.incidents);
      let html = '<div style="display:flex;"><div style="float:left; color:white; background-color: blue;border-radius: 15px; padding-left:5px; padding-right:5px;">' + token.instances + '</div>';
      html = html + (incidentCount > 0 ? '<div style="float:left; color:white; background-color: red;border-radius: 15px; padding-left:5px; padding-right:5px;">' + incidentCount + '</div></div>' : '');

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
      let overlayHtml ='<div style="opacity: 1; pointer-events:none; width:' + shape.width+'px; height:' + shape.height + 'px;"><div style="font-weight:bold; font-size:20px; color:red; text-align: center; vertical-align:middle; line-height: '+(shape.height-15)+'px">'+value+'</div></div>';
      this.overlays.add(entry.id, {
        position: {
          top: 0,
          left: 0
        },
        html: overlayHtml
      });
      if (value < min) {
        min = value;
      }
      if (value > max) {
        max = value;
      }
      points.push({x: shape.x + (shape.width / 2), y: shape.y + (shape.height / 2), value: entry.count});
    });

    let data = {
      max: max + 1,
      min: min - 1,
      data: points
    };
    this.heatmapInstance.setData(data);

    this.scaleCanvas();
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
          this.elementSelected.emit("bpmn:Process"==e.element.type || "bpmn:SubProcess" == e.element.type || "label" == e.element.type || "bpmn:StartEvent" == e.element.type || "bpmn:EndEvent" == e.element.type || "bpmn:SequenceFlow" == e.element.type ? null : e.element.id);
          console.log(e.element);
        }else if (event === 'element.dblclick') {
          if(e.element.type === 'bpmn:CallActivity'){
            this.ProcessDetailService.openSubProcess(e.element.businessObject.calledElement)
          }
        }
        if(event === 'canvas.viewbox.changed' && this.heatmap){
          this.showHeatmap();
        }
        if(event === 'canvas.viewbox.changing' && this.heatmap){
          this.removeHeatmap();
        }
      });
    });
  }


  private scaleCanvas(){
    let matrix = this.viewer.get('canvas').getContainer().getElementsByClassName("djs-overlay-container")[0].style.transform;

    if(matrix.trim().length>0){
      var c:any=document.getElementsByClassName("heatmap-canvas")[0];
      c.style.transform = matrix;
      c.style.transformOrigin = '0 0';
    }
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

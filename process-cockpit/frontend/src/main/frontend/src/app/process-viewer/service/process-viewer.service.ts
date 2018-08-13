import { Injectable } from '@angular/core';
import {SettingsService} from "../../settings/service/settings.service";

@Injectable({
  providedIn: 'root'
})
export class ProcessViewerService {

  constructor(private SettingsService: SettingsService) {
  }

  loadModel():string{
    return '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" id="Definitions_0j80umd" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="1.16.1">\n' +
      '  <bpmn:process id="Process1" isExecutable="true">\n' +
      '    <bpmn:startEvent id="StartEvent_1">\n' +
      '      <bpmn:outgoing>SequenceFlow_11</bpmn:outgoing>\n' +
      '    </bpmn:startEvent>\n' +
      '    <bpmn:endEvent id="EndEvent_1">\n' +
      '      <bpmn:incoming>SequenceFlow_15</bpmn:incoming>\n' +
      '    </bpmn:endEvent>\n' +
      '    <bpmn:task id="Task_1" camunda:asyncBefore="true">\n' +
      '      <bpmn:incoming>SequenceFlow_11</bpmn:incoming>\n' +
      '      <bpmn:outgoing>SequenceFlow_12</bpmn:outgoing>\n' +
      '    </bpmn:task>\n' +
      '    <bpmn:sequenceFlow id="SequenceFlow_11" sourceRef="StartEvent_1" targetRef="Task_1" />\n' +
      '    <bpmn:userTask id="UserTask_1">\n' +
      '      <bpmn:incoming>SequenceFlow_12</bpmn:incoming>\n' +
      '      <bpmn:outgoing>SequenceFlow_13</bpmn:outgoing>\n' +
      '    </bpmn:userTask>\n' +
      '    <bpmn:sequenceFlow id="SequenceFlow_12" sourceRef="Task_1" targetRef="UserTask_1" />\n' +
      '    <bpmn:exclusiveGateway id="ExclusiveGateway1">\n' +
      '      <bpmn:incoming>SequenceFlow_13</bpmn:incoming>\n' +
      '      <bpmn:incoming>SequenceFlow_23</bpmn:incoming>\n' +
      '      <bpmn:outgoing>SequenceFlow_14</bpmn:outgoing>\n' +
      '    </bpmn:exclusiveGateway>\n' +
      '    <bpmn:sequenceFlow id="SequenceFlow_13" sourceRef="UserTask_1" targetRef="ExclusiveGateway1" />\n' +
      '    <bpmn:startEvent id="StartEvent_2">\n' +
      '      <bpmn:outgoing>SequenceFlow_21</bpmn:outgoing>\n' +
      '      <bpmn:messageEventDefinition messageRef="Message_0vpo2k9" />\n' +
      '    </bpmn:startEvent>\n' +
      '    <bpmn:task id="Task_2" camunda:asyncBefore="true">\n' +
      '      <bpmn:incoming>SequenceFlow_21</bpmn:incoming>\n' +
      '      <bpmn:outgoing>SequenceFlow_22</bpmn:outgoing>\n' +
      '    </bpmn:task>\n' +
      '    <bpmn:userTask id="UserTask_2">\n' +
      '      <bpmn:incoming>SequenceFlow_22</bpmn:incoming>\n' +
      '      <bpmn:outgoing>SequenceFlow_23</bpmn:outgoing>\n' +
      '    </bpmn:userTask>\n' +
      '    <bpmn:sequenceFlow id="SequenceFlow_21" sourceRef="StartEvent_2" targetRef="Task_2" />\n' +
      '    <bpmn:sequenceFlow id="SequenceFlow_22" sourceRef="Task_2" targetRef="UserTask_2" />\n' +
      '    <bpmn:sequenceFlow id="SequenceFlow_23" sourceRef="UserTask_2" targetRef="ExclusiveGateway1" />\n' +
      '    <bpmn:sequenceFlow id="SequenceFlow_14" sourceRef="ExclusiveGateway1" targetRef="Task_3" />\n' +
      '    <bpmn:task id="Task_3" camunda:asyncBefore="true">\n' +
      '      <bpmn:incoming>SequenceFlow_14</bpmn:incoming>\n' +
      '      <bpmn:outgoing>SequenceFlow_15</bpmn:outgoing>\n' +
      '    </bpmn:task>\n' +
      '    <bpmn:sequenceFlow id="SequenceFlow_15" sourceRef="Task_3" targetRef="EndEvent_1" />\n' +
      '  </bpmn:process>\n' +
      '  <bpmn:message id="Message_0vpo2k9" name="Message_0fkhdhm" />\n' +
      '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
      '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process1">\n' +
      '      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">\n' +
      '        <dc:Bounds x="173" y="158" width="36" height="36" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNShape id="EndEvent_06inok9_di" bpmnElement="EndEvent_1">\n' +
      '        <dc:Bounds x="1052" y="66" width="36" height="36" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNShape id="Task_05yadyc_di" bpmnElement="Task_1">\n' +
      '        <dc:Bounds x="385" y="136" width="100" height="80" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_0j8ogsa_di" bpmnElement="SequenceFlow_11">\n' +
      '        <di:waypoint x="209" y="176" />\n' +
      '        <di:waypoint x="385" y="176" />\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNShape id="UserTask_1117g40_di" bpmnElement="UserTask_1">\n' +
      '        <dc:Bounds x="533" y="136" width="100" height="80" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_1kjnln9_di" bpmnElement="SequenceFlow_12">\n' +
      '        <di:waypoint x="485" y="176" />\n' +
      '        <di:waypoint x="533" y="176" />\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNShape id="ExclusiveGateway_1hhw0n0_di" bpmnElement="ExclusiveGateway1" isMarkerVisible="true">\n' +
      '        <dc:Bounds x="803" y="59" width="50" height="50" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_1pljqeh_di" bpmnElement="SequenceFlow_13">\n' +
      '        <di:waypoint x="633" y="176" />\n' +
      '        <di:waypoint x="828" y="176" />\n' +
      '        <di:waypoint x="828" y="109" />\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNShape id="StartEvent_1homyya_di" bpmnElement="StartEvent_2">\n' +
      '        <dc:Bounds x="173" y="-17" width="36" height="36" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNShape id="Task_1fof8qd_di" bpmnElement="Task_2">\n' +
      '        <dc:Bounds x="385" y="-39" width="100" height="80" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNShape id="UserTask_05ed29m_di" bpmnElement="UserTask_2">\n' +
      '        <dc:Bounds x="533" y="-39" width="100" height="80" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_1fl7xnd_di" bpmnElement="SequenceFlow_21">\n' +
      '        <di:waypoint x="209" y="1" />\n' +
      '        <di:waypoint x="385" y="1" />\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_0ihkvgt_di" bpmnElement="SequenceFlow_22">\n' +
      '        <di:waypoint x="485" y="1" />\n' +
      '        <di:waypoint x="533" y="1" />\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_0lhxejp_di" bpmnElement="SequenceFlow_23">\n' +
      '        <di:waypoint x="633" y="1" />\n' +
      '        <di:waypoint x="828" y="1" />\n' +
      '        <di:waypoint x="828" y="59" />\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_1n3yzmj_di" bpmnElement="SequenceFlow_14">\n' +
      '        <di:waypoint x="853" y="84" />\n' +
      '        <di:waypoint x="884" y="84" />\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNShape id="Task_1nyf60r_di" bpmnElement="Task_3">\n' +
      '        <dc:Bounds x="884" y="44" width="100" height="80" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_1d8wjpm_di" bpmnElement="SequenceFlow_15">\n' +
      '        <di:waypoint x="984" y="84" />\n' +
      '        <di:waypoint x="1052" y="84" />\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '    </bpmndi:BPMNPlane>\n' +
      '  </bpmndi:BPMNDiagram>\n' +
      '</bpmn:definitions>\n';
  }
}

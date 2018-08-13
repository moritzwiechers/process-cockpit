export default class Utils {
  static getIncidentCount(incidents: any[]) {
    return incidents.map(incident => incident.incidentCount).reduce((x, y) => x + y,0);
  }
}

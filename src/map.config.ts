import { LatLngExpression } from "leaflet"

type MapConfig = {
  coordinate: LatLngExpression;
  zoomLevel: number,
  tileLayerURL: string,
  containerID: string,
}

export default {
  coordinate: [25.0330, 121.5654],
  zoomLevel: 13,
  tileLayerURL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  containerID: 'map',
} as MapConfig
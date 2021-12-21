import L from 'leaflet'
import { CustomMap } from './map'
import { MapConfig } from '../map.config'

class MapInitializer implements CustomMap.Initializer {
  constructor(
    public readonly map: L.Map,
    public readonly config: MapConfig
  ) {}

  public initialize() {
    const { map, config } = this
    const { coordinate, zoomLevel, tileLayerURL } = config

    map.setView(coordinate, zoomLevel);

    L.tileLayer(tileLayerURL).addTo(map)
  }
}

export default MapInitializer

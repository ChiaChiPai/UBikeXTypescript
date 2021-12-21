import L from 'leaflet'
import MapSingleton from './ubike-map/MapSingleton'
import MapInitializer from './ubike-map/MapInitializer'
import MapMarkerLayer from './ubike-map/MapMarkerLayer'
import MapMarker from './ubike-map/MapMarker'
import { MapConfig } from './map.config'
import { UBikeInfo } from './data'

export default class UBikeMapFacade {
  private map: L.Map | null = MapSingleton.getInstance()
  private mapInitializer: MapInitializer
  private mapMarkerLayer: MapMarkerLayer

  constructor(
    config: MapConfig,
    public tooltipTemplate: (data: UBikeInfo) => string
  ) {
    if (this.map === null) {
      throw new Error("Map isn't correctly initialized")
    }
    this.mapInitializer = new MapInitializer(this.map, config)
    this.mapMarkerLayer = new MapMarkerLayer(this.map)

    // 初始化地圖
    this.mapInitializer.initialize()
  }

  pinStops(data: UBikeInfo[]) {
    const markers = data.map(info => {
      const marker = MapMarker.create(info.latLng)
      marker.bindTooltip(
        this.tooltipTemplate(info)
      )

      return marker
    })

    this.mapMarkerLayer.addMarkers(markers)
  }

  clearStops() {
    this.mapMarkerLayer.clear()
  }
}
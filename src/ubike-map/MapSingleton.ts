import L from 'leaflet'
import mapConfig from '../map.config'

export default class MapSingleton {
  public readonly map = L.map(mapConfig.containerID)

  constructor() {
    if (this.map === null) {
      console.warn("Map isn't initialized correctly!")
    }
  }

  private static Instance: L.Map | null = new MapSingleton().map;

  static getInstance(): L.Map | null {
    return this.Instance
  }
}
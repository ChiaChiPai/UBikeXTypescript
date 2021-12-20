import L from 'leaflet'
import mapConfig from './map.config'
import fetchData from './fetchData'

const {
  coordinate,
  zoomLevel,
  tileLayerURL,
  containerID
} = mapConfig

const taipeiCoord = coordinate

const zoom = zoomLevel

const map = L.map(containerID)

map.setView(taipeiCoord, zoom)

L.tileLayer(tileLayerURL).addTo(map);

fetchData().then(data => {
  console.log(data)
})
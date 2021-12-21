import L, { LayerGroup } from 'leaflet'
import mapConfig from './map.config'
import fetchData from './fetchData'
import { districts } from './districtData'
import { district } from './data'
import UBikeMapFacade from './MapFacade'
import { UBikeInfo } from './data'

/* 建立地圖 */
// const {
//   coordinate,
//   zoomLevel,
//   tileLayerURL,
//   containerID
// } = mapConfig

// const taipeiCoord = coordinate

// const zoom = zoomLevel

// const map = L.map(containerID)

// map.setView(taipeiCoord, zoom)

// L.tileLayer(tileLayerURL).addTo(map);

/* 繪製點位 */
// 取出目前行政區
// let currentDistrict = $selectDistrict.value as district
// let markerLayer: LayerGroup

// function updateUBikeMap(district: district): void {
  
//   // 轉換點位並繪製
//   fetchData().then(data => {
//     // 1. 將資料根據選到的行政區進行過濾
//     const selectData = data.filter(info => info.region === currentDistrict)
  
//     // 2. 將 selectedData 裡面的 UBikeInfo 轉換成 Leaflet Marker
//     const markers = selectData.map(data => {
//       // 使用 L.Marker 裡面填入 LatLngExpression
//       const marker = new L.Marker(data.latLng)
  
//       marker.bindTooltip(`
//         <p>${data.region} - ${data.stopName}</p>
//         <p>總自行車數: ${ data.totalBikes }</p>
//         <p>可用自行車數: ${ data.availableBikes }</p>
//       `)
  
//       marker.on('mouseover', () => {
//         marker.openTooltip()
//       })
  
//       marker.on('mouseleave', () => {
//         marker.closeTooltip()
//       })
  
//       return marker
  
//     })
  
//     markerLayer = L.layerGroup(markers)
//     markerLayer.addTo(map)
//   })
// }

// updateUBikeMap(currentDistrict)

/* 不同行政區渲染出不同的狀況 */
// $selectDistrict.addEventListener('change', (event) => {

//   let { value } = event.target as HTMLSelectElement
//   currentDistrict = value as district

//   markerLayer.remove()

//   updateUBikeMap(currentDistrict)
// })

/* 建立地圖 */
const mapFacade = new UBikeMapFacade(
  mapConfig,
  function(info: UBikeInfo) {
    return `
      <p>${info.region} - ${info.stopName}</p>
      <p>總自行車數: ${ info.totalBikes }</p>
      <p>可用自行車數: ${ info.availableBikes }</p>
    `
  }
)

/* 建立行政區 option DOM */
// 選取 <select> 標籤
const $selectDistrict = <HTMLSelectElement | null>(document.querySelector('#select-district'))

if($selectDistrict === null) {
  throw new Error('No select-district field was provided')
}

districts.forEach((d) => {
  const $optionTag = document.createElement('option')

  $optionTag.setAttribute('value', d)
  $optionTag.innerText = d

  $selectDistrict.appendChild($optionTag)
})

/* 繪製點位 */
let currentDistrict = $selectDistrict.value as district;

function updateUBikeMap(district: district): void {
  fetchData().then(data => {
    const selectedData = data.filter(
      info => info.region === district
    )

    mapFacade.pinStops(selectedData)
  })
}

updateUBikeMap(currentDistrict)

/* 不同行政區渲染出不同的狀況 */
$selectDistrict.addEventListener('change', (event) => {

  let { value } = event.target as HTMLSelectElement
  currentDistrict = value as district

  mapFacade.clearStops()

  updateUBikeMap(currentDistrict)
})



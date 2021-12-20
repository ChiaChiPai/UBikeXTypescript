import { LatLngExpression } from "leaflet"
import { SourceUBikeInfo, UBikeInfo } from 'data'

let URL = 'https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.json'

export default function fetchBikeData(url = URL) {
  return fetch(url)
    .then(result => result.json())
    .then(({ retVal })=> Object.keys(retVal).map(key => retVal[key] as SourceUBikeInfo))
    .then(sourceInfo => sourceInfo.map((sourceInfo) => ({
      availableBikes: parseInt(sourceInfo.sbi, 10),
      totalBikes: parseInt(sourceInfo.tot, 10),
      latLng: <LatLngExpression>[
        parseFloat(sourceInfo.lat),
        parseFloat(sourceInfo.lng)
      ],
      region: sourceInfo.sarea,
      stopName: sourceInfo.sna
    } as UBikeInfo)))
}
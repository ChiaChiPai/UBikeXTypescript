import { LatLngExpression } from "leaflet"

let URL = 'https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.json'

type SourceUBikeInfo = {
  sno: string; // 站點代號
  sna: string; // 場站名稱
  tot: string;  // 場站總停車格
  sbi: string;  // 場站目前車輛數量
  sarea: string; // 場站區域
  mday: string; // 資料更新時間
  lat: string;  // 緯度
  lng: string;  // 經度
  ar: string; // 地區
  sareaen: string; // 場站區域(英文)
  snaen: string;  // 場站名稱(英文)
  aren: string; // 地址(英文)
  bemp: string; // 空位數量
  act: string;  // 全站禁用狀態
}

type UBikeInfo = {
  availableBikes: number;
  totalBikes: number;
  latLng: LatLngExpression;
  region: string;
  stopName: string;
}

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
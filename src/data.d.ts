import { LatLngExpression } from "leaflet"

type district = 
  '中正區' |
  '大同區' |
  '中山區' |
  '松山區' |
  '大安區' |
  '萬華區' |
  '信義區' |
  '士林區' |
  '北投區' |
  '內湖區' |
  '南港區' |
  '文山區'

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
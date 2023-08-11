import { createData } from '../utils/data.js';
import { createAdvert } from './create-advert.js';
import { disableAdForm, enableAdForm, disableMapFilters, enableMapFilters } from '../utils/form-states.js';

const TILE_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_LAYER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>';
const ZOOM = '12';
const PIN_URL = '../../img/pin.svg';
const MAIN_PIN_URL = '../../img/main-pin.svg';
const PIN_SIZE = 40;
const LOCATION_PRECISION = 5;

const data = createData(10);

const addressFiled = document.querySelector('#address');

const map = L.map('map-canvas');

const defaultLocation = {
  lat: 35.684,
  lng: 139.754
};

const createIcon = (url) => L.icon({
  iconUrl: url,
  iconSize: [PIN_SIZE, PIN_SIZE],
  iconAnchor: [PIN_SIZE / 2, PIN_SIZE],
});

const setAddressFieldValue = ({lat, lng}) => {
  addressFiled.value = `${lat.toFixed(LOCATION_PRECISION)}, ${lng.toFixed(LOCATION_PRECISION)}`;
};

const mainPinMarker = L.marker({
  lat: defaultLocation.lat,
  lng: defaultLocation.lng,
}, {
  draggable: true,
  icon: createIcon(MAIN_PIN_URL)
}).on('moveend', (evt) => {
  setAddressFieldValue(evt.target.getLatLng());
});

const resetMainPinMarker = () => {
  mainPinMarker.setLatLng({
    lat: defaultLocation.lat,
    lng: defaultLocation.lng,
  });
  setAddressFieldValue(defaultLocation);
};

const onMapLoad = () => {
  enableAdForm();
  enableMapFilters();
};

const setDefaulMapView = () => {
  map.setView({
    lat: defaultLocation.lat,
    lng: defaultLocation.lng,
  }, ZOOM);
};

const addAdverts = (adverts) => {
  adverts.forEach((advert) => {
    L.marker({
      lat: advert.location.lat,
      lng: advert.location.lng,
    },{
      icon: createIcon(PIN_URL)
    }).bindPopup(createAdvert(advert)).addTo(map);
  });
};

const initMap = () => {
  disableAdForm();
  disableMapFilters();
  map.on('load', onMapLoad);
  L.tileLayer(TILE_LAYER_URL, { attribution: TILE_LAYER_ATTRIBUTION }).addTo(map);
  setDefaulMapView();
  addAdverts(data);
  setAddressFieldValue(defaultLocation);
  mainPinMarker.addTo(map);
};

const resetMap = () => {
  resetMainPinMarker();
  setDefaulMapView();
};

export { initMap, resetMap };

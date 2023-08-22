import { getData} from '../utils/data.js';
import { createAdvert } from './create-advert.js';
import { disableAdForm, enableAdForm, disableMapFilters, enableMapFilters } from '../utils/form-states.js';
import { showNotification } from '../utils/notifications.js';
import { initAddFrom } from '../add-form/add-form.js';
import { filterAdverts, initFilters } from './filter-adverts.js';

const TILE_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_LAYER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>';
const ZOOM = '13';

const MAX_ADVERTS = 10;

const PIN_URL = '../../img/pin.svg';
const PIN_SIZE = 40;
const MAIN_PIN_URL = '../../img/main-pin.svg';
const MAIN_PIN_SIZE = 52;

const LOCATION_PRECISION = 5;

const GET_DATA_URL = 'https://28.javascript.pages.academy/keksobooking/data';
const GET_DATA_ERROR_STATUS = 'error';
const GET_DATA_ERROR_MESSAGE = 'Не удалось загрузить данные. Попробуйте обновить страницу';
const GET_DATA_ERROR_BUTTON_TEXT = 'Закрыть';

const addressFiled = document.querySelector('#address');
const mapFiltersFormElement = document.querySelector('.map__filters');

const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);

const defaultLocation = {
  lat: 35.684,
  lng: 139.754
};

const changeEvent = new CustomEvent('change');

const createIcon = (url, size) => L.icon({
  iconUrl: url,
  iconSize: [size, size],
  iconAnchor: [size / 2, size],
});

const setAddressFieldValue = ({lat, lng}) => {
  addressFiled.value = `${lat.toFixed(LOCATION_PRECISION)}, ${lng.toFixed(LOCATION_PRECISION)}`;
};

const mainPinMarker = L.marker({
  lat: defaultLocation.lat,
  lng: defaultLocation.lng,
}, {
  draggable: true,
  icon: createIcon(MAIN_PIN_URL, MAIN_PIN_SIZE)
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

const removeAdverts = () => markerGroup.clearLayers();

const addAdverts = (adverts) => {
  removeAdverts();
  adverts.slice(0, MAX_ADVERTS).forEach((advert) => {
    L.marker({
      lat: advert.location.lat,
      lng: advert.location.lng,
    },{
      icon: createIcon(PIN_URL, PIN_SIZE)
    }).bindPopup(createAdvert(advert)).addTo(markerGroup);
  });
};

const onGetDataSuccess = (adverts) => {
  addAdverts(filterAdverts(adverts));
  initFilters(adverts);
  enableMapFilters();
};

const onGetDataError = () => showNotification(GET_DATA_ERROR_STATUS, GET_DATA_ERROR_MESSAGE, GET_DATA_ERROR_BUTTON_TEXT);

const onMapLoad = () => {
  initAddFrom();
  enableAdForm();
  getData(GET_DATA_URL, onGetDataSuccess, onGetDataError);
};

const setDefaultMapView = () => {
  map.setView({
    lat: defaultLocation.lat,
    lng: defaultLocation.lng,
  }, ZOOM);
};

const initMap = () => {
  disableAdForm();
  disableMapFilters();
  map.on('load', onMapLoad);
  L.tileLayer(TILE_LAYER_URL, { attribution: TILE_LAYER_ATTRIBUTION }).addTo(map);
  setDefaultMapView();
  setAddressFieldValue(defaultLocation);
  mainPinMarker.addTo(map);
};

const resetMap = () => {
  resetMainPinMarker();
  setDefaultMapView();
  mapFiltersFormElement.reset();
  mapFiltersFormElement.dispatchEvent(changeEvent);
};

export { initMap, resetMap, addAdverts };

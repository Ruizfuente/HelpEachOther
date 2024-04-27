import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as L from 'leaflet';
import { PlacesService } from '../../services/places/places.service';
import { Place } from '../../models/place.model';
import { NgxLeafletLocateModule } from '@runette/ngx-leaflet-locate';
import { UsuariosService } from '../../services/places/usuarios.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, NgxLeafletLocateModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})

export class MapComponent {
  public placesToShow: Place[] = [];
  public map: L.Map;
  public marker: any;
  public firstTimeAux: true;
  public circle: any;
  public zoomed: any;
  public auxNumbersToMockData = [[-0.002, 0.005], [-0.001, -0.005], [-0.004, 0.001], [0.002, -0.0015], [0.008, 0.005], [0.0074, 0.003]];
  public startPosition: number[] = [40.4170547, -3.7033967];

  constructor(
    private placesService: PlacesService,
    private usuariosService: UsuariosService,
    // private cacheService: CacheService
  ) {
  }


  getUser(id: number): User {
    return this.usuariosService.getUserById(id);
  };

  ngAfterViewInit(): void {
    this.createMap();
    this.toggleLocation(this.map);
    this.drawPlacesToShow();
  }

  toggleLocation(map: L.Map) {

    let marker = this.marker;
    let zoomed = this.zoomed;

    navigator.geolocation.watchPosition(onLocationSuccess, onLocationError);

    function onLocationSuccess(pos: any) {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const accuracy = pos.coords.accuracy;

      if (marker) {
        map.removeLayer(marker);
      }
      marker = L.marker([lat, lng]).addTo(map);
      map.setView([lat, lng]);
      // location.reload();
    }

    function onLocationError(err: any) {
      // if(err.code === 1){
      //   map.setView([40.4170547	, -3.7033967]);
      //   alert("Please allow geolocation access");
      // }
    }
  }

  createMap() {
    this.map = new L.Map('map').setView([this.startPosition[0], this.startPosition[1]], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { // PATH WITH MORE LAYERS: https://leaflet-extras.github.io/leaflet-providers/preview/
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

  }

  getPlacesToShow() {
    let zoom = this.map.getZoom(); //16 aquivale a un radio de 0.002
    this.placesToShow = this.placesService.getAllValidPlaces(5, 40.4177, -3.7042);
  }

  mockNearPlaces() {
    debugger
    setTimeout(() => {
      let center = this.map.getCenter();
      for (let i = 0; i < this.auxNumbersToMockData.length - 1; i++) {
        let point = this.placesToShow[i];
        point.coordinates.latitude = center.lat + this.auxNumbersToMockData[i][0];
        point.coordinates.longitude = center.lng + this.auxNumbersToMockData[i][1];
      }
      this.drawPlacesListInMap(this.placesToShow.slice(0, this.auxNumbersToMockData.length - 1));
    }, 500);
  }

  drawPlacesToShow() {
    this.getPlacesToShow();
    this.mockNearPlaces();

    // Siguiendo: https://leafletjs.com/examples/custom-icons/
    this.drawPlacesListInMap(this.placesToShow);
  }

  drawPlacesListInMap(placesToShow: Place[]){
    let iconWidth = 60;
    let map = this.map;

    placesToShow.forEach(place => {
      let curr_icon = L.icon({
        iconUrl: `assets/icons/map-pin/${place.type}.png`,
        iconSize: [iconWidth, iconWidth],
        // shadowUrl: 'leaf-shadow.png',
        // shadowSize: [50, 64], // size of the shadow
        iconAnchor: [iconWidth / 2, iconWidth - 5], // Si se cambia el icono habria que adaptar el segundo // point of the icon which will correspond to marker's location
        // // shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
      });
      let myPositionMarker = L.marker([place.coordinates.latitude, place.coordinates.longitude], {
        icon: curr_icon,
        riseOnHover: true
      }).addTo(this.map).bindPopup(place.name).on("click", function () {
        // let possition = myPositionMarker.getLatLng();
        map.setView([place.coordinates.latitude, place.coordinates.longitude])

        const elemento_to_scroll = document.querySelector("#scroll-to-" + place.id)
        if (elemento_to_scroll) {
          elemento_to_scroll.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
        }
      });

    });
  }

  toggleClickAdvert($event: any, place: Place) {
    this.map.setView([place.coordinates.latitude, place.coordinates.longitude], 16);
    //TODO: Cambiar el icono del que hemos hecho el setView y ponerlo en otro color para destacarlo del resto
  }

}

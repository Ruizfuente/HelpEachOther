import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
// import { Map, tileLayer } from 'leaflet';
import * as L from 'leaflet';
import { PlacesService } from '../../services/places/places.service';
import { Place } from '../../models/place.model';
import { NgxLeafletLocateModule } from '@runette/ngx-leaflet-locate';
import { HeaderMapComponent } from './header-map/header-map.component';
// import {MatIconModule} from '@angular/material/icon';

// import { latLng, Map, Control, LocationEvent } from 'leaflet';


// siguientes pasos:
// 1. crear estructura de modulos YA NO HAYYYY
// 2. hacer: https://github.com/runette/ngx-leaflet-locate

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, NgxLeafletLocateModule, HeaderMapComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})

export class MapComponent {
  public placesToShow: Place[] = [];
  public map: L.Map;
  public marker: any;
  public circle: any;
  public zoomed: any;
  
  // public locateOptions: L.Control.LocateOptions = {
  //   flyTo: true,
  //   keepCurrentZoomLevel: true,
  //   locateOptions: {
  //     enableHighAccuracy: true,
  //   },
  //   // icon: 'material-icons md-18 target icon',
  //   icon: 'bi bi-geo-fill',
  //   clickBehavior: {
  //     inView: 'stop',
  //     outOfView: 'setView',
  //     inViewNotFollowing: 'setView'
  //   }
  // };

  constructor(
    private placesService: PlacesService,
  ) {
    this.placesToShow = this.placesService.getAllValidPlaces(0.1, 40.4177, -3.7042);
  }

  ngAfterViewInit(): void {
    this.createMap();
    this.toggleLocation(this.map);
    this.drawPlacesToShow();
  }

  toggleLocation(map: L.Map) {
    // watchPossition esta pendiente de cambios, getCurrentPosition lo hace solo una vez
    
    let marker = this.marker;
    // let circle = this.circle;
    let zoomed = this.zoomed;
// siguiente paso: USAR https://stackoverflow.com/questions/39253172/navigator-geolocation-watchposition-return-position-unavailable
// EN LUGAR DE WATCHPOSSITION O BUSCAR UNA ALTERNATIVA MAS PROPIA PARA ANGULAR PUDIENDO USAR THIS
    navigator.geolocation.watchPosition(onLocationSuccess, onLocationError);
    
    function onLocationSuccess(pos: any){
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const accuracy = pos.coords.accuracy;

      if(marker){
        map.removeLayer(marker);
        // map.removeLayer(circle);
      }
      marker = L.marker([lat, lng]).addTo(map);
      // circle = L.circle([lat, lng], {radius: accuracy}).addTo(map);
      
      if(!zoomed){
        // zoomed = map.fitBounds(circle.getBounds());
      }
      map.setView([lat, lng]);
    }

    function onLocationError(err: any) {
      // if(err.code === 1){
      //   map.setView([40.4170547	, -3.7033967]);
      //   alert("Please allow geolocation access");
      // }
    }
  }


  // onMapReady(map: L.Map) {
  //   // this.map = map;
  //   console.log("the map is redy")
  // }

  // onNewLocation(e: L.LocationEvent) {
  //   console.log("New location", e)
  // }

  // $('#actions').find('a').on('click', function() {
  //    locateUser();
  // });

  createMap() {
    this.map = new L.Map('map').setView([40.4170547	, -3.7033967], 16);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { // PATH WITH MORE LAYERS: https://leaflet-extras.github.io/leaflet-providers/preview/
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    
    // L.control.locate().addTo(map);


    // var searchControl = new L.Control.Search({
    //   layer: countriesJS,
    //   propertyName: 'NAME',
    //   circleLocation: false
    // });

    // searchControl.on('search_locationfound', function (e) {
    //   e.layer.setStyle({ fillColor: '#3f0', color: '#0f0' });
    // })

    // map.addControl(searchControl);
  }

  drawPlacesToShow() {
    // Siguiendo: https://leafletjs.com/examples/custom-icons/
    let iconWidth = 60;
    this.placesToShow.forEach(place => {
      let curr_icon = L.icon({
        iconUrl: `assets/icons/map-pin/${place.type.toString()}.png`,
        iconSize: [iconWidth, iconWidth],
        // shadowUrl: 'leaf-shadow.png',
        // shadowSize: [50, 64], // size of the shadow
        iconAnchor: [iconWidth / 2, iconWidth - 5], // Si se cambia el icono habria que adaptar el segundo // point of the icon which will correspond to marker's location
        // // shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
      });
      L.marker([place.coordinates.latitude, place.coordinates.longitude], {
        icon: curr_icon,
        riseOnHover: true
      }).addTo(this.map).bindPopup(place.name);;
    });

  }

}

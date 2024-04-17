// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { environment } from '../../../environments/environment';
// import { Observable } from 'rxjs';
// import { AppEndpoints } from '../../app-endpoints';
// import { PlaceTypes } from '../../resources/enums/placeTypes.enum';
// import { Place } from '../../models/place.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class PlacesService {

//   constructor(
//     // private http: HttpClient
//   ) { }

//   private readonly url = environment.api + 'api';

//   getAllValidPlaces(ratio: number, x: number, y: number, header: any = null): Place{
//     let place: Place = new Place(
//       12,
//       "Al punto burger and Beer",
//       "Lugar donde comer o cenar tranquilamente, bien iluminado y con un servicio muy educado.",
//       PlaceTypes.FOOD, "10:00 - 17:00 L-D", 4.7, [51.503, -0.08], 2.4
//     );
//     return place;
//   }

// }

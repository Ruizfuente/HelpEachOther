import { Injectable } from '@angular/core';
import { Place } from '../../models/place.model';
import { environment } from '../../environments/environment';
import * as mockedPlaces from '../../resources/mockedData/places.json';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  places: Place[];
  mocked_places_url: string = '/assets/students.json';

  constructor(
  ) {
  }

  private readonly url = environment.api + 'api';

  public getAllValidPlaces(ratio: number, latitude: number, longitude: number, filter: any = null): any[] {
    // Filtering by proximity
    debugger
    this.places = mockedPlaces.places;
    let places_filtered = this.places.filter(p =>
      (p.coordinates.latitude - latitude) < ratio 
      && (p.coordinates.longitude - longitude) < ratio
    )
    // Filtering by text
    if (filter) {
      places_filtered = places_filtered.filter(p =>
        p.name.toLocaleLowerCase().includes(filter)
        || p.description.toLocaleLowerCase().includes(filter)
      )
    }
    return places_filtered;
  }

}

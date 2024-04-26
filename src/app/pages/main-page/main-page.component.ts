import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceTypes } from '../../resources/enums/placeTypes.enum';
import { PlacesService } from '../../services/places/places.service';
import { UsuariosService } from '../../services/places/usuarios.service';
import { User } from '../../models/user.model';
import { Place } from '../../models/place.model';
import { Router } from '@angular/router';
// import { AppRoutes } from '../../resources/app-routes';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  public _placeTypes = PlaceTypes;
  // public _AppRoutes = AppRoutes;
  public placesToShowAll: Place[] = [];
  public placesToShow: Place[] = [];
  public selectedOptionServices: number = 1;

  constructor(
    private placesService: PlacesService,
    private usuariosService: UsuariosService,
    private router: Router
  ) {
    this.placesToShowAll = this.placesService.getAllValidPlaces(5, 40.4177, -3.7042);
    this.placesToShow = this.placesToShowAll.slice(0, 15);;
  }


  getUser(id: number): User {
    return this.usuariosService.getUserById(id);
  };

  navigateOnClick(route: string) {
    this.router.navigate([route]);
  }
  toggleSelectedOptionServices(selectedOption: number) {
    if(selectedOption != this.selectedOptionServices){
      this.selectedOptionServices = selectedOption;
      debugger
      let placesToShowAllCopyByValue = this.placesToShowAll.slice();
      if (selectedOption == 2) {
        this.placesToShow = placesToShowAllCopyByValue.sort((a, b) => (a.date < b.date) ? 1 : -1).slice(0, 15);
      } else if (selectedOption == 1) {
        this.placesToShow = placesToShowAllCopyByValue.slice(0, 15);
      } else if (selectedOption == 3) {
        this.placesToShow = placesToShowAllCopyByValue.slice(16, 31);
      }
    }
  }
}

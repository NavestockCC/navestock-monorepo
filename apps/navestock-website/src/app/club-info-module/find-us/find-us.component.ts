import { Component, OnInit } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Loader } from '@googlemaps/js-api-loader';


@Component({
  selector: 'ncc-app-find-us',
  templateUrl: './find-us.component.html',
  styleUrls: ['./find-us.component.scss']
})
export class FindUsComponent implements OnInit{

  mapInit!:Observable<boolean>;
  navestockLatLang = { lat: 51.65399, lng: 0.25922 };
  navestockLatLang1 = { lat: 51.65500, lng: 0.25922 };
  

  mapOptions: google.maps.MapOptions = {
    center: this.navestockLatLang,
    zoom : 15,
    draggable: true,
 }

 markerOptions: google.maps.MarkerOptions[] = [{
                                            draggable: false,
                                            title:"Navestock Cricket Club",
                                            icon:"../../../assets/img/NavestockPin.png",
                                            position: this.navestockLatLang
                                          }];


  ngOnInit(): void {
    const loader = new Loader({
      apiKey: environment.googleMapKey.apiKey
    })

    from(loader.load()).subscribe(
      () => this.mapInit = of(true)
    )

  }
 

}

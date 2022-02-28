import { Component } from '@angular/core';


@Component({
  selector: 'ncc-app-find-us',
  templateUrl: './find-us.component.html',
  styleUrls: ['./find-us.component.scss']
})
export class FindUsComponent{

  /* Google Map Parameters */
  lat = 51.6538104;
  lng = 0.2593911;
  zoom  = 15;
  draggable = true;


  /* Google Map Market Parameters */
markers: marker[] = [
	  {
		  lat: 51.6538104,
		  lng: 0.2593911,
		  draggable: false,
      iconUrl: 'assets/img/NavestockPin.png',
      infowintxt: [{ address: 'The Green'}, { address: 'Navestockside'}, {address:'near Brentwood Essex'}, {address: 'CM14 5SD'} ]
	  }
  ];
}
// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
  infowintxt?: address[];
	draggable: boolean;
  iconUrl : string;
}

interface address{
  address: string
}


import { Component, ElementRef,OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { icon, LatLng, LatLngExpression, LatLngTuple, LeafletMouseEvent, map, Map, marker, Marker, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private readonly DEFAULT_LATLNG: LatLngTuple  = [13.75, 21.62];
  @ViewChild("map" , {static:true})
  mapRef!:ElementRef;
  map!:Map;

  constructor(){}
  ngOnInit():void{};

  initializeMap(){
    if(this.map){
      return
    }    
    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false
    }).setView(this.DEFAULT_LATLNG, 1);
    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
  }

}

import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  public view: any = null;

  // The <div> where we will place the map
  @ViewChild("mapViewNode", { static: true }) private mapViewEl!: ElementRef;

  initializeMap(): Promise<any> {
    const container = this.mapViewEl.nativeElement;

    const map = new Map({
      basemap: "arcgis-light-gray",
    });

    this.view = new MapView({
      container,
      map: map,
    });

    return this.view.when();
  }

  ngOnInit(): any {
    // Initialize MapView and return an instance of MapView
    this.initializeMap().then(() => {
      // The map has been initialized
      console.log("The map is ready.");
    });
  }

  ngOnDestroy(): void {
    if (this.view) {
      // destroy the map view
      this.view.destroy();
    }
  }
}

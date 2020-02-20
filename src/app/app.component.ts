import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { CollectionView, IEventHandler } from 'wijmo/wijmo';
import { WjFlexGridFilter } from 'wijmo/wijmo.angular2.grid.filter';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  collectionView: CollectionView;
  filterDefinition: string;

  @ViewChild('flexGridFilter') flexGridFilter: WjFlexGridFilter;

  ngOnInit() {
    this.collectionView = new CollectionView(this.getData());
  }

  ngAfterViewInit() {
    this.flexGridFilter.filterChanging.addHandler((handler: IEventHandler, self: any) => {
      const columnFilter = this.flexGridFilter.getColumnFilter(self.col);
      //console.log("colum filter", columnFilter);
      console.log("unique values", columnFilter.valueFilter.uniqueValues);
      // columnFilter.valueFilter.uniqueValues = ['US', 'Japan', 'UK', 'China', 'India', 'Italy', 'Greece', 'Poland', 'Germany', 'Ukraine'];

      this.filterDefinition = this.flexGridFilter.filterDefinition;
    });
  }

  saveFilter() {
    console.log("un parsed filter", this.flexGridFilter.filterDefinition);
    var filterDef = JSON.parse(this.flexGridFilter.filterDefinition);
    console.log("parsed filter", filterDef);
    // filterDef["filters"].forEach(f => {
    //   f["uniqueValues"] = null;
    // });
    window.localStorage.setItem("filter", JSON.stringify(filterDef));
  }

  restoreFilter() {
    if (window.localStorage.getItem("filter")) {
      var filterDef = window.localStorage.getItem("filter");
      console.log("restoring filter", filterDef);
      this.flexGridFilter.filterDefinition = filterDef;
      console.log("restored filter", this.flexGridFilter.filterDefinition);
    }
  }

  private getData() {
    const countries = "US,Japan,UK,China,India,Italy,Greece".split(",");

    return countries.map((country: string, index: number) => ({
      id: index + 1,
      country: country,
      sales: Math.random() * 1000,
      downloads: Math.random() * 500
    }));
  }
}

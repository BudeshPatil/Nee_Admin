import { Component } from '@angular/core';

export interface Person {
  name: string;
  age: number;
  country: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'neelgund-dashboard-angular';
  people: Person[] = [];
  searchTerm: string;
  names = ['Maverick', 'Stanislav', 'Arxero', 'Feruchio', 'Mavericus', 'Arxiour'];
  constructor() {
    this.names.forEach((e, i) => this.people.push({
      name: e,
      age: i + 20,
      country: 'Bulgaria'
    }));
  }
}

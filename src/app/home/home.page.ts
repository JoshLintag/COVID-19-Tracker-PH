import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  //variables
  public items: any;
  public test: string = "hehehe";
  public jlen: string;
  public cCases: string;
  public cDeaths: string;
  public cRecovered: string;
  public cDate: string;
  public update: any;
  subscribe: any;
  //imma update this IF code runs
  public firstDate: any;
  public firstConfirmed: any;
  public firstDeath: any;
  public firstRecovered: any;

  constructor(public navCtrl: NavController, public http: HttpClient, public platform: Platform) {
    this.loadData();

    this.subscribe = this.platform.backButton.subscribeWithPriority(666666, () => {
      if (this.constructor.name == "HomePage") {
        if (window.confirm("Exit application?")) {
          navigator["app"].exitApp();

        }
      }

    })
  }

  hehehe(test: string) {
    console.log();
  }

  loadData() {

    let data: Observable<any>;
    data = this.http.get('https://pomber.github.io/covid19/timeseries.json');
    data.subscribe((result: any) => {
      this.items = result;
      this.jlen = this.items.Philippines;
      console.log(this.jlen[this.jlen.length - 1])

      //to update first status
      //date
      this.firstDate = JSON.stringify(this.jlen[this.jlen.length - 1]["date"]);
      console.log(this.firstDate);
      //confirmed
      this.firstConfirmed = JSON.stringify(this.jlen[this.jlen.length - 1]["confirmed"]);
      console.log(this.firstConfirmed);
      //deaths
      this.firstDeath = JSON.stringify(this.jlen[this.jlen.length - 1]["deaths"]);
      console.log(this.firstDeath);
      //recovery
      this.firstRecovered = JSON.stringify(this.jlen[this.jlen.length - 1]["recovered"]);
      console.log(this.firstRecovered);

      this.update = this.jlen[this.jlen.length - 1];

      this.pushData(this.firstDeath, this.firstConfirmed, this.firstRecovered, this.firstDate);
    })


  }

  pushData(cDeaths: string, cCases: string, cRecovered: string, cDate: string) {
    this.cDeaths = cDeaths;
    this.cCases = cCases;
    this.cRecovered = cRecovered;
    this.cDate = " " + cDate;
    console.log(cDeaths);
    this.loadData();
  }

}

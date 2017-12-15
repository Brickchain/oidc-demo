import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class Config {

    private _ready: Promise<any>;
    private _config: any;

    constructor(public http: Http) {
      this._ready = this.getConfig();
    }

    public ready(): Promise<any> {
      return this._ready;
    }

    private getConfig(): Promise<any> {
      var location = `${window.location.origin}${window.location.pathname}`;
      location.endsWith('index.html') ? location = location.replace('index.html', '') : false;
      location.endsWith('/') ? true : location = location + "/";
      return this.http.get(location + "config.json")
        .forEach(data => this._config = data != undefined ? data.json() : undefined)
        .then(() => console.log("config:", this._config));
    }

    public get(key: string): Promise<string> {
      return this._ready
        .then(() => this._config[key]);
    }
  }

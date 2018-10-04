import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { URLSearchParams } from '@angular/http';
import { Config } from '../config';
import * as base64 from 'hi-base64';

@Component({
  selector: 'app-page-show',
  templateUrl: 'show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  private backend: string;

  // gerenic
  loading = true;

  loggedIn = false;

  msg: any;
  data: any;

  name: string
  push: string

  constructor(public http: Http, private config: Config) {
    const params = new URLSearchParams(window.location.search.split('?')[1]);
    this.data = params.get('data');

    if (this.data != undefined && this.data != null && this.data != "") {
      this.loggedIn = true;
      Promise.resolve()
        .then(() => {
          let s = base64.decode(this.data.split('.')[1])
          this.msg = JSON.parse(s)

          if (this.msg.name != undefined) {
            this.name = this.msg.name
            console.log("found name:", this.name)
          }

          if (this.msg.push_endpoint != undefined) {
            this.push = this.msg.push_endpoint
            console.log("found push endpoint:", this.push)
          }
        })
        .then(() => this.loading = false);
    } else {
      this.loading = false;
    }
  }

  ngOnInit(): void {}

  login() {
    this.loading = true
    this.startOauth()
  }

  private startOauth(): Promise<any> {
    return this.config.get('backend')
      .then(backend => this.http.get(`${backend}/startOauth`).toPromise())
      .then(r => r.json())
      .then(msg => window.location.href = msg.url)
  }

  sendPush() {
    this.http.post(this.push, {
      title: "Hello",
      message: "Hello, World",
      data: JSON.stringify({
        '@type': 'message',
        'message': 'Hi there!',
      })
    })
    .toPromise()
    .then(r => console.log(r.text()))
    .catch(err => console.error(err))
  }
}

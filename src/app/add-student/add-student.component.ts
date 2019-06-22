import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  studentlist: any = [];
  userlist: any = [];
  id: any;
  form: NgForm;

  constructor(private service: RestService,
    private activateRoute: ActivatedRoute, private route: Router

  ) {
    this.activateRoute.paramMap.subscribe(res => {
      this.id = + res.get('id');

      this.service.getdata(this.id).subscribe(responce => {
        console.log("responce", responce);
        this.studentlist = responce;
      })
    });

  }

  ngOnInit() { }

  onSubmit(form: NgForm) {
    console.log("tsgdyustduy....", this.id);

    if (this.id === 0) {
      this.service.addstudent(form.value).subscribe(res => {
        // console.log("res,,,,",res);
        localStorage.setItem("insertnewdata", res);
        this.onRefresh();

      });

      // let newdata =  this.service.addstudent(form.value).subscribe();
      // console.log("if Part Executed.....!!!",this.id);
      // console.log("newdata.....!!!",newdata);
      // this.service.redirectTo('/list');
    }
    else {
      console.log("updsaddmsakjd...", this.id);

      console.log("else part...", form.value.id);
      this.service.updatestudent(form.value).subscribe(abc => {
        console.log("Update Success Full......!!!", abc);
        // console.log("hiii",this.studentlist);
        this.onRefresh();
      });
    }
    form.reset();

    this.route.navigate(['/list']);
  };

  secoundcomponent($event) {
    this.userlist = $event;

  }
  onRefresh() {
    this.route.routeReuseStrategy.shouldReuseRoute = function () { return false; };
    let currentUrl = this.route.url + '?';
    this.route.navigateByUrl(currentUrl)
      .then(() => {
        this.route.navigated = false;
        this.route.navigate([this.route.url]);
      });
  }

  onreset() {
    this.form.reset();
  }

}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RestService } from '../rest.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {


  // @Output() studentlist:any = new EventEmitter();
  studentlist: any = [];
  data: any;
  form: NgForm;
  constructor(private service: RestService) {

  }

  ngOnInit() {
    // this.referesh();
    this.service.getstudent().subscribe((res) => {
      this.studentlist = res['records'];
      console.log(res);

    });
  }

  onDelete(id, i) {
    this.service.deletestudent(id).subscribe(res => {
      console.log("deleted..", res);
      this.studentlist.splice(i, 1)
      return this.studentlist;
      this.form.reset();
    },
      error => {
        console.log("error", error);

      });

  }

  referesh() {
    this.service.getstudent();
    this.service.getstudent().subscribe(res => {
      this.studentlist = res;
      console.log(res);
    });
  }
}

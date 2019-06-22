import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class RestService {
  baseurl = 'http://localhost/Angular/studdata.php/records/tbl_stud/'
  constructor(private httpclient: HttpClient, private router: Router) { }

  getstudent() {
    return this.httpclient.get(`${this.baseurl}`);
  }

  addstudent(studentlist): Observable<any> {
    return this.httpclient.post(`${this.baseurl}`, studentlist);
  }

  deletestudent(id) {
    return this.httpclient.delete(`${this.baseurl}` + id);
  }

  updatestudent(std) {
    return this.httpclient.put(`${this.baseurl}` + std.id, std);
  }

  getdata(id) {
    return this.httpclient.get(`${this.baseurl}` + (id < 1 ? "" : id));
  }


  redirectTo(uri: string) {
    this.router.navigateByUrl('/list', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
}

import { Component, OnInit } from '@angular/core';
import { ResponseApi } from 'src/app/entities/responseApi.entity';
import { ResultApi } from 'src/app/entities/resultApi.entity';
import { ResponseApiService } from 'src/app/services/responseApi.service';
import Swal from 'sweetalert2';
declare let $: any;
@Component({
  selector: 'response',
  templateUrl: './response.component.html',
})
export class ResponseComponent implements OnInit {
  response: ResponseApi;
  responses: ResponseApi[];
  resultApi: ResultApi;
  constructor(private responseApiService: ResponseApiService) {}
  ngOnInit(): void {
    this.responseApiService.findAll().then(
      (res) => {
        this.responses = res as ResponseApi[];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  delete(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.responseApiService.delete(id).then(
          (res) => {
            this.resultApi = res as ResultApi;
            this.responseApiService.findAll().then(
              (res) => {
                this.responses = res as ResponseApi[];
              },
              (err) => {
                console.log(err);
              }
            );
          },
          (err) => {
            console.log(err);
          }
        );
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }
}

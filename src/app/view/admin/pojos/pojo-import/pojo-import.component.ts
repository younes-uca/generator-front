import { Component, OnInit } from '@angular/core';
import {PojoService} from "../../../../controller/service/pojo.service";
import {Router} from "@angular/router";
import {RequestVo} from "../../../../controller/model/request-vo.model";

@Component({
  selector: 'app-pojo-import',
  templateUrl: './pojo-import.component.html',
  styleUrls: ['./pojo-import.component.scss']
})
export class PojoImportComponent implements OnInit {

  selectedCities: string[] = [];
  cities: any[];
  stateOptions: any[];
  json:boolean=true;
  yamel:boolean=false;
  constructor(private pojoSerice: PojoService, private router: Router) {
  }


  get requestVo(): RequestVo {
    return this.pojoSerice.requestVo;
  }


  public importYaml(){
    this.pojoSerice.importYaml().subscribe(
        data=>{
          this.pojoSerice.items=data;
          for (let i = 0; i < data.length ; i++) {
           let  pojo =data[i];
            console.log("Pojo{" +
                "name='" + pojo.name + '\'' +
                ", fieldsSimple=" + pojo.fieldsSimple + "\n" +
                ", fieldsGeneric=" + pojo.fieldsGeneric + "\n" +
                ", fieldsList=" + pojo.fieldsList + "\n" +
                '}') ;
          }
          this.router.navigateByUrl('view/pojo/show');
        },error => {
          console.log(error);
        }
    );
  }


  ngOnInit(): void {
  }


}

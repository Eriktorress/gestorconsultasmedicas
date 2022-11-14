import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DbconsultaService } from 'src/app/services/dbconsulta.service';


@Component({
  selector: 'app-consultas',
  templateUrl: 'consultas.page.html',
  styleUrls: ['consultas.page.scss'],
})
export class ConsultasPage {

  noticias: any = [
    {
      titulo: "Titulo de la Consulta",
      especialistas: "Especialistas",
      texto: "Texto "
    }
  ]

  constructor(private router: Router, private servicioBD: DbconsultaService) {}

  ngOnInit(){
    //this.servicioBD.presentAlert("1");
    this.servicioBD.dbState().subscribe((res) =>{
      //this.servicioBD.presentAlert("2");
      if(res){
        //this.servicioBD.presentAlert("3");
        this.servicioBD.fetchConsultas().subscribe(item =>{
          this.noticias = item;
        })
      }
      //this.servicioBD.presentAlert("4");
    });
  }

  getItem($event) {
    const valor = $event.target.value;
    console.log('valor del control: ' + valor);

  }

  agregar() {

  }

  editar(item) {
    this.servicioBD.presentToast("Listo");
    let navigationextras: NavigationExtras = {
      state : {
        idEnviado : item.id,
        tituloEnviado : item.titulo,
        textoEnviado : item.texto
      }
    }
    this.servicioBD.presentToast("Aqui");
    this.router.navigate(['/modificar'],navigationextras);

  }

  eliminar(item) {
    this.servicioBD.deleteConsulta(item.id);
    this.servicioBD.presentToast("Consulta Eliminada");
  }

}

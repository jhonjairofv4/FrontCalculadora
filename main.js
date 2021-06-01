

function generarDatos(datostoshow){
  $('#devuelveFechaTrm').html(datostoshow.fechaTRM) 
  $('#devuelveValorEuroaCOP').html(`$ ${Math.floor(datostoshow.valorCopPorCadaEuro*100)/100}`)
  $('#devuelveValorUSDaCOP').html(`$ ${Math.floor(datostoshow.valorCopPorCadaUsd *100)/100}`)
  
}

function llamardatos() {
  $.get("http://api.exchangeratesapi.io/v1/latest?access_key=94668452b71cc50527735c1301fb6d33",
      function(data, status) {


          let datostoshow = {
            fechaTRM: data.date,
            valorCopPorCadaEuro: data.rates.COP,
            valorUsdPorCadaEuro: data.rates.USD,
            valorCopPorCadaUsd: data.rates.COP / data.rates.USD,
        };

            generarDatos(datostoshow)
      });
}



class ConversorNominalMensualAEfectivaAnual {


  unMes;
  mesesDelAnio;
  tasaNominalMensual;
  tasaEfectivaAnual;




  constructor(unMes, mesesDelAnio, tasaNominalMensual, tasaEfectivaAnual, ) {


      if (tasaNominalMensual < 0) {
          throw new Error("No puedes convertir tasas negativas");
      }



      if (tasaEfectivaAnual < 0) {
          throw new Error("No puedes convertir tasas negativas");
      }


      this.unMes = unMes;
      this.mesesDelAnio = mesesDelAnio;
      this.tasaNominalMensual = tasaNominalMensual;
      this.tasaEfectivaAnual = tasaEfectivaAnual;


  }



  verificartasaNominalMensual() {

      if (this.tasaNominalMensual > 3) {
          console.warn("Revisar la tasa ingresada, está fuera de los parametros comunes")

      } else if (this.tasaNominalMensual < 0.8) {
          console.warn("Revisar la tasa ingresada, está fuera de los parametros comunes")

      }
  }


  nominalMensualAEfectivaAnual() {


      let base = this.unMes + (this.tasaNominalMensual / 100);
      let exponente = this.mesesDelAnio;
      let exponencial = base **= exponente;

      return ((exponencial - this.unMes) * 100)


  }


  verificarTasaEfectivaAnual() {

      if (this.tasaEfectivaAnual > 40) {
          console.warn("Revisar la tasa ingresada, está fuera de los parametros comunes")

      } else if (this.tasaEfectivaAnual < 7) {
          console.warn("Revisar la tasa ingresada, está fuera de los parametros comunes")

      }
  }

  efectivaAnualAnominalMensual() {

      let base = this.unMes + (this.tasaEfectivaAnual / 100);
      let exponente = this.unMes / this.mesesDelAnio;
      let exponencial = base **= exponente;


      return (((exponencial - this.unMes) * 12) / 12) * 100

  }

}




document.getElementById("formulario", ).addEventListener("submit", function(e)

  {
      e.preventDefault()
      let valorTasa = document.getElementById("Tasa").value;
      let convierteNominalMesAEfectivaAnual = new ConversorNominalMensualAEfectivaAnual(1, 12, valorTasa, 0);

      convierteNominalMesAEfectivaAnual.verificartasaNominalMensual();

      

      document.getElementById('tasaEAFinal').value = `${Math.round(convierteNominalMesAEfectivaAnual.nominalMensualAEfectivaAnual()*1000)/1000} %`;

  })




document.getElementById("formularioDos").addEventListener("submit", function(e)

  {
      e.preventDefault()
      let valorTasados = document.getElementById("tasaDos").value;
      let Convierteefectivaanualanominalmes = new ConversorNominalMensualAEfectivaAnual(1, 12, 0, valorTasados);

      


      Convierteefectivaanualanominalmes.verificarTasaEfectivaAnual();

      document.getElementById('tasaNMVFinal').value = `${Math.round(Convierteefectivaanualanominalmes.efectivaAnualAnominalMensual()*1000)/1000} % `;
  })




class CalculadoraDeInteres {

  valor;
  dias;
  tasa;

  constructor(valor, dias, tasa) {




      if (dias == 0) {
          throw new Error("No puedes calcular intereses con Cero dias");
      } else if (dias < 0) {
          throw new Error("No puedes calcular intereses con dias negativos")

      }




      this.valor = valor;
      this.dias = dias;
      this.tasa = tasa;
  }



  calculartasa() {

      return (this.valor) * (this.dias) * ((this.tasa / 100) / 30)
  }



}


$("#show").click(function() {

  let fromDate = $('input[name="fromDate"]').val();
  

  let toDate = $('input[name="toDate"]').val();
  

  const date1 = new Date(fromDate);
  const date2 = new Date(toDate);

  let diff = 0;

  if (date1 && date2) {
      diff = Math.floor((date2.getTime() - date1.getTime()) / 86400000);
       }

  diff = diff;
  $('#dateDiff').val(diff);
});



document.getElementById("formularioTres").addEventListener("submit", function(e) {
  e.preventDefault()
  let diasEntreFechas = document.getElementById("dateDiff").value;
  
  let valorACalcular = document.getElementById("valorIngresado").value;
  let tasaACalcular = document.getElementById("tasaIngresada").value;
  
  let CalcularInteres = new CalculadoraDeInteres(valorACalcular, diasEntreFechas, tasaACalcular);


  document.getElementById('valorInteresFinal').value = `$ ${Math.round(CalcularInteres.calculartasa()*100)/100}`;


})



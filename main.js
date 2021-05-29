

function generarDatos(datostoshow){
  $('#devuelveFechaTrm').html(datostoshow.fechaTRM) 
  $('#devuelveValorEuroaCOP').html(datostoshow.valorCopPorCadaEuro)
  $('#devuelveValorUSDaCOP').html(`$ ${Math.floor(datostoshow.valorCopPorCadaUsd *100)/100}`)
  
}
// api key 94668452b71cc50527735c1301fb6d33
function llamardatos() {
  $.get("http://api.exchangeratesapi.io/v1/latest?access_key=94668452b71cc50527735c1301fb6d33",
      function(data, status) {
          console.log(status);
          console.log(data.date);
          console.log(data.rates.COP);
          console.log(data.rates.USD);
          console.log(data);

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

      console.log(valorTasa)

      document.getElementById('tasaEAFinal').value = `${(convierteNominalMesAEfectivaAnual.nominalMensualAEfectivaAnual())}`;

  })



document.getElementById("formularioDos").addEventListener("submit", function(e)

  {
      e.preventDefault()
      let valorTasados = document.getElementById("tasaDos").value;
      let Convierteefectivaanualanominalmes = new ConversorNominalMensualAEfectivaAnual(1, 12, 0, valorTasados);

      console.log(valorTasados)


      Convierteefectivaanualanominalmes.verificarTasaEfectivaAnual();

      document.getElementById('tasaNMVFinal').value = `${(Convierteefectivaanualanominalmes.efectivaAnualAnominalMensual())}`;
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
  console.log(fromDate);

  let toDate = $('input[name="toDate"]').val();
  console.log(toDate);


  const date1 = new Date(fromDate);
  const date2 = new Date(toDate);

  let diff = 0;

  if (date1 && date2) {
      diff = Math.floor((date2.getTime() - date1.getTime()) / 86400000);
      console.log(diff);
  }

  diff = diff;
  $('#dateDiff').val(diff);
});



document.getElementById("formularioTres").addEventListener("submit", function(e) {
  e.preventDefault()
  let diasEntreFechas = document.getElementById("dateDiff").value;
  console.log(diasEntreFechas);
  let valorACalcular = document.getElementById("valorIngresado").value;
  console.log(valorACalcular);
  let tasaACalcular = document.getElementById("tasaIngresada").value;
  console.log(tasaACalcular);

  let CalcularInteres = new CalculadoraDeInteres(valorACalcular, diasEntreFechas, tasaACalcular);


  document.getElementById('valorInteresFinal').value = `${(CalcularInteres.calculartasa())}`;


})




//4 Clase con funcion que arma una tabla de amortizacion de la compra realizada.



class Tablaamortizacion {

  constructor(plazo, tasa, valor, diasPrimerMes, cuotamanejo) {
      this.plazo = plazo;
      this.tasa = tasa;
      this.valor = valor;
      this.diasPrimerMes = diasPrimerMes;
      this.cuotamanejo = cuotamanejo;
  }


  interesCuotaUno() {

      return (this.valor) * (this.diasPrimerMes) * ((this.tasa / 100) / 30)

  }


  
}


$("#show2").click(function() {

  let fromDate = $('input[name="fromDate2"]').val();
  console.log(fromDate);

  let toDate = $('input[name="toDate2"]').val();
  console.log(toDate);


  const date1 = new Date(fromDate);
  const date2 = new Date(toDate);

  let diff = 0;

  if (date1 && date2) {
      diff = Math.floor((date2.getTime() - date1.getTime()) / 86400000);
      console.log(diff);
  }

  diff = diff;
  $('#dateDiff2').val(diff);
});


document.getElementById("formularioCuatro").addEventListener("submit", function(e) {
  e.preventDefault()
  let plazoPactado = document.getElementById("plazoPactado").value;
  console.log(plazoPactado);
  let tasaPactada = document.getElementById("tasaPactada").value;
  console.log(tasaPactada);
  let valorDeCompra = document.getElementById("valorDeCompra").value;
  console.log(valorDeCompra);
  let valorDeCuotaDeManejo = document.getElementById("valorDeCuotaDeManejo").value;
  console.log(valorDeCuotaDeManejo);
  let diasPrimerMes = document.getElementById("dateDiff2").value;
  console.log(diasPrimerMes);




  let Calculartabla = new Tablaamortizacion(plazoPactado, tasaPactada, valorDeCompra, diasPrimerMes, valorDeCuotaDeManejo);



  document.getElementById('tablaDeAmortizacion').innerHTML = `<div class="container">
<table class="table table-dark">
  <thead>
    <tr>
      <th>No. Cuota</th>
      <th>Valor cuota de manejo</th>
      <th>Capital</th>
      <th>Intereses</th>
      <th>Valor de la cuota</th>
      <th>Saldo pendiente</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${plazoPactado}</td>
      <td>${valorDeCuotaDeManejo}</td>
      <td>${valorDeCompra}</td>
      <td>${(Calculartabla.interesCuotaUno())}</td>
      <td></td>
      <td>john@example.com</td>
    </tr>
    </tbody>
</table>
</div>`;
})
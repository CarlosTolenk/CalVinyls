//Dentro de ready debemos poner todo el contenido de nuestro código.
var clientes = [];
var totalAc = [];
$(document).ready(function(){

  $('#calcular').attr('disabled', true);

  $("#formulario").change(function(){
    if($("#cantidad").val().length > 0 && $("#cant_colores").val().length > 0 &&
       $("#cant_width").val().length > 0  && $("#cant_height").val().length > 0){
      validar(true);
    }
    else{
      validar(false);
    }
  });


  function validar(act1){
    if(act1){
      $('#calcular').attr('disabled', false);
    }
    else{
      $('#calcular').attr('disabled', true);
    }
  }


  $("#calcular").click(function() {
    registarCliente(); //Funcion la cual se encargar de registrar todos los datos del cliente.
    calcular();
    limpiarCampos();
    $('#calcular').attr('disabled', true);
  }); // Final de registrar.


    function registarCliente(){
      var first_name = $("#first_name").val();
      var last_name = $("#last_name").val();
      var email = $("#email").val();
      var telephone = $("#icon_telephone").val();
      var cantidad = parseFloat($("#cantidad").val());
      var cant_colores = parseFloat($("#cant_colores").val());
      var cant_width = parseFloat($("#cant_width").val());
      var cant_height = parseFloat($("#cant_height").val());
      var tax = parseFloat($("#tax").val());


        var cliente = {
          first_name:first_name,
          last_name:last_name,
          email:email,
          telephone:telephone,
          cantidad:cantidad,
          cant_colores:cant_colores,
          cant_width:cant_width,
          cant_height:cant_height,
          tax:tax
        }

      clientes.push(cliente);
    }

    function calcular(){
      var cantidad = parseFloat($("#cantidad").val());
      var cant_colores = parseFloat($("#cant_colores").val());
      var cant_width = parseFloat($("#cant_width").val());
      var cant_height = parseFloat($("#cant_height").val());
      var tax= parseFloat($("#tax").val());
      var work=0.0;
      var descuento=1;

      if( $("#test1").is(':checked')){work=0.10;}
      if( $("#test2").is(':checked')){work=0.12;}
      if( $("#test3").is(':checked')){work=0.14;}
      if(cantidad>11 && cantidad<=29){
         descuento=0.90;
      }
      if(cantidad>=30){
        descuento=0.85;
      }

      var unitario = (((cant_height*cant_width)*work)/2)*cantidad;
      var colores = cant_colores*2;
      var total = (unitario + colores)*descuento;
      total = total*(1+tax);
      var totalCar = total.toFixed(2);
      totalAc.push(totalCar);
      imprimirDatos(descuento,work);

    }

    function imprimirDatos(descuento,work){
      var lista="";
      var total="";
      var date = new Date();
      var fecha = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();

      for(var i=0; i<clientes.length; i++){

          lista += "<p>_______________________________________</p>"
        lista += "<p><b>Cliente: </b>" + clientes[i].first_name + " " + clientes[i].last_name + "</p>";
        lista += "<p><b>Email: </b>" + clientes[i].email + "</p>" + "<p><b>Tel: </b> " + clientes[i].telephone + "</p>";
        lista += "<p><b>Fecha: </b>" + fecha + "</p>";
          lista += "<p>_______________________________________</p>"
        lista += "<p><b>Items Quantity: </b> " + clientes[i].cantidad + "</p>";
        lista += "<p><b>Numbers Additional Colors: </b>" +clientes[i].cantidad + "</p>";
        lista += "<p><b>Width: </b>" +clientes[i].cant_width+"<em>in</em>" + "</p>";
        lista += "<p><b>Height: </b>" +clientes[i].cant_height+"<em>in</em>" + "</p>";
          lista += "<p>_______________________________________</p>"
        if(descuento==0.90){ lista += "<p>Descuento del 10%" + "</p>";}
        if(descuento==0.85){ lista += "<p>Descuento del 15%" + "</p>";}
        if(work==0.10){lista += "<p><em>Work is Average"+ "</em></p>";}
        if(work==0.35){lista += "<p><em>Work is Detailed"+ "</em></p>";}
        if(work==0.75){lista += "<p><em>Work is Complex"+ "</em></p>";}
            lista += "<p>_______________________________________</p>"
          lista += "<h5>Subtotal: </h5>"
          lista += "<p><b>Tax: </b> " + clientes[i].tax + "</p>";
          lista += "<p id='total'><strong>Total: " + "</strong>" + totalAc[i]+ "<em>usd</em></p>";
          lista += "<p><br></p>"
          lista += "<p><br></p>"
        $("#data").html(lista);


        /*lista += "<b>Cliente: </b>" + clientes[i].first_name + " " + clientes[i].last_name + "<br>"
        lista += "<b>email: </b>" + clientes[i].email + "<br>" + "<b>Tel</b> " + clientes[i].telephone + "<br>"
        lista += "<b>Items: </b> " + clientes[i].cantidad + "<b> AddColor: </b> " + clientes[i].cant_colores + "<br>";
        lista += "<b>Width: </b> " + clientes[i].cant_width + "<b> Height: </b> " + clientes[i].cant_height + "<br>";
        if(descuento==0.90){ lista += "Descuento del 10%" + "<br>";}
        if(descuento==0.85){ lista += "Descuento del 15%" + "<br>";}
        if(work==0.10){lista += "Work is Average"+ "<br>";}
        if(work==0.35){lista += "Work is Detailed"+ "<br>";}
        if(work==0.75){lista += "Work is Complex"+ "<br>";}
        lista += "<h5>Total: </h5>"
        lista += "<b>Tax: </b> " + clientes[i].tax + "<br>";
        lista += "<b>Total: </b>" + totalAc[i] + "<br><br>";
        $("#data").append(lista);*/

        }
   }

    function limpiarCampos(){
      //Clientes
      $("#first_name").val("");
      $("#last_name").val("");
      $("#email").val("");
      $("#icon_telephone").val("");

      //Valys
      $("#cantidad").val("");
      $("#cant_colores").val("");
      $("#cant_width").val("");
      $("#cant_height").val("");
    }

}); //Final del ready.


function HTMLtoPDF(){
var pdf = new jsPDF('p', 'pt', 'letter');
source = $('#HTMLtoPDF')[0];
specialElementHandlers = {
  '#bypassme': function(element, renderer){
    return true
  }
}
margins = {
    top: 50,
    left: 60,
    width: 545
  };
pdf.fromHTML(
    source // HTML string or DOM elem ref.
    , margins.left // x coord
    , margins.top // y coord
    , {
      'width': margins.width // max width of content on PDF
      , 'elementHandlers': specialElementHandlers
    },
    function (dispose) {
      var nombre = clientes[0].first_name + clientes[0].last_name;
      var date = new Date();
      var fecha = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
      var save = nombre+"/"+fecha+".pdf";
      // dispose: object with X, Y of the last line add to the PDF
      //          this allow the insertion of new lines after html
        pdf.save(save);
      }
  )
}

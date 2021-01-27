
			var gyr = 0; 
			var json ="";
			var empleados = [];
			var idCount = 0;
			var myObj = {};
			var myObjFiltro = {};
			var IdEditar;
			var IdEditarVF;
			let sinRepetidos = [];

function ChecarBox(){

	$("#ListaNombre option").remove(); 
	$("#ListaAp option").remove(); 
	$("#ListaAm option").remove(); 
	$("#ListaEd option").remove();

	$("#ListaNombre").append("<option id='opNo'>Nombres</option>");
	$("#ListaAp").append("<option id='opNo'>Paternos</option>");
	$("#ListaAm").append("<option id='opNo'>Maternos</option>");
	$("#ListaEd").append("<option id='opNo'>Edad</option>");

	//---Nombres
	var nombresEm = empleados;
		var hash = {};
		nombresEm = nombresEm.filter(function(current) {
  		var exists = !hash[current.Nombre] || false;
  		hash[current.Nombre] = true;
  		return exists;
	});
	for (var i = 0; i < nombresEm.length; i++) {
		$('#ListaNombre').append('<option>' + nombresEm[i].Nombre +'</option>');
	}
	//---ApellidoPaterno
	var apellidoPEm = empleados;
		var hash = {};
		apellidoPEm = apellidoPEm.filter(function(current) {
  		var exists = !hash[current.ApellidoPaterno] || false;
  		hash[current.ApellidoPaterno] = true;
  		return exists;
	});

	for (var i = 0; i < apellidoPEm.length; i++) {
		$('#ListaAp').append('<option>' + apellidoPEm[i].ApellidoPaterno +'</option>');
	}
	//---ApellidoMaterno

	var apellidoMEm = empleados;
		var hash = {};
		apellidoMEm = apellidoMEm.filter(function(current) {
  		var exists = !hash[current.ApellidoMaterno] || false;
  		hash[current.ApellidoMaterno] = true;
  		return exists;
	});
	for (var i = 0; i < apellidoMEm.length; i++) {
		$('#ListaAm').append('<option>' + apellidoMEm[i].ApellidoMaterno +'</option>');
	}

	//Edad----------
 	var edadEm = empleados;
		var hash = {};
		edadEm = edadEm.filter(function(current) {
  		var exists = !hash[current.Edad] || false;
  		hash[current.Edad] = true;
  		return exists;
	});
	for (var i = 0; i < edadEm.length; i++) {
		$('#ListaEd').append('<option>' + edadEm[i].Edad +'</option>');
	}
}
function Eliminar(id){

 var ids = id;
 let indice = empleados.findIndex(o => o.Id === ids);
 empleados.splice(indice,1);
 cargarDatos();

 }
function Editar(id){

	IdEditar=id;
	gyr = 2;

	    $('#tabla2').show();
		$('#btnCancelar').show();

	    var nombre = $('*[data-nombre="'+id+'"]').html();
	    var apellidoPaterno = $('*[data-ApP="'+id+'"]').html();
	    var apellidoMaterno = $('*[data-ApM="'+id+'"]').html();
	    var edadd = $('*[data-Edad="'+id+'"]').html();

	    //var Activoo = $('*[data-Activo="'+id+'"]').prop('checked');

	    if ($('*[data-Activo="'+id+'"]').prop('checked')) {
	    	IdEditarVF=true;
	    	$('#activo').prop("checked", true);
	    }else{
	    	IdEditarVF=false;
			$('#activo').prop("checked", false);	
	    }

		$('#nombret2').val(nombre);
		$('#apPt2').val(apellidoPaterno);
		$('#apMt2').val(apellidoMaterno);
		$('#edad').val(edadd);
}
function Limpiar(){

	     		$("#idt2").prop('disabled', false);
      			$('#btnCancelar').hide();

   					$('#idt2').val('');
					$('#nombret2').val('');
					$('#apPt2').val('');
					$('#apMt2').val('');
					$('#edad').val('');
					$('#activo').val('');
					$('#tabla2').hide();
					$('#btnC').hide();
}	
function Empleado(id,nombre,ap,am,edad,activo){

		this.Id=id;
		this.Nombre= nombre;
		this.ApellidoPaterno=ap;
		this.ApellidoMaterno=am;
		this.Edad=edad;
		this.Activo=activo;
}			
function cargarDatos(){
    
    $("#tabla1 tbody").empty(); 

    var DatosJson = JSON.parse(JSON.stringify(myObj));
        
    for (i = 0; i < DatosJson.Empleados.length; i++){

    			var ids=empleados[i].Id;

				if (DatosJson.Empleados[i].Activo == true){
					comprobar ='checked';
				}else{
					comprobar='';
				}

 			$("#tabla1 tbody").append('<tr>' + 
   				 '<td align="center" style="dislay:none; id="'+ids+'">' + ids + '</td>'+
    			 '<td data-nombre="'+ids+'" align="center" style="dislay:none; id="'+ids+'">' + DatosJson.Empleados[i].Nombre + '</td>'+
    			 '<td data-ApP="'+ids+'" align="center" style="dislay:none; id="'+ids+'">' + DatosJson.Empleados[i].ApellidoPaterno + '</td>'+
    			 '<td data-ApM="'+ids+'" align="center" style="dislay:none; id="'+ids+'">' + DatosJson.Empleados[i].ApellidoMaterno + '</td>'+
    			 '<td data-Edad="'+ids+'" align="center" style="dislay:none; id="'+ids+'">' + DatosJson.Empleados[i].Edad + '</td>'+

    			 '<td align="center" style="dislay:none; id="'+ids+'">' + '<input data-Activo="'+ids+'" type="checkbox" '+ comprobar +' class="activo" disabled value="activo"  id="' + ids+'">' + '</td>'+

    			 '<td align="center" style="dislay:none; id="'+ids+'">' + '<input type="button" class="eliminar" value="Eliminar" onclick="Eliminar('+ids+')" id="'+ids+'">' + '</td>'+

    			 '<td align="center" style="dislay:none; id="'+ids+'">' + '<input type="button" class="editar" value="Editar" onclick="Editar('+ids+')" id="'+ids+'">' +  '</td>'+'</tr>');
    }

		ChecarBox();
}
function Filtro(adn){

	var idicies=[];

	//------

		for (var i = 0; i <empleados.length; i++) {
					
				if (empleados[i].Nombre.includes(adn) || empleados[i].ApellidoMaterno.includes(adn) || empleados[i].Edad.includes(adn) || empleados[i].ApellidoPaterno.includes(adn)){

						idicies.push(empleados[i]);
				}

		}

	//------
	myObjFiltro.Filtro = idicies;


  $('#Filtro2').html(adn);	


  if (adn==''){
  	cargarDatos();
  }else{
  	cargarDatosFiltro();
  }
}
function cargarDatosFiltro(){

 $("#tabla1 tbody").remove(); 

    var DatosJsons = JSON.parse(JSON.stringify(myObjFiltro));
        
    for (i = 0; i < DatosJsons.Filtro.length; i++){

    			var ids=empleados[i].Id;

				if (DatosJsons.Filtro[i].Activo == true){
					comprobar ='checked';
				}else{
					comprobar='';
				}

 			$("#tabla1").append('<tr>' + 
   				 '<td align="center" style="dislay:none; id="'+ids+'">' + ids + '</td>'+
    			 '<td data-nombre="'+ids+'" align="center" style="dislay:none; id="'+ids+'">' + DatosJsons.Filtro[i].Nombre + '</td>'+
    			 '<td data-ApP="'+ids+'" align="center" style="dislay:none; id="'+ids+'">' + DatosJsons.Filtro[i].ApellidoPaterno + '</td>'+
    			 '<td data-ApM="'+ids+'" align="center" style="dislay:none; id="'+ids+'">' + DatosJsons.Filtro[i].ApellidoMaterno + '</td>'+
    			 '<td data-Edad="'+ids+'" align="center" style="dislay:none; id="'+ids+'">' + DatosJsons.Filtro[i].Edad + '</td>'+

    			 '<td align="center" style="dislay:none; id="'+ids+'">' + '<input data-Activo="'+ids+'" type="checkbox" '+ comprobar +' class="activo" disabled value="activo"  id="' + ids+'">' + '</td>'+

    			 '<td align="center" style="dislay:none; id="'+ids+'">' + '<input type="button" class="eliminar" value="Eliminar" onclick="Eliminar('+ids+')" id="'+ids+'">' + '</td>'+

    			 '<td align="center" style="dislay:none; id="'+ids+'">' + '<input type="button" class="editar" value="Editar" onclick="Editar('+ids+')" id="'+ids+'">' +  '</td>'+'</tr>');
    }
}
function Iniciar(){

	cargarDatos();
}
function Exportar(){	

	myObj.Empleados = empleados;
	$('#jsonP').html(JSON.stringify(myObj));	
}
function Insertar(){

	$('#tabla2').show();
	$('#btnCancelar').show();
	gyr=1;
}
function Cancelar(){

	$('#idt2').val('');
	$('#nombret2').val('');
	$('#apPt2').val('');
	$('#apMt2').val('');
	$('#edad').val('');
	$('#tabla2').hide();
	$('#btnCancelar').hide();
}
function FiltroBoxesNombres(){

	var selectNombre =  document.getElementById("ListaNombre");
	var sNombre = selectNombre.options[selectNombre.selectedIndex].value;

		var idicies2=[];

		//------

		if (sNombre == 'Nombres'){

			cargarDatos();
	
		}else{

		for (var i = 0; i <empleados.length; i++) {
					
				if (empleados[i].Nombre.includes(sNombre)){
						idicies2.push(empleados[i]);
				}

		}

	//------
	myObjFiltro.Filtro = idicies2;
  	cargarDatosFiltro();
	}
}
function FiltroBoxesAP(){

	var selectAP =  document.getElementById("ListaAp");
	var sAP = selectAP.options[selectAP.selectedIndex].value;

		var idicies3=[];

		//------

		if (sAP == 'Paternos'){

			cargarDatos();
	
		}else{

		for (var i = 0; i <empleados.length; i++) {
					
				if (empleados[i].ApellidoPaterno.includes(sAP)){
						idicies3.push(empleados[i]);
				}

		}

	//------
	myObjFiltro.Filtro = idicies3;
  	cargarDatosFiltro();
	}
}
function FiltroBoxesAM(){

	var selectAM =  document.getElementById("ListaAm");
	var sAM = selectAM.options[selectAM.selectedIndex].value;

		var idicies4=[];

		//------

		if (sAM == 'Maternos'){

			cargarDatos();
	
		}else{

		for (var i = 0; i <empleados.length; i++) {
					
				if (empleados[i].ApellidoMaterno.includes(sAM)){
						idicies4.push(empleados[i]);
				}

		}

	//------
	myObjFiltro.Filtro = idicies4;
  	cargarDatosFiltro();
	}
}
function FiltroBoxesED(){

	var selectED =  document.getElementById("ListaEd");
	var sED = selectED.options[selectED.selectedIndex].value;

		var idicies5=[];

		//------

		if (sED == 'Edad'){

			cargarDatos();
	
		}else{

		for (var i = 0; i <empleados.length; i++) {
					
				if (empleados[i].Edad.includes(sED)){
						idicies5.push(empleados[i]);
				}

		}

	//------
	myObjFiltro.Filtro = idicies5;
  	cargarDatosFiltro();
	}
}
function filtroCheckBox(comp){

	var idicies7=[];
	for (var i = 0; i <empleados.length; i++) {
					
				if (empleados[i].Activo==comp){
						idicies7.push(empleados[i]);
				}
	}

	myObjFiltro.Filtro = idicies7;
  	cargarDatosFiltro();
}




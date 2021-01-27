
var gyr = 0; 
var json ="";
var empleados = [];
var idCount = 0;
var myObj = {};
var myObjFiltro = {};
var IdEditar;
var IdEditarVF;
let sinRepetidos = [];
var Pagina=0;
var Pagina2 = 0;
var nuevoEmpleado = [];
var activoElFiltro;

var registrosPaginas = 4;

$(document).on('ready',function () {	

			cargarStorage();

			$('input#Filtro').on("keyup",function(){

				var adn = $(this).val();
				Filtro(adn);

			});

			$('input#filtroActivo').on("click",function(){

			
				if( $('#filtroActivo').prop('checked') ) {

    				activoElFiltro = true;

				}else{
					activoElFiltro = false;
				}	


				filtroCheckBox(activoElFiltro);


			});

$("#btnGuardar").on( "click", function() {

	var nombre = $('#nombret2').val();
	var ap = $('#apPt2').val();
	var am = $('#apMt2').val();
	var edad = $('#edad').val();

	var comprobar='';

	if ($('#activo').prop('checked')){
	comprobar ='checked';
	activo=true;
	}else{
		comprobar='';
		activo=false;
		}


				if (gyr == 1){

				if ( ap.length == 0 || am.length == 0 || nombre.length == 0 || edad.length == 0  ){

				alert('Hay campos vacios');
				$('#btnCancelar').show();
				gyr=1;
					
					}else{

				idCount ++;
				var id = idCount;

				var emp = new Empleado(id,nombre,ap,am,edad,activo);
				empleados.push(emp);

				myObj.Empleados = empleados;
		
			cargarDatos();
				gyr=0;
      		Limpiar();


			}	

				}
	if (gyr == 2) {


	var nombre2 = $('#nombret22').val();
	var ap2 = $('#apPt22').val();
	var am2 = $('#apMt22').val();
	var ed2 = $('#edad222').val();


	if ($('#activo').prop('checked')){
		cheObj=true;

	}else{
		cheObj=false;
	}

	let obj = empleados.find(o => o.Id == IdEditar);

	obj.Nombre = nombre2;
	obj.ApellidoPaterno = ap2;
	obj.ApellidoMaterno = am2;
	obj.Edad = ed2;
	obj.Activo=cheObj;

	gyr=0;

	Limpiar();
	cargarDatos();
					
 	}

	});
});

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

	    //$('#tabla2').show();
		//$('#btnCancelar').show();

		//Nombre--------------------
		var nombre = $('*[data-nombre="'+id+'"]').html();
		$('*[data-nombre="'+id+'"]').hide();
		$('*[data-nombretd="'+id+'"]').html('<input type="text" id="nombret22" name="nombret22" value=""  >');
		$('#nombret22').val(nombre);

		//Apellido Paterno--------------------
		var apellidoPaterno = $('*[data-ApP="'+id+'"]').html();
		$('*[data-ApP="'+id+'"]').hide();
		$('*[data-ApPtd="'+id+'"]').html('<input type="text" id="apPt22" name="apPt22" value="" >');
		$('#apPt22').val(apellidoPaterno);

		//Apellido Materno--------------------
        var apellidoMaterno = $('*[data-ApM="'+id+'"]').html();
        $('*[data-ApM="'+id+'"]').hide();
        $('*[data-ApMtd="'+id+'"]').html('<input type="text" id="apMt22" name="apMt22" value="" >');
        $('#apMt22').val(apellidoMaterno);

		//Apellido Materno--------------------
		var edadd = $('*[data-Edad="'+id+'"]').html();
		$('*[data-Edad="'+id+'"]').hide();
		$('*[data-Edadtd="'+id+'"]').html('<input type="text" id="edad222" name="edad222" value="" >');
 		$('#edad222').val(edadd);


	    if ($('*[data-Activo="'+id+'"]').prop('checked')) {
	    	IdEditarVF=true;
	    	$('#activo').prop("checked", true);
	    }else{
	    	IdEditarVF=false;
			$('#activo').prop("checked", false);	
	    }


		/*	    
	
	    

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

		*/
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


    nuevoEmpleado = empleados.slice(Pagina, Pagina+registrosPaginas);



    $.each(nuevoEmpleado, function( index, empleado ) {

    			var ids=empleado.Id;

				if (empleado.Activo == true){
					comprobar ='checked';
				}else{
					comprobar='';
				}

 			$("#tabla1 tbody").append('<tr>' + 
   				 '<td align="center" style="dislay:none; id="'+ids+'">' + ids + '</td>'+
    			 '<td data-nombretd="'+ids+'" align="center" style="dislay:none; id="'+ids+'"> <div data-nombre="'+ids+'"> ' + empleado.Nombre + ' </div> </td>'+
    			 '<td data-ApPtd="'+ids+'" align="center" style="dislay:none; id="'+ids+'"> <div data-ApP="'+ids+'">' + empleado.ApellidoPaterno +'</div> </td>'+
    			 '<td data-ApMtd="'+ids+'" align="center" style="dislay:none; id="'+ids+'"> <div data-ApM="'+ids+'">' + empleado.ApellidoMaterno +' </div> </td>'+
    			 '<td data-Edadtd="'+ids+'" align="center" style="dislay:none; id="'+ids+'"> <div data-Edad="'+ids+'"> ' + empleado.Edad + ' </div> </td>'+

    			 '<td align="center" style="dislay:none; id="'+ids+'">' + '<input data-Activo="'+ids+'" type="checkbox" '+ comprobar +' class="activo" disabled value="activo"  id="' + ids+'">' + '</td>'+
    			 '<td align="center" style="dislay:none; id="'+ids+'">' + '<input type="button" class="eliminar" value="Eliminar" onclick="Eliminar('+ids+')" id="'+ids+'">' + '</td>'+
    			 '<td align="center" style="dislay:none; id="'+ids+'">' + '<input type="button" class="editar" value="Editar" onclick="Editar('+ids+')" id="'+ids+'">' +  '</td>'+'</tr>');
    });

   
         guardarStorage();
		ChecarBox();
}
function ElementosPaginador(){
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
	//$('#jsonP').html(JSON.stringify(myObj));
	//alert(JSON.stringify(myObj));

//----SwitAlert2

Swal.fire({
  width: '90rem',	
  icon: 'success',
  title: 'TRABAJADORES',
  text: JSON.stringify(myObj)
})

//-----Fin

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
function Inicio(){

	Pagina = 0;
	cargarDatos();

}
function Anterior(){

	Pagina2 = Pagina - registrosPaginas;

	if (Pagina2 >= 0 ) {
		Pagina = Pagina - registrosPaginas;
        cargarDatos();
	}
}

function Siguiente(){

	Pagina2 = Pagina + registrosPaginas;

	if (Pagina2 < empleados.length ) {
		Pagina = Pagina + registrosPaginas;
		cargarDatos();
	}
}

function Final(){

	var tamArr = empleados.length;


	if (tamArr %  registrosPaginas == 0){

		Pagina = tamArr - registrosPaginas;
		cargarDatos();

	}

	if (tamArr %  registrosPaginas == 3){

		Pagina = tamArr - (registrosPaginas-1);
		cargarDatos();

	}


	if (tamArr %  registrosPaginas == 2){

		Pagina = tamArr - (registrosPaginas-2);
		cargarDatos();

	}

	if (tamArr %  registrosPaginas == 1){

		Pagina = tamArr - (registrosPaginas-3);
		cargarDatos();

	}
}

function guardarStorage(){

	localStorage.setItem('ObjetoDatos', JSON.stringify(empleados));
	localStorage.setItem('VariableContadorId', JSON.stringify(idCount));
}

function cargarStorage(){

	var guardado = localStorage.getItem('ObjetoDatos');
	empleados=JSON.parse(guardado);

	var idCount2 = localStorage.getItem('VariableContadorId');
	idCount = JSON.parse(idCount2);

	cargarDatos();
}






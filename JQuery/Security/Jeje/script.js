
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
var Pagina1=0;
var Pagina2 = 0;
var Pagina21 = 0;
var nuevoEmpleado = [];
var nuevoEmpleado1 = [];
var activoElFiltro;
var cheObj;
var DatosJsons = [];
var deciPaginador = 1;
var indez = [];
var registrosPaginas1 = 4;
var registrosPaginas = 4;
var totalDatos;
var totalPaginas;
var contadordedatos = 0;
var totalDatosFiltro;
var totalPaginasFiltro;
var numeroPaginaActual=1;
var numeroPaginaActualFiltro=1;	

$(document).on('ready',function () {	

			$("#tabla2").hide();
			numeroPaginaActual = 1;
			var numeroPaginaActualFiltro=1;	
			cargarStorage();

			$("#btnGuardar").hide();

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

});

function validaNumericos(event) {
    if(event.charCode >= 48 && event.charCode <= 57){
      return true;
     }
     alerta(); 
     return false;
}

function Guardar(){

	$("#btnGuardar").hide();

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


	if ($('*[data-Activotd="'+IdEditar+'"]').prop('checked')){
		
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


	$('.cancelar'+id).hide();
	$('.eliminar'+id).show();
	Limpiar();
	cargarDatos();
					
 	}
}

function ChecarBox(){

	$("#ListaNombre option").remove(); 
	$("#ListaAp option").remove(); 
	$("#ListaAm option").remove(); 
	$("#ListaEd option").remove();

	$("#ListaNombre").append("<option id='opNo'>Todos</option>");
	$("#ListaAp").append("<option id='opNo'>Todos</option>");
	$("#ListaAm").append("<option id='opNo'>Todos</option>");
	$("#ListaEd").append("<option id='opNo'>Todos</option>");

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

		$('.cancelar'+IdEditar).show();
		$('.eliminar'+IdEditar).hide();

		$('.guardar'+IdEditar).show();
		$('.editar'+IdEditar).hide();


		//Nombre--------------------
		var nombre = $('*[data-nombre="'+id+'"]').html();
		$('*[data-nombre="'+id+'"]').hide();
		$('*[data-nombretd="'+id+'"]').html('<input type="text" id="nombret22" name="nombret22" value="">');
		$('#nombret22').val(nombre);

		//Apellido Paterno--------------------
		var apellidoPaterno = $('*[data-ApP="'+id+'"]').html();
		$('*[data-ApP="'+id+'"]').hide();
		$('*[data-ApPtd="'+id+'"]').html('<input type="text" id="apPt22" name="apPt22" value="">');
		$('#apPt22').val(apellidoPaterno);

		//Apellido Materno--------------------
        var apellidoMaterno = $('*[data-ApM="'+id+'"]').html();
        $('*[data-ApM="'+id+'"]').hide();
        $('*[data-ApMtd="'+id+'"]').html('<input type="text" id="apMt22" name="apMt22" value="">');
        $('#apMt22').val(apellidoMaterno);

		//Apellido Materno--------------------
		var edadd = $('*[data-Edad="'+id+'"]').html();
		$('*[data-Edad="'+id+'"]').hide();
		$('*[data-Edadtd="'+id+'"]').html('<input type="text" id="edad222" name="edad222" value="">');
 		$('#edad222').val(edadd);

 		$('*[data-Activo="'+id+'"]').hide();
 		$('*[data-Activotd="'+id+'"]').show();


 	    if ($('*[data-Activo="'+id+'"]').prop('checked')) {
	    	IdEditarVF=true;
	    	$('*[data-Activotd="'+id+'"]').prop("checked", true);
	    }else{
	    	IdEditarVF=false;
			$('*[data-Activotd="'+id+'"]').prop("checked", false);	
	    }
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
 				 '<td align="center" style="dislay:none; id="'+ids+'">' + 1 + '</td>'+
   				 '<td align="center" style="dislay:none; id="'+ids+'">' + ids + '</td>'+
    			 '<td data-nombretd="'+ids+'" align="center" style="dislay:none; id="'+ids+'"> <div data-nombre="'+ids+'"> ' + empleado.Nombre + ' </div> </td>'+
    			 '<td data-ApPtd="'+ids+'" align="center" style="dislay:none; id="'+ids+'"> <div data-ApP="'+ids+'">' + empleado.ApellidoPaterno +'</div> </td>'+
    			 '<td data-ApMtd="'+ids+'" align="center" style="dislay:none; id="'+ids+'"> <div data-ApM="'+ids+'">' + empleado.ApellidoMaterno +' </div> </td>'+
    			 '<td data-Edadtd="'+ids+'" align="center" style="dislay:none; id="'+ids+'"> <div data-Edad="'+ids+'"> ' + empleado.Edad + ' </div> </td>'+

    			 //-----Activo------

    			 '<td align="center" style="dislay:none; id="'+ids+'">' + '<input data-Activo="'+ids+'" type="checkbox" '+ comprobar +' class="activo" disabled value="activo"  id="' + ids+'"> <input style="display:none" data-Activotd="'+ids+'" type="checkbox"  class="activo"  value="activo"  id="' + ids+'">' + '</td>'+
 				
 				//-----Elimicar cancelar------

    			 '<td align="center" style="dislay:none; id="'+ids+'">' + '<button style="display:block" class="eliminar'+ids+' btn btn-danger"  onclick="confirmarEliminar('+ids+')" id="'+ids+'"> <img id="a" src="img/eliminar.png" alt="x" /> </button>' + '<input style="display:none" type="button" class="cancelar'+ids+' btn btn-warning" value="Cancelar" onclick="Cancelar('+ids+')" id="'+ids+'">'+  '</td>'+
    			 
    			 //Editar Guardar

    			 '<td align="center" style="dislay:none; id="'+ids+'">' + '<button class="editar'+ids+' btn btn-secondary" onclick="Editar('+ids+')" id="'+ids+'"> <img id="a" src="img/editar.png" alt="x" /> </button>' + '<input style="display:none" type="button" class="guardar'+ids+' btn btn-success" value="Guardar" onclick="Guardar()">' +'</td>'+'</tr>');
    });


   		 totalDatos = empleados.length;
		 $("#totalDatos").text(totalDatos);


		 totalPaginas =Math.ceil(totalDatos/4);
		 $("#totalPaginas").text(totalPaginas);


		$("#numeroPagina").text(numeroPaginaActual);	


        guardarStorage();
		ChecarBox();
}
function ElementosPaginador(){
}
function Filtro(adn){
	deciPaginador = 2;
	var idicies=[];

	//------

		for (var i = 0; i <empleados.length; i++) {
					
				if (empleados[i].Nombre.includes(adn) || empleados[i].ApellidoMaterno.includes(adn) || empleados[i].Edad.includes(adn) || empleados[i].ApellidoPaterno.includes(adn)){

						idicies.push(empleados[i]);
				}

		}

	//------

	indez = idicies;
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

    DatosJsons = JSON.parse(JSON.stringify(myObjFiltro));

    nuevoEmpleado1 = indez.slice(Pagina1, Pagina1+registrosPaginas1);

    //Aqui todo bien.......................................

    $.each(nuevoEmpleado1, function( index, empleado1 ) {
        

    			var ids=empleado1.Id;

				if (empleado1.Activo == true){
					comprobar ='checked';
				}else{
					comprobar='';
				}

 			$("#tabla1").append('<tr>' +
 			 	'<td align="center" style="dislay:none; id="'+ids+'">' + 1 + '</td>'+
   				 '<td align="center" style="dislay:none; id="'+ids+'">' + ids + '</td>'+
    			 '<td data-nombretd="'+ids+'" align="center" style="dislay:none; id="'+ids+'"> <div data-nombre="'+ids+'"> ' + empleado1.Nombre + '</div> </td>'+
    			 '<td data-ApPtd="'+ids+'" align="center" style="dislay:none; id="'+ids+'"> <div data-ApP="'+ids+'">' + empleado1.ApellidoPaterno + '</div> </td>'+
    			 '<td data-ApMtd="'+ids+'" align="center" style="dislay:none; id="'+ids+'"> <div data-ApM="'+ids+'">' + empleado1.ApellidoMaterno + ' </div></td>'+
    			 '<td data-Edadtd="'+ids+'" align="center" style="dislay:none; id="'+ids+'"> <div data-Edad="'+ids+'"> ' + empleado1.Edad + ' </div> </td>'+

    			 '<td align="center" style="dislay:none; id="'+ids+'">' + '<input data-Activo="'+ids+'" type="checkbox" '+ comprobar +' class="activo" disabled value="activo"  id="' + ids+'"> <input style="display:none" data-Activotd="'+ids+'" type="checkbox"  class="activo"  value="activo"  id="' + ids+'">' + '</td>'+

    			 '<td align="center" style="dislay:none; id="'+ids+'">' + '<button style="display:block" class="eliminar'+ids+' btn btn-danger"  onclick="confirmarEliminar('+ids+')" id="'+ids+'"> <img id="a" src="img/eliminar.png" alt="x" /> </button>' + '<input style="display:none" type="button" class="cancelar'+ids+' btn btn-warning" value="Cancelar" onclick="Cancelar('+ids+')" id="'+ids+'">'+  '</td>'+
  
    			 '<td align="center" style="dislay:none; id="'+ids+'">' + '<button class="editar'+ids+' btn btn-secondary" onclick="Editar('+ids+')" id="'+ids+'"> <img id="a" src="img/editar.png" alt="x" /> </button>' + '<input style="display:none" type="button" class="guardar'+ids+' btn btn-success" value="Guardar" onclick="Guardar()">' +'</td>'+'</tr>');


 	     });

    	totalDatosFiltro = indez.length;
		$("#totalDatos").text(totalDatosFiltro);


		totalPaginasFiltro =Math.ceil(totalDatosFiltro/4);
		$("#totalPaginas").text(totalPaginasFiltro);

		$("#numeroPagina").text(numeroPaginaActualFiltro);	


 }

function Iniciar(){
	deciPaginador = 1;

	$("#Filtro").val("");

	cargarDatos();
}
function Exportar(){	

	myObj.Empleados = empleados;
	//$('#jsonP').html(JSON.stringify(myObj));
    //alert(JSON.stringify(myObj));


	Swal.fire({
  width: '90rem',	
  icon: 'success',
  title: 'TRABAJADORES',
  text: JSON.stringify(myObj)
	})
}
function Insertar(){

	$('#tabla2').show();
	$('#btnCancelar').show();
	$('#btnGuardar').show();
	gyr=1;
}

function Cancelar(id){
	$('.cancelar'+id).hide();
	$('.eliminar'+id).show();
	$('.guardar'+id).hide();
	$('.editar'+id).show();
	$("#btnGuardar").hide();
	Limpiar();
	cargarDatos();
}

function FiltroBoxesNombres(){
	deciPaginador = 2;
	var selectNombre =  document.getElementById("ListaNombre");
	var sNombre = selectNombre.options[selectNombre.selectedIndex].value;

		var idicies2=[];

		//------

		if (sNombre == 'Todos'){
			deciPaginador = 1;
			cargarDatos();
	
		}else{

		for (var i = 0; i <empleados.length; i++) {
					
				if (empleados[i].Nombre.includes(sNombre)){
						idicies2.push(empleados[i]);
				}

		}

		indez = idicies2;

	//------
	myObjFiltro.Filtro = idicies2;
  	cargarDatosFiltro();
	}
}
function FiltroBoxesAP(){
	deciPaginador = 2;
	var selectAP =  document.getElementById("ListaAp");
	var sAP = selectAP.options[selectAP.selectedIndex].value;

		var idicies3=[];

		//------

		if (sAP == 'Todos'){
			deciPaginador = 1;
			cargarDatos();
	
		}else{

		for (var i = 0; i <empleados.length; i++) {
					
				if (empleados[i].ApellidoPaterno.includes(sAP)){
						idicies3.push(empleados[i]);
				}

		}

		indez = idicies3;

	//------
	myObjFiltro.Filtro = idicies3;
  	cargarDatosFiltro();
	}
}
function FiltroBoxesAM(){

	deciPaginador = 2;
	var selectAM =  document.getElementById("ListaAm");
	var sAM = selectAM.options[selectAM.selectedIndex].value;

		var idicies4=[];

		//------

		if (sAM == 'Todos'){
			deciPaginador = 1;
			cargarDatos();
	
		}else{

		for (var i = 0; i <empleados.length; i++) {
					
				if (empleados[i].ApellidoMaterno.includes(sAM)){
						idicies4.push(empleados[i]);
				}

		}

		indez = idicies4;

	//------
	myObjFiltro.Filtro = idicies4;
  	cargarDatosFiltro();
	}
}
function FiltroBoxesED(){
	deciPaginador = 2;
	var selectED =  document.getElementById("ListaEd");
	var sED = selectED.options[selectED.selectedIndex].value;

		var idicies5=[];

		//------

		if (sED == 'Todos'){
			deciPaginador = 1;
			cargarDatos();
	
		}else{

		for (var i = 0; i <empleados.length; i++) {
					
				if (empleados[i].Edad.includes(sED)){
						idicies5.push(empleados[i]);
				}

		}

		indez = idicies5;

	//------
	myObjFiltro.Filtro = idicies5;
  	cargarDatosFiltro();
	}
}
function filtroCheckBox(comp){
	deciPaginador = 2;
	var idicies7=[];
	for (var i = 0; i <empleados.length; i++) {
					
				if (empleados[i].Activo==comp){
						idicies7.push(empleados[i]);
				}
	}

	indez = idicies7;

	myObjFiltro.Filtro = idicies7;
  	cargarDatosFiltro();
}
function Inicio(){
	numeroPaginaActual = 1;
	numeroPaginaActualFiltro=1;

	Pagina = 0;
	Pagina1 = 0;

	if (deciPaginador == 1){

	cargarDatos();

     }	

	if (deciPaginador == 2){

		cargarDatosFiltro();
	
	}
}

function Anterior(){

	if (deciPaginador == 1) {

		Pagina2 = Pagina - registrosPaginas;

		if (Pagina2 >= 0 ) {
			numeroPaginaActual = numeroPaginaActual - 1;
			Pagina = Pagina - registrosPaginas;
   	    	cargarDatos();
		}
	}


	if (deciPaginador == 2) {

		Pagina21 = Pagina1 - registrosPaginas1;

		if (Pagina21 >= 0 ) {

			numeroPaginaActualFiltro = numeroPaginaActualFiltro - 1;
			Pagina1 = Pagina1 - registrosPaginas1;
   	    	cargarDatosFiltro();
		}
	}
}

function Siguiente(){

	if (deciPaginador == 1) {

		Pagina2 = Pagina + registrosPaginas;

		if (Pagina2 < empleados.length ) {
			numeroPaginaActual = numeroPaginaActual +1;
			Pagina = Pagina + registrosPaginas;
			cargarDatos();
		}

	}


	if (deciPaginador == 2) {
		Pagina21 = Pagina1 + registrosPaginas1;

		if (Pagina21 < indez.length ) {
			numeroPaginaActualFiltro = numeroPaginaActualFiltro +1;
			Pagina1 = Pagina1 + registrosPaginas1;
			cargarDatosFiltro();

		}

	}
}

function Final(){

	numeroPaginaActual = totalPaginas;
	numeroPaginaActualFiltro = totalPaginasFiltro;

	if (deciPaginador == 1) {

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

	if (deciPaginador == 2) {

		var tamArr1 = indez.length;


		if (tamArr1 %  registrosPaginas1 == 0){

			Pagina1 = tamArr1 - registrosPaginas1;
			cargarDatosFiltro();

		}

		if (tamArr1 %  registrosPaginas1 == 3){

			Pagina1 = tamArr1 - (registrosPaginas1-1);
			cargarDatosFiltro();

		}


		if (tamArr1 %  registrosPaginas1 == 2){

			Pagina1 = tamArr1 - (registrosPaginas1-2);
			cargarDatosFiltro();

		}

		if (tamArr1 %  registrosPaginas1 == 1){

			Pagina1 = tamArr1 - (registrosPaginas1-3);
			cargarDatosFiltro();

		}


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

function alerta(){

	Swal.fire({
	  icon: 'error',
	  title: 'Oops...',
	  text: 'Escribir tu edad en numeros  :(',

	})

}

function confirmarEliminar(id){

		  Swal.fire({
		  title: 'Estas seguro?',
		  text: "No podras volver a recuperar los datos eliminados..!",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  cancelButtonText: 'Cancelar',
		  confirmButtonText: 'Si eliminar..!'
	
	}).then((result) => {
		  if (result.value) {
		    Swal.fire(
		    	Eliminar(id),
		      'Eliminado!',
		      'Ya se elimino ',
		      'success'
		    )
		  }
		})
} 





var url3 = "";
var gyr = 0; 
var json ="";
var empleados = [];
var empleados2 = [];
var empleados3 = [];
var paginator = [];
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
var contadorDatosPagina=0;	
var contadorDatosPaginaFiltro=0;	

var filtroTodo = "";
var filtroCheck = "";


$(document).on('ready',function () {	

			$.ajax({
				url : 'https://localhost:44331/api/Persona',			
				type : 'GET',	
				dataType : 'json',	
				data : { pageNumber : 1 , pageSize: 200 },
				success : function(json) {

				empleados2=json.data;

				},

				error : function(jqXHR, status, error) {
	       		
	       		alert('Disculpe, existió un problema');
	   			
	   			}

				});




			cargarDesdeApi();

			$("#tabla2").hide();

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

function cargarDesdeApi(){

	$.ajax({
				url : 'https://localhost:44331/api/Persona',			
				type : 'GET',	
				dataType : 'json',	
				
				success : function(json) {

				empleados=json.data;
				paginator = json.meta;	
				ChecarBox();
				cargarDatos();

				},

				error : function(jqXHR, status, error) {
	       		
	       		alert('Disculpe, existió un problema');
	   			
	   			}

				});
}

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
				$('#btnGuardar').show();
				gyr=1;
					
				}else{


				$.ajax({
		            url: "https://localhost:44331/api/Persona/",
		            type: "POST",
		            data: JSON.stringify({
		                "nombre": nombre,
		                "apellidoPaterno": ap,
		                "apellidoMaterno": am,
		                "edad": edad,
		                "activo": activo
		            }),
		            dataType: "json",
		            contentType: "application/json; charset=utf-8",
		            success: function (data) {
		            	
		           	Swal.fire({
						  width: '50rem',	
						  icon: 'success',
						  title: 'CORRECTO...!',
						  text: 'Usuario Agregado Con Exito'
					});	

		            	cargarDesdeApi();	
		                
		            },
		            error: function (jqXHR, textStatus, errorThrown) {
		               	  
		               	  cargarDesdeApi()
				
		           	Swal.fire({
						  width: '50rem',	
						  icon: 'error',
						  title: 'PROBLEMAS...!',
						  text: 'Estamos presentando contratiempos :('
					});	

		             
		               
						}
		        });


			
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


	var url2 = "https://localhost:44331/api/Persona/?id="+IdEditar;

		$.ajax({
		            url: url2,
		            type: "PUT",
		            data: JSON.stringify({
		                "nombre": nombre2,
		                "apellidoPaterno": ap2,
		                "apellidoMaterno": am2,
		                "edad": ed2,
		                "activo": cheObj
		            }),
		            dataType: "json",
		            contentType: "application/json; charset=utf-8",
		            success: function (data) {
		            	
		           	Swal.fire({
						  width: '50rem',	
						  icon: 'success',
						  title: 'CORRECTO...!',
						  text: 'Usuario Actualizado Con Exito'
					});	

		            	cargarDesdeApi();	
		                
		            },
		            error: function (jqXHR, textStatus, errorThrown) {
		               

		           	Swal.fire({
						  width: '50rem',	
						  icon: 'error',
						  title: 'PROBLEMAS...!',
						  text: 'Estamos presentando contratiempos :('
					});	

		               cargarDesdeApi()
		               
						}
		        });


	gyr=0;
	$('.cancelar'+IdEditar).hide();
	$('.eliminar'+IdEditar).show();
	Limpiar();
	cargarDesdeApi();
					
 	}
}

function Eliminar(id){

	var url = "https://localhost:44331/api/Persona/"+id;
	console.log(url);

		 $.ajax({
		    type: "DELETE",
		    url: url,
		    contentType: 'application/json; charset=utf-8',
		    success: function (data) {
		      cargarDesdeApi(); 
		    },
		    error: function (erro) {
		       alert("Error");
		    }
		});


 cargarDesdeApi();

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

function cargarDatos(){
    
    $("#tabla1 tbody").empty(); 
 
 		var conteo = (paginator.actualPage * 5) - 4;

    //nuevoEmpleado = empleados.slice(Pagina, Pagina+registrosPaginas);

    	nuevoEmpleado = empleados;



    $.each(nuevoEmpleado, function( index, empleado ) {

    			
				if (empleado.activo == true){
					comprobar ='checked';
				}else{
					comprobar='';
				}
 			$("#tabla1 tbody").append('<tr>' +
 				 '<td align="center" style="dislay:none; id="'+empleado.idPersona+'">' + conteo + '</td>'+
   				 '<td align="center" style="dislay:none; id="'+empleado.idPersona+'">' + empleado.idPersona + '</td>'+
    			 '<td data-nombretd="'+empleado.idPersona+'" align="center" style="dislay:none; id="'+empleado.idPersona+'"> <div data-nombre="'+empleado.idPersona+'"> ' + empleado.nombre + ' </div> </td>'+
    			 '<td data-ApPtd="'+empleado.idPersona+'" align="center" style="dislay:none; id="'+empleado.idPersona+'"> <div data-ApP="'+empleado.idPersona+'">' + empleado.apellidoPaterno +'</div> </td>'+
    			 '<td data-ApMtd="'+empleado.idPersona+'" align="center" style="dislay:none; id="'+empleado.idPersona+'"> <div data-ApM="'+empleado.idPersona+'">' + empleado.apellidoMaterno +' </div> </td>'+
    			 '<td data-Edadtd="'+empleado.idPersona+'" align="center" style="dislay:none; id="'+empleado.idPersona+'"> <div data-Edad="'+empleado.idPersona+'"> ' + empleado.edad + ' </div> </td>'+

    			 //-----Activo------

    			 '<td align="center" style="dislay:none; id="'+empleado.idPersona+'">' + '<input data-Activo="'+empleado.idPersona+'" type="checkbox" '+ comprobar +' class="activo" disabled value="activo"  id="' + empleado.idPersona+'"> <input style="display:none" data-Activotd="'+empleado.idPersona+'" type="checkbox"  class="activo"  value="activo"  id="' + empleado.idPersona+'">' + '</td>'+
 				
 				//-----Elimicar cancelar------

    			 '<td align="center" style="dislay:none; id="'+empleado.idPersona+'">' + '<button style="display:block" class="eliminar'+empleado.idPersona+' btn btn-danger"  onclick="confirmarEliminar('+empleado.idPersona+')" id="'+empleado.idPersona+'"> <img id="a" src="img/eliminar.png" alt="x" /> </button>' + '<input style="display:none" type="button" class="cancelar'+empleado.idPersona+' btn btn-warning" value="Cancelar" onclick="Cancelar('+empleado.idPersona+')" id="'+empleado.idPersona+'">'+  '</td>'+
    			 
    			 //Editar Guardar

    			 '<td align="center" style="dislay:none; id="'+empleado.idPersona+'">' + '<button class="editar'+empleado.idPersona+' btn btn-secondary" onclick="Editar('+empleado.idPersona+')" id="'+empleado.idPersona+'"> <img id="a" src="img/editar.png" alt="x" /> </button>' + '<input style="display:none" type="button" class="guardar'+empleado.idPersona+' btn btn-success" value="Guardar" onclick="Guardar()">' +'</td>'+'</tr>');
    
 					conteo = conteo + 1;
    });


		//ChecarBox();

		 $("#totalDatos").text(paginator.totalCount);

		 $("#totalPaginas").text(paginator.totalPages);

		 $("#numeroPagina").text(paginator.actualPage);	


        //guardarStorage();
		//ChecarBox();
}

function Filtro(adn){
	deciPaginador = 2;

	url3 = "https://localhost:44331/api/Persona/Todo/"+adn;

	if (adn == ""){
		
		deciPaginador =1;
		cargarDesdeApi();

	}else{

	$.ajax({
				url : url3,			
				type : 'GET',	
				dataType : 'json',	
				
				success : function(json) {

				empleados=json.data;
				paginator = json.meta;	

				cargarDatos();

				},

				error : function(jqXHR, status, error) {
	       		
	       		alert('Disculpe, existió un problema');
	   			
	   			}

				});

	}
}

function Iniciar(){
	deciPaginador = 1;
	$("#Filtro").val("");
	cargarDesdeApi();
}

function Exportar(){	


	$.ajax({
				url : 'https://localhost:44331/api/Persona',			
				type : 'GET',
				data : { pageNumber : 1 , pageSize: 100 },	
				dataType : 'json',	
				
				success : function(json) {

				empleados=json.data;

				myObj.empleados = empleados;

					Swal.fire({
						  width: '90rem',	
						  icon: 'success',
						  title: 'TRABAJADORES',
						  text: JSON.stringify(myObj)
					});
								

				console.log(myObj.empleados);
				console.log(empleados);

				},

				error : function(jqXHR, status, error) {
	       		
	       		alert('Disculpe, existió un problema');
	   			
	   			}

				});
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

//faltan

function ChecarBox(){

	$("#ListaNombre option").remove(); 
	$("#ListaAp option").remove(); 
	$("#ListaAm option").remove(); 
	$("#ListaEd option").remove();

	$("#ListaNombre").append("<option id='opNo'>Todos</option>");
	$("#ListaAp").append("<option id='opNo'>Todos</option>");
	$("#ListaAm").append("<option id='opNo'>Todos</option>");
	$("#ListaEd").append("<option id='opNo'>Todos</option>");

	//Verif	

	//---Nombres
	var nombresEm = empleados2;
		var hash = {};
		nombresEm = nombresEm.filter(function(current) {
  		var exists = !hash[current.nombre] || false;
  		hash[current.nombre] = true;
  		return exists;
	});

	for (var i = 0; i < nombresEm.length; i++) {
		$('#ListaNombre').append('<option>' + nombresEm[i].nombre +'</option>');
	}
	//---ApellidoPaterno
	var apellidoPEm = empleados2;
		var hash = {};
		apellidoPEm = apellidoPEm.filter(function(current) {
  		var exists = !hash[current.apellidoPaterno] || false;
  		hash[current.apellidoPaterno] = true;
  		return exists;
	});

	for (var i = 0; i < apellidoPEm.length; i++) {
		$('#ListaAp').append('<option>' + apellidoPEm[i].apellidoPaterno +'</option>');
	}
	//---ApellidoMaterno

	var apellidoMEm = empleados2;
		var hash = {};empleados2
		apellidoMEm = apellidoMEm.filter(function(current) {
  		var exists = !hash[current.apellidoMaterno] || false;
  		hash[current.apellidoMaterno] = true;
  		return exists;
	});
	for (var i = 0; i < apellidoMEm.length; i++) {
		$('#ListaAm').append('<option>' + apellidoMEm[i].apellidoMaterno +'</option>');
	}

	//Edad----------
 	var edadEm = empleados2;
		var hash = {};
		edadEm = edadEm.filter(function(current) {
  		var exists = !hash[current.edad] || false;
  		hash[current.edad] = true;
  		return exists;
	});
	for (var i = 0; i < edadEm.length; i++) {
		$('#ListaEd').append('<option>' + edadEm[i].edad +'</option>');
	}
}
function FiltroBoxesNombres(){
	
	deciPaginador = 2;
	var selectNombre =  document.getElementById("ListaNombre");
	var sNombre = selectNombre.options[selectNombre.selectedIndex].value;

	if (sNombre == 'Todos') {

		cargarDesdeApi();

	}else{


	url3 = "https://localhost:44331/api/Persona?Nombre="+sNombre;

		$.ajax({
				url : url3,			
				type : 'GET',	
				dataType : 'json',	
				
				success : function(json) {

				empleados=json.data;
				paginator = json.meta;	

				cargarDatos();

				},

				error : function(jqXHR, status, error) {
	       		
	       		alert('Disculpe, existió un problema');
	   			
	   			}

				});
}

}
function FiltroBoxesAP(){
	deciPaginador = 2;
	var selectAP =  document.getElementById("ListaAp");
	var sAP = selectAP.options[selectAP.selectedIndex].value;


		if (sAP == 'Todos') {

		cargarDesdeApi();

	}else{

		url3 = "https://localhost:44331/api/Persona?ApellidoP="+sAP;

		$.ajax({
				url : url3,			
				type : 'GET',	
				dataType : 'json',	
				
				success : function(json) {

				empleados=json.data;
				paginator = json.meta;	

				cargarDatos();

				},

				error : function(jqXHR, status, error) {
	       		
	       		alert('Disculpe, existió un problema');
	   			
	   			}

				});

	}
}

function FiltroBoxesAM(){

	deciPaginador = 2;
	var selectAM =  document.getElementById("ListaAm");
	var sAM = selectAM.options[selectAM.selectedIndex].value;


			if (sAM == 'Todos') {

		cargarDesdeApi();

	}else{

	url3 = "https://localhost:44331/api/Persona?ApellidoM="+sAM;

		$.ajax({
				url : url3,			
				type : 'GET',	
				dataType : 'json',	
				
				success : function(json) {

				empleados=json.data;
				paginator = json.meta;	

				cargarDatos();

				},

				error : function(jqXHR, status, error) {
	       		
	       		alert('Disculpe, existió un problema');
	   			
	   			}

				});
	}
	
}

function FiltroBoxesED(){
	deciPaginador = 2;
	var selectED =  document.getElementById("ListaEd");
	var sED = selectED.options[selectED.selectedIndex].value;


	if (sED == 'Todos') {

		cargarDesdeApi();

	}else{

	url3 = "https://localhost:44331/api/Persona?Edad="+sED;

		$.ajax({
				url : url3,			
				type : 'GET',	
				dataType : 'json',	
				
				success : function(json) {

				empleados=json.data;
				paginator = json.meta;	

				cargarDatos();

				},

				error : function(jqXHR, status, error) {
	       		
	       		alert('Disculpe, existió un problema');
	   			
	   			}

				});

	}
		

}
function filtroCheckBox(comp){
	deciPaginador = 2;

	url3 = "https://localhost:44331/api/Persona/Activo/" + comp ;
	
	$.ajax({
				url : url3,			
				type : 'GET',	
				dataType : 'json',	
				
				success : function(json) {

				empleados=json.data;
				paginator = json.meta;	

				cargarDatos();

				},

				error : function(jqXHR, status, error) {
	       		
	       		alert('Disculpe, existió un problema');
	   			
	   			}

				});
}


//Faltan

function Inicio(){
			
			if (deciPaginador == 2){

			$.ajax({
				url : url3,			
				type : 'GET',
				data : { pageNumber : 1 },	
				dataType : 'json',	
				
				success : function(json) {

				empleados=json.data;
				paginator = json.meta;	

				cargarDatos();

				},

				error : function(jqXHR, status, error) {
	       		
	       		alert('Disculpe, existió un problema');
	   			
	   			}

				});
              					 }else{
			///Here

			$.ajax({
				url : 'https://localhost:44331/api/Persona',			
				type : 'GET',
				data : { pageNumber : 1 },	
				dataType : 'json',	
				
				success : function(json) {

				empleados=json.data;
				paginator = json.meta;	

				cargarDatos();

				},

				error : function(jqXHR, status, error) {
	       		
	       		alert('Disculpe, existió un problema');
	   			
	   			}

				});

			}
}

function Anterior(){

	if (deciPaginador == 2) {

		if (paginator.hasPreviousPage) {

			var contadorSigPage = paginator.actualPage;

					if (contadorSigPage > 0){ 

						contadorSigPage = contadorSigPage - 1;
					}else{contadorSigPage = paginator.actualPage}

					$.ajax({
						url : url3,			
						type : 'GET',
						data : { pageNumber : contadorSigPage },	
						dataType : 'json',	
						
						success : function(json) {

						empleados=json.data;
						paginator = json.meta;	

						cargarDatos();

						},

						error : function(jqXHR, status, error) {
			       		
			       		alert('Disculpe, existió un problema');
			   			
			   			}

						});
				}

			}else{
	//Here

	if (paginator.hasPreviousPage) {

	var contadorSigPage = paginator.actualPage;

			if (contadorSigPage > 0){ 

				contadorSigPage = contadorSigPage - 1;
			}else{contadorSigPage = paginator.actualPage}

			$.ajax({
				url : 'https://localhost:44331/api/Persona',			
				type : 'GET',
				data : { pageNumber : contadorSigPage },	
				dataType : 'json',	
				
				success : function(json) {

				empleados=json.data;
				paginator = json.meta;	

				cargarDatos();

				},

				error : function(jqXHR, status, error) {
	       		
	       		alert('Disculpe, existió un problema');
	   			
	   			}

				});
	}

	}

}

function Siguiente(){
	if (deciPaginador == 2) {

	if (paginator.hasNextPage) {

	var contadorSigPage = paginator.actualPage;

			if (contadorSigPage <= paginator.totalPages){ 

				contadorSigPage = contadorSigPage + 1;
			}else{contadorSigPage = paginator.actualPage}

			$.ajax({
				url : url3,				
				type : 'GET',
				data : { pageNumber : contadorSigPage },	
				dataType : 'json',	
				
				success : function(json) {

				empleados=json.data;
				paginator = json.meta;	

				cargarDatos();

				},

				error : function(jqXHR, status, error) {
	       		
	       		alert('Disculpe, existió un problema');
	   			
	   			}

				});
	}

		}else{


				if (paginator.hasNextPage) {

	var contadorSigPage = paginator.actualPage;

			if (contadorSigPage <= paginator.totalPages){ 

				contadorSigPage = contadorSigPage + 1;
			}else{contadorSigPage = paginator.actualPage}

			$.ajax({
				url :'https://localhost:44331/api/Persona',				
				type : 'GET',
				data : { pageNumber : contadorSigPage },	
				dataType : 'json',	
				
				success : function(json) {

				empleados=json.data;
				paginator = json.meta;	

				cargarDatos();

				},

				error : function(jqXHR, status, error) {
	       		
	       		alert('Disculpe, existió un problema');
	   			
	   			}

				});
	}




		}
}

function Final(){

		if (deciPaginador == 2) {

				$.ajax({
				url : url3,			
				type : 'GET',
				data : { pageNumber : paginator.totalPages },	
				dataType : 'json',	
				
				success : function(json) {

				empleados=json.data;
				paginator = json.meta;	

				cargarDatos();

				},

				error : function(jqXHR, status, error) {
	       		
	       		alert('Disculpe, existió un problema');
	   			
	   			}

				});
			 }else{

			//--here

	 			$.ajax({
				url : 'https://localhost:44331/api/Persona',			
				type : 'GET',
				data : { pageNumber : paginator.totalPages },	
				dataType : 'json',	
				
				success : function(json) {

				empleados=json.data;
				paginator = json.meta;	

				cargarDatos();

				},

				error : function(jqXHR, status, error) {
	       		
	       		alert('Disculpe, existió un problema');
	   			
	   			}

				});

					}

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

			
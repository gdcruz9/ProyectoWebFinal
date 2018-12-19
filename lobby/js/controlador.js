var peticionHTTP;
var peticionHTTP2;
var resultado;

function abrir(){
    console.log("open");
    var listado='<ul class="list-group" id="lst-proyectos">';
    $.ajax({
        url:'/db',
        data:'search=proyectos',
        method:'get',
        dataType:'json',
        success: function(result){
            
            for (var c=0;c<result.length;c++)
                listado+='<li class="list-group-item" style="cursor:pointer;"><a href="/abrir?nombre='+result[c].nombre_proyecto+'">'+result[c].nombre_proyecto+'</a></li>';
            
            listado+='</ul>';
            document.getElementById("seleccion-proyecto").innerHTML=listado;
            $("#modalAbrir").modal("show");
        }
    });
     
};

function eliminar(){
    console.log("open");
    var listado='<ul class="list-group" id="lst-proyectos">';
    $.ajax({
        url:'/db',
        data:'search=proyectos',
        method:'get',
        dataType:'json',
        success: function(result){
            
            for (var c=0;c<result.length;c++)
                listado+='<li class="list-group-item" style="cursor:pointer;"><a href="/eliminarProyecto?nombre='+result[c].nombre_proyecto+'">'+result[c].nombre_proyecto+'</a></li>';
            
            listado+='</ul>';
            document.getElementById("seleccion-proyecto-eliminar").innerHTML=listado;
            $("#modalEliminar").modal("show");
        }
    });
     
};

function tabla()
{
    if (window.XMLHttpRequest)
        peticionHTTP2 = new XMLHttpRequest();
    else 
        peticionHTTP2 = new ActiveXObject("Microsoft.XMLHTTP");
    
    peticionHTTP2.responseType='json';
    peticionHTTP2.onreadystatechange = funcTabla;
    peticionHTTP2.open('GET', '/db?search=proyectos', true);
    peticionHTTP2.send(null); 

}

function funcTabla(){

    var c;
    
    if (peticionHTTP2.readyState == 4)
        if (peticionHTTP2.status == 200)
            {
                resultado=peticionHTTP2.response;
                //console.log("resultado: "+resultado[0].fecha);
                //console.log("len: "+resultado.length);
                
                var tbl="<div class='container'>\
                    <p>Ultimos proyectos:</p>\
                    <table class='table table-hover table-striped'>\
                        <thead>\
                            <tr>\
                                <th>Nombre</th>\
                                <th>Fecha</th>\
                                <th>Descripcion</th>\
                            </tr>\
                        </thead>\
                        <tbody>";
                
                if (resultado!=null)
                    for (c=0;c<resultado.length;c++)
                        tbl+="<tr><td>"+resultado[c].nombre_proyecto+"</td><td>"+resultado[c].fecha+"</td><td>"+resultado[c].descrip+"</td></tr>"
                else
                    tbl+="<tr><td>Usted no tiene proyectos.</td></tr>";

                tbl+="</tbody>\
                    </table>\
                </div>";

                document.getElementById("tbl1").innerHTML=tbl;
            }
}

function inicializarPagina()
{
    tabla();
    descargarArchivo();
}

function descargarArchivo() {
    if (window.XMLHttpRequest)
        peticionHTTP = new XMLHttpRequest();
    else 
        peticionHTTP = new ActiveXObject("Microsoft.XMLHTTP");
    
    peticionHTTP.onreadystatechange = funcActuadora;
    peticionHTTP.open('GET', '/db?search=usuario', true);
    peticionHTTP.send(null);
}

function funcActuadora() {

    //alert('Actuando FuncActuadora');

    if (peticionHTTP.readyState == 4)
        if (peticionHTTP.status == 200)
            document.getElementById("txt").innerHTML=peticionHTTP.responseText;
}
 
function about()
{
    alert("Proyecto Desarrollo web.");
}

window.onload = inicializarPagina;
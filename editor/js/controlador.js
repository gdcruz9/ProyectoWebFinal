var guardado=false;
var db;
var indexedDB = window.indexedDB || window.webkitIndexedDB || 
window.mozIndexedDB || window.msIndexedDB;
var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

function guardar(){
    $("#myModal").modal('show');
}

$("#mnu-compartir").click(function(e){
    
});

$("#btn-guardar").click(function(e){
    parametros="nombre="+$("#txt-nombre").val()+"&"+"descrip="+$("#txta-descr").val()+"&"+"html="+$("#txt-html").html()+"&"+"js="+$("#txt-js").html()+"&"+"css="+$("#txt-css").html()+"&"+"fecha="+fecha();
    console.log(parametros);
    $.ajax({
        url:'/guardar-proyecto',
        method:"post",
        data:parametros,
        success: function(result){
                guardado=true;
                alert("Proyecto guardado");
                $("#myModal").modal('hide');
        },
        error: function(){
                alert("Ocurrio un error!");
        }
    });
    
});

$("#mnu-guardar-local").click(function(e){
    console.log($("#txt-css").html());
    var transaction = db.transaction("datos3", 'readwrite');
    var objectStore = transaction.objectStore("datos3");                    
    
    objectStore.put({id:0, codigo:$("#txt-html").html()})
    objectStore.put({id:1, codigo:$("#txt-js").html()})
    objectStore.put({id:2, codigo:$("#txt-css").html()});
    alert("Copia local guardada");  
});

$(document).ready(function(e){
        var request = indexedDB.open("DatosProyecto", 1);  
    request.onsuccess = function (evt) {
        db = request.result;                                                            
    };
 
    request.onerror = function (evt) {
        console.log("error: " + evt.target.errorCode);
    };
 
    request.onupgradeneeded = function (evt) {                   
        var objectStore = evt.currentTarget.result.createObjectStore("datos3", 
                                     { keyPath: "id", autoIncrement: true });
    };
});

function fecha()
{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    today = mm + '/' + dd + '/' + yyyy;

    return today;
}
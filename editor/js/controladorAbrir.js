var guardado=false;
var db;
var indexedDB = window.indexedDB || window.webkitIndexedDB || 
window.mozIndexedDB || window.msIndexedDB;
var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

$(document).ready(function(e){
    
    $.ajax({
        url:'/abrirArchivo',
        method:'GET',
        dataType:'json',
        success: function(result){
            $("#txt-html").html(result.html);
            $("#txt-js").html(result.js);
            $("#txt-css").html(result.css);
        },
        error: function(err){
            alert("Error!");
        }
    });
    
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

function guardar(){
    parametros="html="+$("#txt-html").html()+"&"+"js="+$("txt-js").html()+"&"+"css="+$("#txt-css").html();
    console.log(parametros);
    $.ajax({
        url:'/actualizarProyecto',
        method:'post',
        data:parametros,
        success: function(response){
            alert("Proyecto guardado.");
        },
        error: function(err){
            alert("Error!");
        }
    });
}

$("#mnu-guardar-local").click(function(e){
    console.log($("#txt-css").val());
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

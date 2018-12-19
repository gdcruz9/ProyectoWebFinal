var archivo;
var archivoAct=0;
var usuarios=[];

$(document).ready(function(e){
        
    $.ajax({
        url:'/db?search=proyectos',
        method:'get',
        success: function(result){
            console.log(result);
            $("#sel-archivos").append("<ul class='list-group'>");
            for (var c=0;c<result.length;c++)
                $("#sel-archivos").append("<li id=\'elem-"+c+"\' class=\'list-group-item\' onclick=\"window.id(\'"+result[c].idproyectos+"\',\'"+c+"\')\"style=\'cursor:pointer;width:50%\'>"+result[c].nombre_proyecto+"</li>");
            
            $("#sel-archivos").append("</ul>");
        },
        error: function(err){

        }
    });
    
    $.ajax({
        url:'/db?search=usuarios',
        method:'get',
        dataType:'json',
        success: function(result){
            $("#sel-usuarios").append("<ul class='list-group'>");
            
            for (var i=0;i<result.length;i++)
                $("#sel-usuarios").append("<li id=\'usr-"+i+"\' class=\'list-group-item\' onclick=\"window.usr(\'"+result[i].id+"\',\'"+i+"\')\" style=\'cursor:pointer;width:50%\'>"+result[i].nombre_user+"</li>");
            
            $("#sel-usuarios").append("</ul>");
        }
    });
    
});


window.id=function(i,c){
    archivo=i;
    alert(archivo+":"+c);
    document.getElementById("elem-"+archivoAct).style.color = "black";
    document.getElementById("elem-"+c).style.color = "blue";
    archivoAct=c;
}

window.usr=function(i,c){
    if (usuarios.length==0)
    {
        usuarios[0]=i;
        document.getElementById("usr-"+c).style.color = "blue";
    }
    else
    {
        usuarios[usuarios.length]=i;
        document.getElementById("usr-"+c).style.color = "blue";
    }
    
    alert(usuarios);
}

$("#btn-compartir").click(function(e){
    
    //console.log("datos: "+obj);
    console.log(archivoAct);
    $.ajax({
        url:'/compartirArchivo?archivo='+archivo,
        data:{usuarios:usuarios},
        method:'get',
        success: function(){
            alert("Archivo compartido.");
            window.location.href='/lobby/lobby.html';
        }
    });
});
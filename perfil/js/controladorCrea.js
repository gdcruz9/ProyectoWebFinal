var int_js=false;
var int_html=false;
var int_css=false;

$("#chk-js").click(function(e){
    if (int_js==true)
        int_js=false;
    else
        int_js=true;
});

$("#chk-html").click(function(e){
    if (int_html==true)
        int_html=false;
    else
        int_html=true;
});

$("#chk-css").click(function(e){
    if (int_css==true)
        int_css=false;
    else
        int_css=true;
});

$("#btn-submit").click(function(e){
    parametros="nombre="+$("#nombre").val()+"&"+"apellido="+$("#apellido").val()+"&"+"email="+$("#email").val()+"&"+"telefono="+$("#telefono").val()+"&"+"descrip="+$("#descrip").val();
    
    console.log(parametros);
    
    $.ajax({
        data:parametros,
        dataType: 'json',
        url:'/crear_perfil',
        method:'post',
        success: function(resp){
            console.log(resp);
            window.location.href=resp.url;
        console.log(resp);
        alert("perfil actualizado");
        }
    });
});

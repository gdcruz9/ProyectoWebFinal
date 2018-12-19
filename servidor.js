var express = require("express");
var app = express();
var session=require("express-session");
app.use(session({secret:"akfbakbfkadbfadfb99", resave:false, saveUninitialized:true}));
app.use(express.static('../ProyectoWeb-master/'));

var router = express.Router();

    let nombre;
    let apellido;
    let email;
    let passw;
    let plan;

var nombre_user;
var passwd;
var ssn;

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get('/cerrar_sesion',function(req, res){

    req.session=null;
    ssn=null;
    console.log('end session');
    //res.end();
    res.redirect('/login/login.html');
});

app.get('/landing.html', function(req, res){
   res.redirect("/landing/" + "landing.html" ); 
    //res.cookie('name', 'superdrive');
});

app.get('/planes/planes.html',function(req,res){
    res.redirect("/planes/" + "planes.html" ); 
});

app.get('/login_get', function(req,res){

    var mysql=require("mysql");
    
    var con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin",
    database: "superdrive",
    port: 8889
    });
    
    nombre_user = req.query.usuario;
    passwd = req.query.password;
    
    console.log(nombre_user+passwd)
    
    var sql = 'SELECT * FROM usuarios WHERE nombre_user = ? AND passw = ?;';
    
    console.log(sql);
    
    con.query(sql, [nombre_user, passwd], function (err, result) {
        if (isEmpty(result))
            res.redirect("/error/" + "error.html" ); 
        else
        {
            ssn=req.session;
            ssn.nombre_user=nombre_user;
            ssn.passw=passwd;
            res.redirect("/lobby/lobby.html" );  
            //console.log(ssn.nombre_user);
        }
        //console.log(passwd);
        //console.log(result);
    });

});

let id_user="!@#$";

app.get('/db', function(req, res){
    if (ssn){
    console.log("db");
    var mysql=require("mysql");
    
    var con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin",
    database: "superdrive",
    port: 8889
    });
    
    nombre_user = ssn.nombre_user;

    parametro = req.query.search;
    
    if (parametro=="usuario")
    {
        var sql = 'SELECT id, nombre, apellido FROM usuarios WHERE nombre_user = ?';
    
        con.query(sql, [nombre_user], function (err, result) {
            //console.log("cons: "+sql);
            if (isEmpty(result))
                res.sendFile( __dirname + "/error/" + "error.html" ); 
            else
            {
                res.write(result[0].nombre+' '+result[0].apellido);
                ssn.usuarioID=result[0].id;
                res.end();     
            }
            //console.log(passwd);
            //console.log(result);
        });
    }
    else if (parametro=="proyectos")
    {   
        var sql2= 'SELECT ID FROM usuarios WHERE nombre_user = ?;';
        
        //console.log("@@: "+nombre_user);
        //console.log("^^: "+id_user);
        
        con.query(sql2,[nombre_user], function(err,result){
            if (!err)
            {
                id_usr=result[0].ID;
                //console.log("##: "+id_usr);
                this.id_user=id_usr;
                //console.log("~~: "+this.id_user);

                var sql3 = 'SELECT * FROM proyectos WHERE owner_proyecto = '+this.id_user;
                //console.log("**: "+JSON.stringify(this.id_user));
                //console.log("sql: "+sql3);
                con.query(sql3, function (err, result) {

                    //console.log("id_user: "+id_user);
                    //console.log(typeof(id_user));
                    if (isEmpty(result)){
                        res.sendFile( __dirname + "/error/" + "error.html" ); 
                        //console.log("!!");
                    }
                    else
                    {
                        //console.log("$$:"+result[0].fecha);
                        res.setHeader('Content-Type', 'application/json');
                        res.write(JSON.stringify(result));
                        res.end();   
                    }
                });
            }
        });
            
    }
    else if(parametro=="usuarios")
    {
        var sql3="Select * FROM usuarios;";
        
        con.query(sql3,function(err, result){
                res.setHeader('Content-Type', 'application/json');
                res.write(JSON.stringify(result));
                res.end();
        });
    }
    else
    {
        res.sendFile( __dirname + "/error/" + "error.html" ); 
        //console.log("404");
    }  
            }
    else
        res.redirect('/error/error.html');
});

app.get('/perfil',function(req,res){
    if(ssn)
   res.redirect('/perfil/perfil.html'); 
    else
        res.redirect('/error/error.html');
});

app.get('/editor/editor.html',function(req,res){
    if (ssn)
    res.sendFile(__dirname+"/editor/"+"editor.html");
        
    else
        res.redirect('/error/error.html');
});

app.get('/compra_super.html',function(req,res){
    if (req.session.nombre_user)
        res.send("<h3>Super!</h3>");
    else
        res.redirect("/error/error.html");
});

app.get('/compra_ultimate.html',function(req,res){
    if (req.session.nombre_user)
        res.send("<h1>Ultimate!</h1>");
    else
        res.redirect("/error/error.html");
});

app.get('/lobby',function(req, res){
    if (ssn)
    res.redirect("/lobby/lobby.html");
    else
        res.redirect('/error/error.html');
});

app.get('/eliminarProyecto', function(req,res){
    if (ssn){
    var mysql=require("mysql");
    
    var con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin",
    database: "superdrive",
    port: 8889
    });
    
    var nombre=req.query.nombre;
    
    var sql="DELETE FROM proyectos where nombre_proyecto = ?;";
    
    con.query(sql,[nombre],function(err,result){
       if (err)
           ;
        else
        {
            res.redirect('/lobby/lobby.html');
            res.end();
        }
    });
            }
    else
        res.redirect('/error/error.html');
});

app.get('/compartirArchivo',function(req,res){
    if (ssn){ 
    var mysql=require("mysql");
    
    var con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin",
    database: "superdrive",
    port: 8889
    });
    
    var datos=req.query.usuarios;
    var archivo=req.query.archivo;
    
    console.log("datos: "+datos);
    console.log("archivo: "+archivo);
    
    var sql='INSERT INTO Comparticiones(idProyecto, idUsuario) VALUES(?,?)';
    var c=0;
    
    for (c=0;c<datos.length;c++)
        con.query(sql,[archivo,datos[c]],function(err,result){
            if (err)
                console.log("404");
            else
                console.log("OK");
        });
    
    res.send(200);
    res.end();
            }
    else
        res.redirect('/error/error.html');
});

app.post('/guardar_perfil',function(req,res){
    //console.log("nombre usr: "+ssn.nombre_user);
    if (ssn){
    var ex=true;  
    var mysql=require("mysql");
    
    var con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin",
    database: "superdrive",
    port: 8889
    });
    
    var nombre=req.body.nombre;
    var apellido=req.body.apellido;
    var email=req.body.email;
    var telefono=req.body.telefono;
    var descrip=req.body.descrip;
    
    var sql='UPDATE usuarios SET nombre = ?, apellido = ? WHERE nombre_user = ? AND passw = ? ;';
    var sql2='SELECT id FROM usuarios WHERE nombre_user = ? AND passw = ?;';
    var sql3='UPDATE perfiles SET nombre= ?, apellido = ?, email = ?, telefono = ?,int_js = true, int_html = true, int_css = true, descrip = ? WHERE id = ?;';
    
    con.query(sql,[nombre,apellido, ssn.nombre_user,ssn.passw],function(err, result){
        if (err)
        {
            console.log('404 1');
            ex=false;
        }
        else
        {
            con.query(sql2,[ssn.nombre_user,ssn.passw],function(err, result){
                if (err){
                    console.log('404 2');
                    ex=false;
                    //console.log(ssn.nombre_user);
                    //console.log(ssn.passw);
                }
                else
                {
                    var ID=result[0].id;
                    
                    con.query(sql3,[nombre, apellido, email, telefono, descrip, ID],function(err,result){
                       if (err)
                        {
                            console.log('404 3');
                            ex=false;
                        }
                        else
                        {
                            console.log('EXITO MAXIMO');
                            res.send({url:"/lobby/lobby.html"});
                        }
                    });
                }
                console.log("out");
            });
        }
    }); 
            }
    else
        res.redirect('/error/error.html');
});

app.post('/crear_perfil',function(req,res){
    //console.log("nombre usr: "+ssn.nombre_user);
        if (ssn){
    var mysql=require("mysql");
    
    var con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin",
    database: "superdrive",
    port: 8889
    });
    
    var nombre=req.body.nombre;
    var apellido=req.body.apellido;
    var email=req.body.email;
    var telefono=req.body.telefono;
    var descrip=req.body.descrip;
    
    //var sql='UPDATE usuarios SET nombre = ?, apellido = ? where nombre_user = ? AND passw = ? ;';
    var sql2='SELECT id FROM usuarios WHERE nombre_user = ? AND passw = ?;';
    var sql3='INSERT INTO perfiles(id, nombre, apellido, email, telefono,int_js, int_html, int_css, descrip) VALUES(?,?,?,?,?,1,1,1,?);';
    
            con.query(sql2,[ssn.nombre_user,ssn.passw],function(err, result){
                if (err)
                    ;
                else
                {
                    var ID=result[0].id;
                    console.log("ID: "+ID);
                    con.query(sql3,[ID, nombre, apellido, email, telefono, descrip],function(err,result){
                       if (err)
                           console.log("err");
                        else
                        {
                            res.send({url:'/lobby'});  
                        }
                    });
                }
            });
        }
    else
        res.redirect('/error/error.html');
});

app.post('/guardar-proyecto', function(req,res){
    if (ssn){
        var mysql=require("mysql");
    
        var con = mysql.createConnection({
        host: "localhost",
        user: "admin",
        password: "admin",
        database: "superdrive",
        port: 8889
        }); 
    
        var nombre=req.body.nombre;
        var fecha=req.body.fecha;
        var descrip=req.body.descrip;
        var html=req.body.html;
        var js=req.body.js;
        var css=req.body.css;
    
        var sql='SELECT id FROM usuarios WHERE nombre_user = ? AND passw = ?;';
        var sql2='INSERT INTO proyectos(nombre_proyecto, owner_proyecto, fecha, descrip) VALUES(?,?,?,?);';
        var sql3='SELECT idproyectos FROM proyectos WHERE nombre_proyecto = ? AND owner_proyecto = ?';
    
        con.query(sql,[ssn.nombre_user, ssn.passw],function(err, result){
            if (err)
                console.log("404 1");
            else
            {
                var id=result[0].id;
                
                con.query(sql2,[nombre,id,fecha,descrip],function(err, result){
                    if (err)
                        console.log("404 2");
                    else
                    {
                        con.query(sql3,[nombre, id],function(err, result){
                            if (err)
                                console.log("404 3");
                            else
                            {
                                var id2=result[0].idproyectos;
                                
                                con.query('INSERT INTO archivos_html (idProyecto, contenido) VALUES(?,?);',[id2, html],function(err, result){
                                    if (err)
                                        console.log("404 4a");
                                    else
                                    {
                                          con.query('INSERT INTO archivos_js (idProyecto, contenido) VALUES(?,?);',[id2, js],function(err, result){
                                                if (err)
                                                    console.log("404 4b");
                                                else
                                                {
                                                    con.query('INSERT INTO archivos_css (idProyecto, contenido) VALUES(?,?);',[id2, css],function(err, result){
                                                        if (err)
                                                            console.log("404 4c");
                                                        else
                                                        {
                                                            res.send(200);
                                                            res.end();
                                                        }
                                                    });  
                                                }
                                            });  
                                    }
                                });           
                            }
                        });    
                    }
                });
            }
        });
            }
    else
        res.redirect('/error/error.html');
});

app.get('/abrir',function(req,res){
    if (ssn){
    console.log(req.query.nombre);
    ssn.fileAbierto=req.query.nombre;
    res.redirect('/editor/abrir.html');
            }
    else
        res.redirect('/error/error.html');
});

var idProyecto;

app.get('/abrirArchivo',function(req,res){
    if (ssn){
        var mysql=require("mysql");
    
        var con = mysql.createConnection({
        host: "localhost",
        user: "admin",
        password: "admin",
        database: "superdrive",
        port: 8889
        }); 
    
        var sql='SELECT idproyectos FROM proyectos where nombre_proyecto = ? AND owner_proyecto = ?;';
    
        console.log("fs"+ssn.fileAbierto+" "+ssn.usuarioID);
    
        con.query(sql,[ssn.fileAbierto,ssn.usuarioID],function(err, result){
            if (err)
                console.log("404 a");
            else
            {
                idProyecto=result[0].idproyectos; 
                
                con.query('SELECT contenido FROM archivos_html where idProyecto = ?;',[idProyecto],function(err, result){
                    if (err)
                        console.log("404 b");
                    else
                    {
                        var html=result[0].contenido;
                        
                        con.query('SELECT contenido FROM archivos_js where idProyecto = ?;',[idProyecto],function(err, result){
                            if (err)
                                console.log("404 c");
                            else
                            {
                                var js=result[0].contenido;
                                
                                con.query('SELECT contenido FROM archivos_css where idProyecto = ?;',[idProyecto],function(err, result){
                                    if (err)
                                        console.log("404 d");
                                    else
                                    {
                                       var css=result[0].contenido;
                                        
                                        res.setHeader('Content-Type', 'application/json');
                                        res.send({'html':html,'js':js,'css':css});
                                        res.end();
                                    }
                                });
                            }
                        });  
                    }
                });
            }
        });
            }
    else
        res.redirect('/error/error.html');
});

app.post('/actualizarProyecto', function(req,res){
    if (ssn){
    var mysql=require("mysql");
    
        var con = mysql.createConnection({
        host: "localhost",
        user: "admin",
        password: "admin",
        database: "superdrive",
        port: 8889
        }); 
    
    var html=req.body.html;
    var js=req.body.js;
    var css=req.body.css;
    
    console.log("id: "+idProyecto);
    
    con.query('UPDATE archivos_html SET contenido = ? where idProyecto = ?;',[html, idProyecto],function(err,result){
        if (err)
            console.log("404 1");
        else
        {
            console.log("exito1");
            
            con.query('UPDATE archivos_js SET contenido = ? where idProyecto = ?;',[js, idProyecto],function(err,result){
                if (err)
                    console.log("404 2");
                else
                {
                    console.log("exito2");
                      
                    con.query('UPDATE archivos_css SET contenido = ? where idProyecto = ?;',[css, idProyecto],function(err,result){
                            if (err)
                                console.log("404 3");
                            else
                            {
                                console.log("exito3");
                                res.send(200);
                                res.end();
                            }
                        });
                }
            });
        }
    });
        }
    else
        res.redirect('/error/error.html');
});

app.post('/sign_up',function(req,res){
    
    var that=this;
    
    //console.log(req.body);
    
    var mysql=require("mysql");
    
    var con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin",
    database: "superdrive",
    port: 8889
    });
    
    con.connect(function(err){
        if (err)
        {
            res.sendFile( __dirname + "/error/" + "error.html" ); 
            //console.log("error");
        }
        else
            {
                var sql = 'INSERT INTO usuarios (nombre_user,passw,nombre,apellido,plan) VALUES(?,?,?,?,?)';
                //console.log("place2");
                con.query(sql, [req.body.email, req.body.pass, req.body.nombre, req.body.apellido, 1], function (err, result) {
                    console.log("@@:"+req.body);
                    if (err){
                        //console.log(err.message);
                        res.redirect("/error/" + "error.html" ); 
                    }
                    else
                    {
                        ssn=req.session;
                        ssn.nombre_user=req.body.email;
                        ssn.passw=req.body.pass;
                        console.log("sesion creada");
                        console.log(ssn.nombre_user);
                        res.redirect("/perfil/creaPerfil.html" );  
                    }
                });
            }
    });
    
    //res.end();
});

app.listen(8111);

console.log("up.");

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
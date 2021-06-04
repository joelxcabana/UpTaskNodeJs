exports.proyectosHome = (req,res)=>{
    res.render('index',{
        nombrePagina:'Proyectos'
    });
}

exports.formularioPoryecto = (req,res) =>{
    res.render('nuevoProyecto',{
        nombrePagina:'Nuevo Proyecto'
    });
}
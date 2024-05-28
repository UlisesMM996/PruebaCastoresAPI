import { getConnection } from "../database/connection.js";


export const getAllProducts = async(req, res) =>{
    try{
        const  pool = await getConnection();
        let result = await pool.request().query('Select * from productos')
        console.log("Resultados", result)
        if(result.recordset.length){
            res.json({status: 200, message: 'Registros encontrados', data: result.recordset})
        }else{
            res.json({status: 400, message: 'No existen registros'})
        }
    }catch(error){
        res.json({status: 400, message: error.toString()})
    }
}

export const insertProduct = async(req, res) =>{
    try{
        const  pool = await getConnection();
        await pool.request()
                .input('descripcion', req.body.descripcion)
                .input('precio', req.body.precio)
                .query('Insert into productos values ((Select MAX(productoid) + 1 from productos), @descripcion, @precio, 1, 0)')

        res.json({status: 200, message: 'Registro insertado con éxito'})
    }catch(error){
        res.json({status: 400, message: error.toString()})
    }
}

export const updateStock = async(req, res) =>{
    try{
        const  pool = await getConnection();
        await pool.request()
                    .input('id', req.body.id)
                    .input('stock', req.body.stock)
                    .query('Update Productos set unidades = unidades + @stock where productoid = @id')
        
        res.json({status: 200, message: 'Registro actualizado con éxito'})
    }catch(error){
        res.json({status: 400, message: error.toString()})
    }
}

export const updateStatus = async(req, res) =>{
    try{
        const  pool = await getConnection();
        await pool.request()
                    .input('id', req.body.id)
                    .input('estatus', req.body.estatus)
                    .query('Update Productos set estatus = @estatus where productoid = @id')
        
        res.json({status: 200, message: 'Registro actualizado con éxito'})
    }catch(error){
        res.json({status: 400, message: error.toString()})
    }
}

export const getPrductById = async(req, res) =>{
    try{
        const  pool = await getConnection();
        let result = await pool.request()
                    .input('id', req.query.id)
                    .query('Select * from productos where productoid = @id')
        if(result.recordset.length){
            res.json({status: 200, message: 'Registro localizado con éxito', data: result.recordset})
        }else{
            res.json({status: 400, message: 'No existen registros'})
        }
    }catch(error){
        res.json({status: 400, message: error.toString()})
    }
}

export const saveSalida = async(req, res) =>{
    try{
        const  pool = await getConnection();
        let total = 0;
        let folio = await pool.request().query('Select COALESCE(MAX(id), 0) + 1 as folio from EncSalidas')
        for(let i = 0; i < req.body.productos.length; i++){
            await pool.request().input('id', req.body.productos[i].productoid)
                                .input('renglon', i + 1)
                                .input('cantidad', req.body.productos[i].unidades)
                                .input('precio', req.body.productos[i].precio)
                                .input('folio', folio.recordset[0].folio)
                                .query('insert into DetSalidas values(@folio, @renglon, @id, @cantidad, @precio)')


            await pool.request().input('id', req.body.productos[i].productoid)
                                .input('cantidad', req.body.productos[i].unidades)
                                .query('update productos set unidades =  unidades - @cantidad where productoid = @id')
            total += req.body.productos[i].precio;
        }

        await pool.request().input('folio', folio.recordset[0].folio)
                            .input('usuario', req.body.usuario)
                            .input('total', total)
                            .query('Insert into encsalidas values(@folio, @usuario, GETDATE(), @total)')
        res.json({status: 200, message: 'Datos insertados correctamente'})
    }catch(error){
        res.json({status: 400, message: error.toString()})
    }
}

export const getSalidas = async(req, res) =>{
    try{
        const  pool = await getConnection();
        let result = await pool.request()
                    .query(`
                    Select ds.salidaid, ds.renglon, p.descripcion, ds.cantidad, ds.precio, us.usernom, es.fechacaptura   from DetSalidas ds
                    inner join EncSalidas es on ds.salidaid = es.id
                    inner join Productos p on ds.producto = p.productoid
                    inner join Usuario us on es.usuariocaptura = us.userid
                    `)
        if(result.recordset.length){
            res.json({status: 200, message: 'Registro localizado con éxito', data: result.recordset})
        }else{
            res.json({status: 400, message: 'No existen registros'})
        }
    }catch(error){
        res.json({status: 400, message: error.toString()})
    }
}
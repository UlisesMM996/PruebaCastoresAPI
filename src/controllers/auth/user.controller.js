import { getConnection } from "../../database/connection.js"
import config from "../../config.js"
import jwt from "jsonwebtoken"
import CryptoJS from "crypto-js";
const TOKEN_KEY = config.TOKEN_KEY;

export const verifyToken = (req, res, next) =>{
    console.log("----Me Ejecuté-----")
    const authHeader = req.headers['authorization'];
    console.log("Header: ",authHeader);
    if(!authHeader){
        return res.status(401).send("Token Required")
    }
    console.log("Llave: ", TOKEN_KEY)
    jwt.verify(authHeader, TOKEN_KEY, (err, user) =>{
        console.log("Este es mi usuario", user);
        if(err) {
            return res.status(403).send(err);
        }else{
            req.user = user;
            next();
        } 
    });
}

export const getUserByAuth = async(req, res)=>{
    console.log("Trololol: ", req.body.usuario)
    try{
        const  pool = await getConnection();
        const result = await pool.request().query(`Select * from usuario where useremail = '${req.body.usuario}'`)
        //console.log(res.json(result.recordset.Usuario))
        if (result.recordset.length){
            console.log("existo")
            if(CryptoJS.AES.decrypt(req.body.password, config.crypto_key).toString() === CryptoJS.AES.decrypt(result.recordset[0].userpassword, config.crypto_key).toString()){
                const datos ={
                    usuarioID: `${result.recordset[0].userid}`,
                    usuarioNombre: `${result.recordset[0].useremail}`,
                    rol: result.recordset[0].rol
                };
                const token = jwt.sign({ 
                    userID:datos.usuarioID,
                    email: datos.usuarioNombre},
                    TOKEN_KEY,{
                        expiresIn:"2h"
                    }
                );
                let certData = {...datos, token}
                res.status(200).json(certData);
            }else{
                console.log("no existo")
                res.status(403).json({
                    message:"Usuario o Password incorrecto"
                });
            }
            
        }
        else{
            console.log("no existo")
            res.status(403).json({
                message:"Usuario o Password incorrecto"
            });
        }
    }catch(error){
        res.json({status: 400, message: error.toString()})
    }
}

export const getUserForDesktop = async(req, res)=>{
    console.log("Trololol: ", req.body)
    const  pool = await getConnectionIonos();
    const result = await pool.request().query(`Select cveSistema, cveEmpresa, CadenaCSharp from Licencias.dbo.vwEstatusLicencia where cveCorta = '${req.body.key}' `)
    //console.log(res.json(result.recordset.Usuario))
    if (result.recordset.length){
        console.log("existo")

        res.status(200).json(result.recordset[0]);
    }
    else{
        console.log("no existo")
        res.status(403).json({
            message:"Usuario o Password incorrecto"
        });
    }
}
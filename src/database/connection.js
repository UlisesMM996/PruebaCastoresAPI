import sql from 'mssql'

const dbSettings = {
    user: "sa", 
    password: `Monjaraz24*`,
    server : "ccalzado.com",
    port: 1433,
    database: "PruebaUlises",
    requestTimeout: 130000, 
    pool:{
        max:1000,
        min: 1,
        idleTimeoutMillis: 6000000
    },
    options:{
        encrypt: true,
        trustServerCertificate: true 
    },
    dialectOptions: {
        options: { "requestTimeout": 6000000 }
      },
}


export const getConnection = async() =>{
    try{
        const pool = await sql.connect(dbSettings)
        return pool;
    }catch(error){
        console.log("Error", error)
    }
}
const mysql=require ('mysql2')
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'D@rbin2004',
    database: 'facturacion',
    port: 3307
});

db.connect((err)=>{
    if (err){
        console.log('Error conectando a la base de datos ', err);
        process.exit();
    }
    console.log('conectado a la base de datos')
});

module.exports=db;
import app from "./app.js"
import http from 'http'

app.use((req, res) => {
	res.send('Hello there !');
});

http.createServer(app).listen(3000, ()=>{
    console.log("Servidor iniciado en el puerto 3000")
})

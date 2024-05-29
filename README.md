
Para ejecutar el proyecto es necesario seguir los siguientes pasos:

1.Instalar NODE de manera global en el equipo de la siguiente pagina:
https://nodejs.org/en/download/prebuilt-installer

2.Posteriormente se requiere descargar el proyecto de git de la siguiente
URL: https://github.com/UlisesMM996/PruebaCastoresAPI por medio del comando git clone

3.Instalar las dependencias del proyecto por medio de la ejecución del siguiente comando:
npm install --force

4.Una vez instalados los paquetes del proyecto hay que ejecutar el comando npm run dev
El cual compilará y ejecutará la API, el proyecto recibe y envía información a travez del puerto 3000, actualmente la conexión a la BD se encuentra dentro de una VPS de mi propiedad
la cual uso para fines de aprendizaje y laborales por lo que quitaré la URL para la conexión
ya que tengo otras bases de datos dentro de dicha VPS, les pido por favor modificar el archivo connection.js con la intención de levantar su propio servidor de base de datos y
restaurar el .bak que le enviaré dentro de su servidor.

RUTA DEL ARCHIVO connection.js: /src/database/connection.js


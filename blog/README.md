## Plataforma de Blog - Challenge de Synagro

¡Bienvenidos al Challenge de la Plataforma de Blog de Synagro!

## Repositorio

- Repositorio del Challenge: [https://github.com/JavierSalas991/blog-challenge](https://github.com/JavierSalas991/blog-challenge)

## Instrucciones

Para comenzar sigue estas instrucciones:

### 1. Clonar el Repositorio

Clona el repositorio en tu máquina local utilizando el siguiente comando:

git clone https://github.com/JavierSalas991/blog-challenge.git

### 2. Iniciar el JSON Server

Necesitas iniciar el servidor JSON. Abre una terminal y navega hasta la carpeta Jsonserver del proyecto y ejecuta el siguiente comando:

`npm run server`

Esto iniciará el servidor JSON y proporcionará los datos necesarios para la Plataforma.

### 3. Configuración del Puerto

La aplicación está configurada para ejecutarse en el puerto 3000. Si deseas cambiar el puerto, puedes hacerlo en el archivo `.env`.

### 4. Instalación de las Dependencias

Dentro de la carpeta `blog`, ejecuta el siguiente comando para instalar todas las dependencias:

`npm install`

### 5. Ejecutar la Aplicación

Una vez que hayas instalado las dependencias, inicia la aplicación con el siguiente comando:

`npm start`

Esto iniciará el servidor de desarrollo y la Plataforma estará lista para ser utilizada.

## Pruebas unitarias

Para ejecutar las pruebas unitarias, puedes usar el siguiente comando:

`npm test`

Esto ejecutará todas las pruebas en el proyecto.

### Ejecutar pruebas individualmente

Si deseas ejecutar pruebas individuales en archivos específicos, puedes utilizar los siguientes comandos:

`npm test ./src/tests/helper.test.js`

`npm test ./src/tests/Register.test.js`

`npm test ./src/tests/Login.test.js`
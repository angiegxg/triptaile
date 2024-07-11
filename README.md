# TripTale Andaluz

Bienvenidos al repositorio de Trip Tale Adaluz, tu nueva app de viaje para descubrir Andalucía de una manera única y personalizada. Con nuestra app, puedes explorar lugares turísticos, compartir tus experiencias y hasta crear diarios de viaje completos con fotos y notas. La idea es que cada visita te cuente una historia, y tú puedas contar la tuya. Si te gusta viajar y explorar, y quieres todo al alcance de tu móvil, ¡este es tu sitio!

Echa un vistazo a nuestro código, colabora y ayúdanos a hacer de Trip Tale Adaluz la mejor app para conocer cada rincón de Andalucía.


## Screenshots

![App Screenshot](images\screnWelcome.png)


##  Instrucciones de Instalación

Install my-project with npm


Para empezar a usar o contribuir a Trip Tale Adaluz, sigue estos pasos para configurar el entorno de desarrollo en tu máquina local.

### Prerrequisitos
Asegúrate de tener instalado Git, Node.js y MongoDB en tu computadora. Estos son esenciales para descargar el repositorio, ejecutar el proyecto y manejar la base de datos.

### Clonar el Repositorio
Primero, necesitas clonar el repositorio de Trip Tale Adaluz. Abre una terminal y ejecuta:  

```bash
    git clone https://github.com/angiegxg/triptaile.git
    cd triptale-adaluz
```

```bash
   
```
### Configuración de la Base de Datos
Antes de ejecutar la aplicación, necesitas configurar MongoDB:
Asegúrate de que MongoDB esté instalado y corriendo en tu máquina. Para verificar, puedes usar:

```bash
   mongod --version
```
Crea una nueva base de datos llamada trip_tale_adaluz o el nombre que prefieras.

### Configuración del Entorno

Para configurar el entorno de desarrollo:

1. Crea un archivo .env en los directorios back y front con las variables de entorno necesarias. Aquí te dejo un ejemplo básico de lo que podrías necesitar:
    1. #### back/.env
        ```bash
        PORT=3000
        DB_URL=mongodb://localhost:27017/triptale
        HOST_URL=C:\Users\angie\OneDrive\Escritorio\master\personal\salon\triptale\back
        BASE_URL=http://localhost:3000
        IMG_URL= http://localhost:3000/api/uploads
        FILE_SERVER_URL= http://localhost:3000/api/file
        SECRET_KEY=triptale
            ```

    2. #### front/.env

        ```bash
            baseUrl: 'http://localhost:3000',
            
            ```
### Ejecutar la Aplicación
Para poner en marcha la aplicación:

1. Inicia el servidor backend desde el directorio back:

```bash
   npm start
```
2. En una nueva terminal, inicia la aplicación frontend desde el directorio front:

```bash
  ng s
```

La aplicación frontend ahora debería estar accesible en http://localhost:3000 en tu navegador, y debería conectarse al backend ejecutándose en http://localhost:4000.

¡Listo! Ahora puedes explorar, desarrollar y contribuir a mejorar Trip Tale Adaluz.


## Documentation

Para más detalles sobre cómo utilizar y entender la funcionalidad de nuestra aplicación, consulta los siguientes documentos:

- [Guía de la API](https://linktoapidocumentation) - Encuentra aquí la descripción detallada de los endpoints de la API, incluyendo parámetros, tipos de respuesta y ejemplos de uso.
- [Guía del Usuario](https://linktouserguide) - Una guía completa para usuarios que te ayudará a navegar y aprovechar al máximo nuestra aplicación.

# Proyecto Integrador Silicon Misiones: "Sistema de Gestión de Ventas para una Heladeria"
Autores: Joaquin Sanchez y Santiago Nuñez.

La idea general de este proyecto se encuentra conformada por la de facilitar tanto la venta como la gestion de las mismas 
enfocadas en el ambito de una Heladeria, a la cual llamamos (hipoteticamente) , "Heladeria Los Copos".

En el proyecto hacemos uso de roles(EMPLEADO y ADMINISTRADOR) para identificar a los usuarios, por ello se creo un Login donde se deberá ingresar
el nombre del usuario y su contraseña. Dependiendo del id de rol que posea el usuario se direccionara a una determinada pantalla u otra. Procedo a
explicar distintos casos:

- Ingresamos como EMPLEADO:

  El empleado podra crear ventas ingresando sus productos y cantidades por medio de botones, para asi agilizar la creacién de las mismas y luego cargarlas;
  como también podra visualizar los distintos Registros de las Ventas que se hayan realizado. A su vez el empleado tiene los permisos para crear pedidos de
  stock, es decir, a falta de productos en el local podrá ingresar un pedido con los productos y sus cantidades , por medio de botones; 
  y enviarlos al ADMINISTRADOR para que los procese.

- Ingresamos como ADMINISTRADOR:

  Al ingresar como ADMINISTRADOR se podra visualizar una tabla con los distintos usuarios que son capaces de ingresar al sistema, en la misma se podrá: crear,
  modificar y eliminar cualquier usuario. En el caso de crear o modificar el usuario: se debe de ingresar el Nickname, password, email y su ROL(EMPLEADO o ADMINISTRADOR).
  Luego en otra pantalla tendra la capacidad de ver los Registros de las Ventas que se realizaron, donde podra modificar el Metodo de Pago o editar y eliminar los
  detalles de la venta seleccionada. A su vez al igual que las ventas, podrá visualizar los Registros de Pedidos de Stock, que puede confirmar o rechazar. Si se preciona Confirmar
  se deberá de seleccionar el Proovedor al cual fue comendado el Pedido y confirmalo, al confirmarlo el estado de el Pedido cambiara a CONFIRMADO. Si se preciona Rechazar, el estado
  de el Pedido será RECHAZADO.

- El primer login debemos realizar con el nickname "ADMIN" y el password "ADMIN". Si esta todo correcto debe ingresar a la parte usuarios y ahi debera crear un usuario con el rol EMPLEADO para poder realizar las acciones de empleado.

# Recursos que se utilizaron para el Proyecto:
  Backend:
  - Node.js (JavaScript)
  - Express
  - MySQL (SQL)
    
  Frontend:
  - React (JSX)
  - Bootstrap 5.0
    
# Backend "Heladeria los Copos" 
Dentro de nuesto repositorio del Backend encontraremos los scrips de nuestra Base de Datos en SQL, la imagen del Diagrama de Entidad de Relacion(DER) y los archivos de las distintas 
funcionalidades del Proyecto segun sus usuraios (EMPLEADO o ADMINISTRADOR), en el lenguaje JavaScript.

 - Para iniciar nuestro Backend debemos seguir los siguientes pasos:
   
    1. Crear nuestra Base de datos en MySQL haciendo uso de el scrip que viene en el repositorio del Backend, unicamente se debe de ingresar al servidor: localHost en el puerto 8080, con la CONTRASEÑA: ,
       pegar el scrip y luego ejecutarlo, este creara la BD y las tablas que la compone, como asi tmb ingresara ciertos datos necesarios para el funcionamiento del Proyecto.
    2. Dentro del Visual en la terminal se debe de ejecutar el comando: npm install (*Esto descargara todas las dependencias que hace uso el Back*)
    3. Ejecutar el comando: nodemon (*Esto inicializara el back*)

  *Si todo es correcto se mostraran mensajes en la Terminal*

# Frontend "Heladeria los Copos" 
En nuestro Front encontraremos la carpeta de React que es en donde desarrollamos todo el Front del Proyecto, en la carpeta de src encontraremos sus distintos archivos segun sus pantallas o funcionalidades. 
Hicimos uso de Bootstrap para darle estilo a nuestra web y asi aprovechar distintas estructuras que nos proporciona.

 - Para iniciar nuestro Frontend debemos seguir los siguientes pasos:
    
    1. Abrir nuestra terminal y ubicarnos dentro de lade la carpeta Frontend mediante el siguiende comando: cd ./integrador_silicon/  (*Recomendacion: escribir cd y apretar TAB hasta que apareza ./integrador_silicon/*)
    2. Ejecutar el comando: npm install (*Esto descargara todas las dependencias que hace uso el Front*)
    3. Ejecutar el comando: npm start (*Esto inicializara el proyecto de React y nos abrira la pantalla*)

 

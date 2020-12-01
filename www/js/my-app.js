  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {
        path: '/index/',
        url: 'index.html',
      },
      {
        path: '/',
        url: 'index.html',
      },
      {
        path: '/comercios/',
        url: 'comercios.html',
      },
      {
        path: '/login/',
        url: 'login.html',
      },
      {
        path: '/panel/',
        url: 'panel.html',
      },
      {
        path: '/registro/',
        url: 'registro.html',
      },
      {
        path: '/contenido/',
        url: 'contenido.html'
          
      },
    ]
    // ... other parameters
  

// Dom Events

  });




var mainView = app.views.create('.view-main');
var email;
// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
   
   

});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
})

// Option 2. Using live 'page:init' event handlers for each page
/*
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  $$('#btnLog').on('click',fnLogin);
})

$$(document).on('page:init', '.page[data-name="about"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    // Dom Events
$$('.panel-left').on('panel:open', function () {
  console.log('Panel left: open');
});
$$('.panel-left').on('panel:opened', function () {
  console.log('Panel left: opened');
});

// Instance Events
var panelRight = app.panel.get('.panel-right-1');
panelRight.on('open', function () {
  console.log('Panel right: open');
});
panelRight.on('opened', function () {
  console.log('Panel right: opened');
});

// App Events
app.on('panelClose', function (panel) {
  console.log('Panel ' + panel.side + ': close');
});
app.on('panelClosed', function (panel) {
  console.log('Panel ' + panel.side + ': closed');
});
app.on('panelResize', function (panel, newPanelWidth) {
  console.log('Panel resized to ' + newPanelWidth + 'px');
});

  
    console.log(e);
    
})
 */ 
$$(document).on('page:init', '.page[data-name="login"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  $$('#btnLog').on('click',fnLogin);
})

$$(document).on('page:init', '.page[data-name="registro"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  $$('#btnReg').on('click',fnReg);
})
$$(document).on('page:init', '.page[data-name="panel"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
})

$$(document).on('page:init', '.page[data-name="comercios"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  
  
})

$$(document).on('page:init', '.page[data-name="contenido"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  bajarImagenes();
})


//Mis Funciones

function fnLogin () {
  email = $$('#LogEmail').val();
  password = $$('#LogPass').val();


// Funcion de Login

 firebase.auth().signInWithEmailAndPassword(email, password)
 .then( function(){
    mainView.router.navigate("/contenido/");

 })
 
 .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  $$('#logMensaje').html(errorMessage);
  console.log("entre error");
  // ...
});

}

//Funcion de Registro

function fnReg(){
var db = firebase.firestore();
var colPersonas = db.collection('Personas');

  email = $$('#RegEmail').val();
  password = $$('#RegPass').val();
  nombre = $$('#RegNombre').val();
  apellido = $$('#RegApellido').val();
  direccion = $$('#RegDireccion').val();
  claveDeColeccion = email;

  datos = {
      nombre: nombre,
      apeliido: apellido,
      foto: `mas adelante`,
      direccion: direccion
  }

   colPersonas.doc(claveDeColeccion).set(datos);

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(parametroCallBack){

    mainView.router.navigate("/index/");

  })
  
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}

//Funcion para cargar imagenes al contenido de la tienda
var database = firebase.database();
storageRef = firebase.storage().ref();

 var verduleria = firebase.database().ref().child("Comercio/Verduleria1");


function bajarImagenes(){
  var imagen = "";
  var precio = "";
  var i = 0;
  verduleria.on("value",function(snapshot){
    var datos = snapshot.val();
    $$("#comercio1").click(function(){
      
    for(var key in datos){
      i++;
      imagen += '<div id="producto"' + i + '"class="swiper-slide" ><img style= width="150px" height="150px" src="' + datos[key].url + '"/>"<div><h3> precio:  $ ' + datos[key].precio + ' <h3></div> </div> ';
      console.log(i);
          if(i <= 3){
            $$("#mercaderia").append(imagen);
          }else if(i>3 && i<=6){
            $$("#swiper1").append('<div id="swiper2" data-pagination='+ {"el": ".swiper-pagination"} + ' data-space-between="20" data-slides-per-view="2" class="swiper-container swiper-init demo-swiper"><div class="swiper-pagination"></div><div id="mercaderia1" class="swiper-wrapper"></div></div>');
            $$("#mercaderia1").append(imagen);
          }else{
            $$("#swiper2").append('<div id="swiper3" data-pagination='+ {"el": ".swiper-pagination"} + ' data-space-between="20" data-slides-per-view="2" class="swiper-container swiper-init demo-swiper"><div class="swiper-pagination"></div><div id="mercaderia1" class="swiper-wrapper"></div></div>');
            $$("#mercaderia2").append(imagen);
          }






    }
    

}); 
  
    
    console.log(datos);
    console.log(i);
  })

}
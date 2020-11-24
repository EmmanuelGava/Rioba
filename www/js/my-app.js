  
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
        path: '/about/',
        url: 'about.html',
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
    ]
    // ... other parameters
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

$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  $$('#btnLog').on('click',fnLogin);
})

$$(document).on('page:init', '.page[data-name="about"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);
    alert('Hello');
})

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

//Mis Funciones

function fnLogin () {
  email = $$('#LogEmail').val();
  password = $$('#LogPass').val();


// Funcion de Login

 firebase.auth().signInWithEmailAndPassword(email, password)
 .then( function(){
    mainView.router.navigate("/panel/");

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
  
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
 app.sheet.create({
    el: '.my-sheet-swipe-to-step',
    swipeToClose: true,
    swipeToStep: true,
    backdrop: true,
  });

// create searchbar
var searchbar = app.searchbar.create({
  el: '.searchbar',
  searchContainer: '.swiper-pagination',
  searchIn: '.item-title',
  on: {
    search(sb, query, previousQuery) {
      console.log(query, previousQuery);
    }
  }
});

// Dom Events
$$('.panel-left').on('panel:open', function () {
  console.log('Panel left: open');
});
$$('.panel-left').on('panel:opened', function () {
  console.log('Panel left: opened');
});



// App Events
$$(document).on('page:init', function (e) {
  // Do something here when page loaded and initialized
  var stepper = app.stepper.create({
    el: '.stepper',
    on: {
      change: function () {
        console.log('Stepper value changed')
      }
    }
  })

 



app.on('panelClose', function (panel) {
  console.log('Panel ' + panel.side + ': close');
});
app.on('panelClosed', function (panel) {
  console.log('Panel ' + panel.side + ': closed');
});
app.on('panelResize', function (panel, newPanelWidth) {
  console.log('Panel resized to ' + newPanelWidth + 'px');
});

var mainView = app.views.create('.view-main');
var email;
// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    $$('#btnPanelCom').on('click',function(){mainView.router.navigate("/comercios/")});
    $$('#btnPanelCat').on('click',function(){mainView.router.navigate("/comercios/")});
    $$('#btnPanelLog').on('click',function(){mainView.router.navigate("/login/")});
    $$('#btnPanelReg').on('click',function(){mainView.router.navigate("/registro/")});
    $$('#btnPanelCuenta').on('click',function(){mainView.router.navigate("/panel/")});
    $$('#btnPanelCerrarSesion').on('click',function(){mainView.router.navigate("/cerrarSesion/")});
    
    

});


// Option 1. Using one 'page:init' handler for all pages

    
    bajarImagenes();
    console.log(e);
})


$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  
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

$$(document).on('page:init', '.page[data-name="comercios"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  
  
})

$$(document).on('page:init', '.page[data-name="contenido"]', function (e) {
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

 var fruta = firebase.database().ref().child("Comercio/Verduleria1/Fruta").limitToLast(3);
 var verdura = firebase.database().ref().child("Comercio/Verduleria1/Verdura").limitToLast(3);
 var legumbres = firebase.database().ref().child("Comercio/Verduleria1/Legumbres").limitToLast(3);

function bajarImagenes(){
  var imagen = "";
  var imagen2 = "";
  var imagen3 = "";
  var precio = "";
 
  var i = 0;
  fruta.on("value",function(snapshot){
    var datos = snapshot.val();
    
    
    for(var key in datos){
      i++;  
      
        
      imagen += '<div id="Sector1elemento' + i + '""class="col-50 medium-25" ><div><h3> ' + datos[key].nombre + ' <h3></div><img style= width="100px" height="100px" src="' + datos[key].url + '"/>"<div><h4> precio:  $ ' + datos[key].precio + ' <h4></div><div class="block block-strong text-align-center"><div class="row"><div class="stepper stepper-fill stepper-init" data-wraps="true" data-autorepeat="true" data-autorepeat-dynamic="true" data-decimal-point="2" data-manual-input-mode="true"><div class="stepper-button-minus"></div><div class="stepper-input-wrap"><input type="text" value="0" min="0" max="1000" step="1"></div><div class="stepper-button-plus"></div><button id ="addCart" class="buttonAdd"><span  class="material-icons">add_shopping_cart</span></button></div></div></div></div> ';
        console.log(i);
    }
    //document.getElementById("content1").innerHTML = imagen;
    $$('#content1').html(imagen)
    
    
  })
  verdura.on("value",function(snapshot){
    var datos = snapshot.val();
    
    
    for(var key in datos){
      i++;  
      
        
      imagen2 += '<div id="Sector2elemento' + i + '""class="col-50 medium-25" ><div><h3> ' + datos[key].nombre + ' <h3></div><img style= width="100px" height="100px" src="' + datos[key].url + '"/>"<div><h4> precio:  $ ' + datos[key].precio + ' <h4></div><div class="block block-strong text-align-center"><div class="row"><div class="stepper stepper-fill stepper-init" data-wraps="true" data-autorepeat="true" data-autorepeat-dynamic="true" data-decimal-point="2" data-manual-input-mode="true"><div class="stepper-button-minus"></div><div class="stepper-input-wrap"><input type="text" value="0" min="0" max="1000" step="1"></div><div class="stepper-button-plus"></div><button id ="addCart" class="buttonAdd"><span  class="material-icons">add_shopping_cart</span></button></div></div></div></div> ';
        console.log(i);
    }
    //document.getElementById("content2").innerHTML = imagen2;
    $$('#content2').html(imagen2)
    
    
  })
  legumbres.on("value",function(snapshot){
    var datos = snapshot.val();
    
    
    for(var key in datos){
      i++;  
      
        
      imagen3 += '<div id="Sector3elemento' + i + '""class="col-50 medium-25" ><div><h3> ' + datos[key].nombre + ' <h3></div><img style= width="100px" height="100px" src="' + datos[key].url + '"/>"<div><h4> precio:  $ ' + datos[key].precio + ' <h4></div><div class="block block-strong text-align-center"><div class="row"><div class="stepper stepper-fill stepper-init" data-wraps="true" data-autorepeat="true" data-autorepeat-dynamic="true" data-decimal-point="2" data-manual-input-mode="true"><div class="stepper-button-minus"></div><div class="stepper-input-wrap"><input type="text" value="0" min="0" max="1000" step="1"></div><div class="stepper-button-plus"></div><button id ="addCart" class="buttonAdd"><span  class="material-icons">add_shopping_cart</span></button></div></div></div></div> ';;
        console.log(i);
    }
    //document.getElementById("content2").innerHTML = imagen2;
    $$('#content3').html(imagen3)
    
    
  })

}




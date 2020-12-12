  
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
  });
  // Dom Events
  //Pop Over Cerrar Sesion
  $$('.dynamic-popover').on('click', function () {
    dynamicPopover.open();
  });
  

  var mainView = app.views.create('.view-main');
  

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
var stepper = app.stepper.create({
  el: '.stepper',
  on: {
    change: function () {
      console.log('Stepper value changed')
    }
  }
})


$$('.panel-left').on('panel:open', function () {
  console.log('Panel left: open');
});
$$('.panel-left').on('panel:opened', function () {
  console.log('Panel left: opened');
});
app.on('panelClose', function (panel) {
  console.log('Panel ' + panel.side + ': close');
});
app.on('panelClosed', function (panel) {
  console.log('Panel ' + panel.side + ': closed');
});
app.on('panelResize', function (panel, newPanelWidth) {
  console.log('Panel resized to ' + newPanelWidth + 'px');
});



// App Events
$$(document).on('page:init', function (e) {
  // Do something here when page loaded and initialized
  
  bajarImagenes();
 
});




// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    $$('#btnPanelHome').on('click',function(){mainView.router.navigate("/index/")});
    $$('#btnPanelCom').on('click',function(){mainView.router.navigate("/comercios/")});
    $$('#btnPanelCat').on('click',function(){mainView.router.navigate("/contenido/")});
    $$('#btnPanelLog').on('click',function(){mainView.router.navigate("/login/")});
    $$('#btnPanelReg').on('click',function(){mainView.router.navigate("/registro/")});
    $$('#btnPanelCuenta').on('click',function(){mainView.router.navigate("/panel/")});
    $$('#btnPanelCerrarSesion').on('click',function(){mainView.router.navigate("/cerrarSesion/")});
    $$('#indexComer1').on('click',function(){mainView.router.navigate("/contenido/")});
    $$('#btnPanelCerrarSesion').on('click',cerrarSesion);

});


// Option 1. Using one 'page:init' handler for all pages

    
    



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
  console.log("comercio");
  $$('#btnComercio1').on('click',function(){mainView.router.navigate("/contenido/")});
})

$$(document).on('page:init', '.page[data-name="contenido"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log("contenido");
  
  cartClick();
})


//Mis Funciones
//Variables Globales
var email;
var total = 0;
var valorStepper = 0;


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

//Funcion Sign Out
function cerrarSesion(){
firebase.auth().signOut().then(function() {

  alert("Sesion Cerrada");

  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
  console.log(error);
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
      direccion: direccion,
      carrito: email,
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
      
        
      imagen += '<div id="Sector1elemento' + i + '""class="col-50 medium-25" ><div><h3> ' + datos[key].nombre + ' <h3></div><img style= width="100px" height="100px" src="' + datos[key].url + '"/>"<div><h4> precio:  $ ' + datos[key].precio + ' <h4></div><div class="block block-strong text-align-center"><div class="row"><div class="stepper stepper-fill stepper-init" data-wraps="true" data-autorepeat="true" data-autorepeat-dynamic="true" data-decimal-point="2" data-manual-input-mode="true"><div class="stepper-button-minus"></div><div class="stepper-input-wrap"><input id="stepperSec1' + i + '"" type="text" value="0" min="0" max="1000" step="1"></div><div class="stepper-button-plus"></div><button  id="addCartSec1' + i + '"" class="col button button-raised"><span  class="material-icons">add_shopping_cart</span></button></div></div></div></div> ';
        console.log(i);
    }
    //document.getElementById("content1").innerHTML = imagen;
    $$('#content1').html(imagen)
    
    
  })
  verdura.on("value",function(snapshot){
    var datos = snapshot.val();
    
    
    for(var key in datos){
      i++;  
      
        
      imagen2 += '<div id="Sector2elemento' + i + '""class="col-50 medium-25" ><div><h3> ' + datos[key].nombre + ' <h3></div><img style= width="100px" height="100px" src="' + datos[key].url + '"/>"<div><h4> precio:  $ ' + datos[key].precio + ' <h4></div><div class="block block-strong text-align-center"><div class="row"><div class="stepper stepper-fill stepper-init" data-wraps="true" data-autorepeat="true" data-autorepeat-dynamic="true" data-decimal-point="2" data-manual-input-mode="true"><div class="stepper-button-minus"></div><div class="stepper-input-wrap"><input id="stepperSec1' + i + '"" type="text" value="0" min="0" max="1000" step="1"></div><div class="stepper-button-plus"></div><button  id="addCartSec1' + i + '"" class="col button button-raised"><span  class="material-icons">add_shopping_cart</span></button></div></div></div></div> ';
        console.log(i);
    }
    //document.getElementById("content2").innerHTML = imagen2;
    $$('#content2').html(imagen2)
    
    
  })
  legumbres.on("value",function(snapshot){
    var datos = snapshot.val();
    
    
    for(var key in datos){
      i++;  
      
        
      imagen3 += '<div id="Sector3elemento' + i + '""class="col-50 medium-25" ><div><h3> ' + datos[key].nombre + ' <h3></div><img style= width="100px" height="100px" src="' + datos[key].url + '"/>"<div><h4> precio:  $ ' + datos[key].precio + ' <h4></div><div class="block block-strong text-align-center"><div class="row"><div class="stepper stepper-fill stepper-init" data-wraps="true" data-autorepeat="true" data-autorepeat-dynamic="true" data-decimal-point="2" data-manual-input-mode="true"><div class="stepper-button-minus"></div><div class="stepper-input-wrap"><input id="stepperSec1' + i + '"" type="text" value="0" min="0" max="1000" step="1"></div><div class="stepper-button-plus"></div><button  id="addCartSec1' + i + '"" class="col button button-raised"><span  class="material-icons">add_shopping_cart</span></button></div></div></div></div> ';
        console.log(i);
    }
    //document.getElementById("content2").innerHTML = imagen2;
    $$('#content3').html(imagen3)
    
    
  })

}



//firestone


function cartClick(){
  var db = firebase.firestore();
  // Create a reference to the cities collection
  var VerduRef = db.collection("Comercios/verduleria@prueba.com/Productos");
  $$('#addCartSec11').on('click',function(){
  
    var query = VerduRef.where("id", "==", "PV001")
    .get()
       .then(function(querySnapshot) {
           querySnapshot.forEach(function(doc) {
            var valorStepper = $$('#stepperSec11').val();
            precio = doc.data().precio;
            var totalproducto = 0; 
            totalproducto =  precio * valorStepper;
            total += totalproducto;
            $$('#cajaItems').prepend('<li class="item-content"><div class="item-inner"><div  class="item-title">'+ doc.data().Descripcion +'</div><div id="item1Cantidad"class="item-after text-color-black">'+ valorStepper +'</div><div id="item1Precio"class="item-after text-color-black">'+ doc.data().precio +'</div><div id="item1Precio"class="item-after text-color-black">$ '+ totalproducto +'</div></div></li>');
            
            
            $$('#totalItems').html("$ " + total);
  
            
            // doc.data() is never undefined for query doc snapshots
               console.log(doc.data());
              // console.log(doc.id, " => ", doc.data());
              // var carritoDocRef = db.collection("Personas").doc(email);
              carritoDocRef.update({
                carrito: firebase.firestore.FieldValue.arrayUnion(doc.data())
            });
             
           });
           valorStepper = 0;
       })
       .catch(function(error) {
           console.log("Error getting documents: ", error);
       });
  
       
  
  });

  $$('#addCartSec12').on('click',function(){
  
    var query = VerduRef.where("id", "==", "PV002")
    .get()
       .then(function(querySnapshot) {
           querySnapshot.forEach(function(doc) {
            var valorStepper = $$('#stepperSec12').val();
            precio = doc.data().precio;
            var totalproducto = 0; 
            totalproducto =  precio * valorStepper;
            total += totalproducto;
            $$('#cajaItems').prepend('<li class="item-content"><div class="item-inner"><div  class="item-title">'+ doc.data().Descripcion +'</div><div id="item1Cantidad"class="item-after text-color-black">'+ valorStepper +'</div><div id="item1Precio"class="item-after text-color-black">'+ doc.data().precio +'</div><div id="item1Precio"class="item-after text-color-black">$ '+ totalproducto +'</div></div></li>');
            
            
            $$('#totalItems').html("$ " + total);
  
            
            // doc.data() is never undefined for query doc snapshots
               console.log(doc.data());
              // console.log(doc.id, " => ", doc.data());
              // var carritoDocRef = db.collection("Personas").doc(email);
              carritoDocRef.update({
                carrito: firebase.firestore.FieldValue.arrayUnion(doc.data())
            });
             
           });
           valorStepper = 0;
       })
       .catch(function(error) {
           console.log("Error getting documents: ", error);
       });
  
       
  
  });

  $$('#addCartSec13').on('click',function(){
  
    var query = VerduRef.where("id", "==", "PV003")
    .get()
       .then(function(querySnapshot) {
           querySnapshot.forEach(function(doc) {
            var valorStepper = $$('#stepperSec13').val();
            precio = doc.data().precio;
            var totalproducto = 0; 
            totalproducto =  precio * valorStepper;
            total += totalproducto;
            $$('#cajaItems').prepend('<li class="item-content"><div class="item-inner"><div  class="item-title">'+ doc.data().Descripcion +'</div><div id="item1Cantidad"class="item-after text-color-black">'+ valorStepper +'</div><div id="item1Precio"class="item-after text-color-black">'+ doc.data().precio +'</div><div id="item1Precio"class="item-after text-color-black">$ '+ totalproducto +'</div></div></li>');
            
            
            $$('#totalItems').html("$ " + total);
  
            
            // doc.data() is never undefined for query doc snapshots
               console.log(doc.data());
              // console.log(doc.id, " => ", doc.data());
              // var carritoDocRef = db.collection("Personas").doc(email);
              carritoDocRef.update({
                carrito: firebase.firestore.FieldValue.arrayUnion(doc.data())
            });
             
           });
           valorStepper = 0;
       })
       .catch(function(error) {
           console.log("Error getting documents: ", error);
       });
  
       
  
  });

  $$('#addCartSec14').on('click',function(){
  
    var query = VerduRef.where("id", "==", "PV004")
    .get()
       .then(function(querySnapshot) {
           querySnapshot.forEach(function(doc) {
            var valorStepper = $$('#stepperSec14').val();
            precio = doc.data().precio;
            var totalproducto = 0; 
            totalproducto =  precio * valorStepper;
            total += totalproducto;
            $$('#cajaItems').prepend('<li class="item-content"><div class="item-inner"><div  class="item-title">'+ doc.data().Descripcion +'</div><div id="item1Cantidad"class="item-after text-color-black">'+ valorStepper +'</div><div id="item1Precio"class="item-after text-color-black">'+ doc.data().precio +'</div><div id="item1Precio"class="item-after text-color-black">$ '+ totalproducto +'</div></div></li>');
            
            
            $$('#totalItems').html("$ " + total);
  
            
            // doc.data() is never undefined for query doc snapshots
               console.log(doc.data());
              // console.log(doc.id, " => ", doc.data());
              // var carritoDocRef = db.collection("Personas").doc(email);
              carritoDocRef.update({
                carrito: firebase.firestore.FieldValue.arrayUnion(doc.data())
            });
             
           });
           valorStepper = 0;
       })
       .catch(function(error) {
           console.log("Error getting documents: ", error);
       });
  
       
  
  });

  $$('#addCartSec15').on('click',function(){
  
    var query = VerduRef.where("id", "==", "PV005")
    .get()
       .then(function(querySnapshot) {
           querySnapshot.forEach(function(doc) {
            var valorStepper = $$('#stepperSec15').val();
            precio = doc.data().precio;
            var totalproducto = 0; 
            totalproducto =  precio * valorStepper;
            total += totalproducto;
            $$('#cajaItems').prepend('<li class="item-content"><div class="item-inner"><div  class="item-title">'+ doc.data().Descripcion +'</div><div id="item1Cantidad"class="item-after text-color-black">'+ valorStepper +'</div><div id="item1Precio"class="item-after text-color-black">'+ doc.data().precio +'</div><div id="item1Precio"class="item-after text-color-black">$ '+ totalproducto +'</div></div></li>');
            
            
            $$('#totalItems').html("$ " + total);
  
            
            // doc.data() is never undefined for query doc snapshots
               console.log(doc.data());
              // console.log(doc.id, " => ", doc.data());
              // var carritoDocRef = db.collection("Personas").doc(email);
              carritoDocRef.update({
                carrito: firebase.firestore.FieldValue.arrayUnion(doc.data())
            });
             
           });
           valorStepper = 0;
       })
       .catch(function(error) {
           console.log("Error getting documents: ", error);
       });
  
       
  
  });

  $$('#addCartSec16').on('click',function(){
  
    var query = VerduRef.where("id", "==", "PV006")
    .get()
       .then(function(querySnapshot) {
           querySnapshot.forEach(function(doc) {
            var valorStepper = $$('#stepperSec16').val();
            precio = doc.data().precio;
            var totalproducto = 0; 
            totalproducto =  precio * valorStepper;
            total += totalproducto;
            $$('#cajaItems').prepend('<li class="item-content"><div class="item-inner"><div  class="item-title">'+ doc.data().Descripcion +'</div><div id="item1Cantidad"class="item-after text-color-black">'+ valorStepper +'</div><div id="item1Precio"class="item-after text-color-black">'+ doc.data().precio +'</div><div id="item1Precio"class="item-after text-color-black">$ '+ totalproducto +'</div></div></li>');
            
            
            $$('#totalItems').html("$ " + total);
  
            
            // doc.data() is never undefined for query doc snapshots
               console.log(doc.data());
              // console.log(doc.id, " => ", doc.data());
              // var carritoDocRef = db.collection("Personas").doc(email);
              carritoDocRef.update({
                carrito: firebase.firestore.FieldValue.arrayUnion(doc.data())
            });
             
           });
           valorStepper = 0;
       })
       .catch(function(error) {
           console.log("Error getting documents: ", error);
       });
  
       
  
  });

  $$('#addCartSec17').on('click',function(){
  
    var query = VerduRef.where("id", "==", "PV007")
    .get()
       .then(function(querySnapshot) {
           querySnapshot.forEach(function(doc) {
            var valorStepper = $$('#stepperSec11').val();
            precio = doc.data().precio;
            var totalproducto = 0; 
            totalproducto =  precio * valorStepper;
            total += totalproducto;
            $$('#cajaItems').prepend('<li class="item-content"><div class="item-inner"><div  class="item-title">'+ doc.data().Descripcion +'</div><div id="item1Cantidad"class="item-after text-color-black">'+ valorStepper +'</div><div id="item1Precio"class="item-after text-color-black">'+ doc.data().precio +'</div><div id="item1Precio"class="item-after text-color-black">$ '+ totalproducto +'</div></div></li>');
            
            
            $$('#totalItems').html("$ " + total);
  
            
            // doc.data() is never undefined for query doc snapshots
               console.log(doc.data());
              // console.log(doc.id, " => ", doc.data());
              // var carritoDocRef = db.collection("Personas").doc(email);
              carritoDocRef.update({
                carrito: firebase.firestore.FieldValue.arrayUnion(doc.data())
            });
             
           });
           valorStepper = 0;
       })
       .catch(function(error) {
           console.log("Error getting documents: ", error);
       });
  
       
  
  });

  $$('#addCartSec18').on('click',function(){
  
    var query = VerduRef.where("id", "==", "PV008")
    .get()
       .then(function(querySnapshot) {
           querySnapshot.forEach(function(doc) {
            var valorStepper = $$('#stepperSec18').val();
            precio = doc.data().precio;
            var totalproducto = 0; 
            totalproducto =  precio * valorStepper;
            total += totalproducto;
            $$('#cajaItems').prepend('<li class="item-content"><div class="item-inner"><div  class="item-title">'+ doc.data().Descripcion +'</div><div id="item1Cantidad"class="item-after text-color-black">'+ valorStepper +'</div><div id="item1Precio"class="item-after text-color-black">'+ doc.data().precio +'</div><div id="item1Precio"class="item-after text-color-black">$ '+ totalproducto +'</div></div></li>');
            
            
            $$('#totalItems').html("$ " + total);
  
            
            // doc.data() is never undefined for query doc snapshots
               console.log(doc.data());
              // console.log(doc.id, " => ", doc.data());
              // var carritoDocRef = db.collection("Personas").doc(email);
              carritoDocRef.update({
                carrito: firebase.firestore.FieldValue.arrayUnion(doc.data())
            });
             
           });
           valorStepper = 0;
       })
       .catch(function(error) {
           console.log("Error getting documents: ", error);
       });
  
       
  
  });

  $$('#addCartSec19').on('click',function(){
  
    var query = VerduRef.where("id", "==", "PV009")
    .get()
       .then(function(querySnapshot) {
           querySnapshot.forEach(function(doc) {
            var valorStepper = $$('#stepperSec19').val();
            precio = doc.data().precio;
            var totalproducto = 0; 
            totalproducto =  precio * valorStepper;
            total += totalproducto;
            $$('#cajaItems').prepend('<li class="item-content"><div class="item-inner"><div  class="item-title">'+ doc.data().Descripcion +'</div><div id="item1Cantidad"class="item-after text-color-black">'+ valorStepper +'</div><div id="item1Precio"class="item-after text-color-black">'+ doc.data().precio +'</div><div id="item1Precio"class="item-after text-color-black">$ '+ totalproducto +'</div></div></li>');
            
            
            $$('#totalItems').html("$ " + total);
  
            
            // doc.data() is never undefined for query doc snapshots
               console.log(doc.data());
              // console.log(doc.id, " => ", doc.data());
              // var carritoDocRef = db.collection("Personas").doc(email);
              carritoDocRef.update({
                carrito: firebase.firestore.FieldValue.arrayUnion(doc.data())
            });
             
           });
           valorStepper = 0;
       })
       .catch(function(error) {
           console.log("Error getting documents: ", error);
       });
  
       
  
  });

}
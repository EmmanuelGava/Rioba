  
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
      {
        path: '/pedidos/',
        url: 'pedidos.html'
      },
      {
        path: '/categorias/',
        url: 'categorias.html'
      },
    ]
    // ... other parameters
  });
  // Dom Events
  // DOM events for About popup
$$('.popup-about').on('popup:open', function (e) {
  console.log('About popup open');
});
$$('.popup-about').on('popup:opened', function (e) {
  console.log('About popup opened');
});

  //Pop Over Sesion No iniciada
  var dynamicPopover = app.popover.create({
    targetEl: 'a.dynamic-popover',
    content: '<div class="popover">'+
                '<div class="popover-inner">'+
                  '<div class="block">'+
                    '<p>Para realizar la compra necesita iniciar sesion o registrarse.</p>'+
                    '<p><a id="btnPOLogin" href="/login/" class="button button-raised link popover-close">Loguearse</a></p>'+
                    '<p><a id="btnPOReg" href="/registro/"class="button button-raised link popover-close">Registrarse</a></p>'+
                    '<p><a href="contenido.html" class="link popover-close">Cerrar</a></p>'+
                  '</div>'+
                '</div>'+
              '</div>',
    // Events
    on: {
      open: function (popover) {
        console.log('Popover open');
      },
      opened: function (popover) {
        console.log('Popover opened');
      },
    }
  });
  // Events also can be assigned on instance later
dynamicPopover.on('close', function (popover) {
  console.log('Popover close');
});
dynamicPopover.on('closed', function (popover) {
  console.log('Popover closed');
});

// Open dynamic popover
$$('.dynamic-popover').on('click', function () {
  dynamicPopover.open();
});



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
  productosCat()
  bajarImagenes();
  cartClick();
 
});




// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    $$('#btnPanelHome').on('click',function(){mainView.router.navigate("/index/")});
    $$('#btnPanelCom').on('click',function(){mainView.router.navigate("/comercios/")});
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
  $$('#indexComer1').on('click',function(){mainView.router.navigate("/contenido/")});
  
})

$$(document).on('page:init', '.page[data-name="categorias"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  productosCat()
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
$$(document).on('page:init', '.page[data-name="pedidos"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  
  

  
})

$$(document).on('page:init', '.page[data-name="contenido"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log("contenido");
  $$('#btnVpago').on('click',fnUserStatus);
  $$('#btnMpago').on('click',fnUserStatus);
  
  
  $$('#Cat1').on('click',function(){mainView.router.navigate("/categorias/")});
  

})


//Mis Funciones
//Variables Globales
var email;
var totalproducto = 0;
var total = 0;
var valorStepper = 0;


function fnLogin () {
  email = $$('#LogEmail').val();
  password = $$('#LogPass').val();


// Funcion de Login

 firebase.auth().signInWithEmailAndPassword(email,password)
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

//Funcion para comprobar si ha iniciado sesion.

function fnUserStatus(){
  var user = firebase.auth().currentUser;

  if (user) {
    mainView.router.navigate('/pedidos/');
   
    
  } else {
    
      dynamicPopover.open();
    
   
  }

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

    mainView.router.navigate("/comercios/");

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

 var fruta = firebase.database().ref().child("Comercio/Verduleria1/Fruta").limitToLast(4);
 var verdura = firebase.database().ref().child("Comercio/Verduleria1/Verdura").limitToLast(4);
 var legumbres = firebase.database().ref().child("Comercio/Verduleria1/Legumbres").limitToLast(4);

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
    
    $$('#content1').html(imagen)
    
    
  })
  verdura.on("value",function(snapshot){
    var datos = snapshot.val();
    
    
    for(var key in datos){
      i++;  
      
        
      imagen2 += '<div id="Sector2elemento' + i + '""class="col-50 medium-25" ><div><h3> ' + datos[key].nombre + ' <h3></div><img style= width="100px" height="100px" src="' + datos[key].url + '"/>"<div><h4> precio:  $ ' + datos[key].precio + ' <h4></div><div class="block block-strong text-align-center"><div class="row"><div class="stepper stepper-fill stepper-init" data-wraps="true" data-autorepeat="true" data-autorepeat-dynamic="true" data-decimal-point="2" data-manual-input-mode="true"><div class="stepper-button-minus"></div><div class="stepper-input-wrap"><input id="stepperSec1' + i + '"" type="text" value="0" min="0" max="1000" step="1"></div><div class="stepper-button-plus"></div><button  id="addCartSec1' + i + '"" class="col button button-raised"><span  class="material-icons">add_shopping_cart</span></button></div></div></div></div> ';
        console.log(i);
    }
    
    $$('#content2').html(imagen2)
    
    
  })
  legumbres.on("value",function(snapshot){
    var datos = snapshot.val();
    
    
    for(var key in datos){
      i++;  
      
        
      imagen3 += '<div id="Sector3elemento' + i + '""class="col-50 medium-25" ><div><h3> ' + datos[key].nombre + ' <h3></div><img style= width="100px" height="100px" src="' + datos[key].url + '"/>"<div><h4> precio:  $ ' + datos[key].precio + ' <h4></div><div class="block block-strong text-align-center"><div class="row"><div class="stepper stepper-fill stepper-init" data-wraps="true" data-autorepeat="true" data-autorepeat-dynamic="true" data-decimal-point="2" data-manual-input-mode="true"><div class="stepper-button-minus"></div><div class="stepper-input-wrap"><input id="stepperSec1' + i + '"" type="text" value="0" min="0" max="1000" step="1"></div><div class="stepper-button-plus"></div><button  id="addCartSec1' + i + '"" class="col button button-raised"><span  class="material-icons">add_shopping_cart</span></button></div></div></div></div> ';
        console.log(i);
    }
   
    $$('#content3').html(imagen3)
    
    
  });
}


//Bajar imagenes en Categorias

function productosCat(){
var db = firebase.firestore();
  var i = 0;
  var producto = "";
  db.collection("Comercios/verduleria@prueba.com/Productos").get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        i++;  
        producto += '<div id="Categoriaelemento' + i + '""class="col-50 medium-25" ><div><h3> ' + doc.data().nombre + ' <h3></div><img style= width="100px" height="100px" src="' + doc.data().url + '"/>"<div><h4> precio:  $ ' + doc.data().precio + ' <h4></div><div class="block block-strong text-align-center"><div class="row"><div class="stepper stepper-fill stepper-init" data-wraps="true" data-autorepeat="true" data-autorepeat-dynamic="true" data-decimal-point="2" data-manual-input-mode="true"><div class="stepper-button-minus"></div><div class="stepper-input-wrap"><input id="stepperSec1' + i + '"" type="text" value="0" min="0" max="1000" step="1"></div><div class="stepper-button-plus"></div><button  id="addCartSec1' + i + '"" class="col button button-raised"><span  class="material-icons">add_shopping_cart</span></button></div></div></div></div> ';
        
      });
      $$('#contentCat1').html(producto);
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });

  
};


//firestone


function cartClick(){
  var db = firebase.firestore();
  // Create a reference to the cities collection
  var VerduRef = db.collection("Comercios/verduleria@prueba.com/Productos");
  $$('#addCartSec11').on('click',function(){
  
    var query = VerduRef.where("id", "==", "PV003")
    .get()
       .then(function(querySnapshot) {
           querySnapshot.forEach(function(doc) {
            var valorStepper = $$('#stepperSec11').val();
            precio = doc.data().precio;
            var totalproducto = 0; 
            totalproducto =  precio * valorStepper;
            total += totalproducto;
            $$('#cajaItems').prepend('<li  id="listItem1" class="item-content"><div class="item-inner"><div  class="item-title">'+ doc.data().nombre +'</div><div id="item1Cantidad"class="item-after text-color-black">'+ valorStepper +'</div><div id="item1Precio"class="item-after text-color-black">'+ doc.data().precio +'</div><div class="item-after text-color-black">$ '+ totalproducto +'</div></div><div><button id="btnDel1"  class="delCart col button button-raised"><span  class="material-icons">backspace</span></button></div></div></div></li>');
            
            
            $$('#totalItems').html("$ " + total);
            

            $$('#cajaItems').on('click', '#btnDel1', function () {
              $$( "#listItem1" ).remove();
              if(total > 0){
                total -= totalproducto;
                $$('#totalItems').html("$ " + total);
                
              }else{
                total = 0;
                $$('#totalItems').html("$ " + total);
              }
             });
            
            // doc.data() is never undefined for query doc snapshots
               console.log(doc.data());
              // console.log(doc.id, " => ", doc.data());
               var carritoDocRef = db.collection("Personas").doc(email);
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
  
    var query = VerduRef.where("id", "==", "PV010")
    .get()
       .then(function(querySnapshot) {
           querySnapshot.forEach(function(doc) {
            var valorStepper = $$('#stepperSec12').val();
            precio = doc.data().precio;
            var totalproducto = 0; 
            totalproducto =  precio * valorStepper;
            total += totalproducto;
            $$('#cajaItems').prepend('<li  id="listItem2" class="item-content"><div class="item-inner"><div  class="item-title">'+ doc.data().nombre +'</div><div id="item1Cantidad"class="item-after text-color-black">'+ valorStepper +'</div><div id="item1Precio"class="item-after text-color-black">'+ doc.data().precio +'</div><div class="item-after text-color-black">$ '+ totalproducto +'</div></div><div><button id="btnDel2"  class="delCart col button button-raised"><span  class="material-icons">backspace</span></button></div></div></div></li>');
            
            
            $$('#totalItems').html("$ " + total);
  
            $$('#cajaItems').on('click', '#btnDel2', function () {
              $$( "#listItem2" ).remove();
              if(total > 0){
                total -= totalproducto;
                $$('#totalItems').html("$ " + total);
              }else{
                total = 0;
                $$('#totalItems').html("$ " + total);
              }
             });
            // doc.data() is never undefined for query doc snapshots
               console.log(doc.data());
              // console.log(doc.id, " => ", doc.data());
              var carritoDocRef = db.collection("Personas").doc(email);
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
  
    var query = VerduRef.where("id", "==", "PV001")
    .get()
       .then(function(querySnapshot) {
           querySnapshot.forEach(function(doc) {
            var valorStepper = $$('#stepperSec13').val();
            precio = doc.data().precio;
            var totalproducto = 0; 
            totalproducto =  precio * valorStepper;
            total += totalproducto;
            $$('#cajaItems').prepend('<li  id="listItem2" class="item-content"><div class="item-inner"><div  class="item-title">'+ doc.data().nombre +'</div><div id="item1Cantidad"class="item-after text-color-black">'+ valorStepper +'</div><div id="item1Precio"class="item-after text-color-black">'+ doc.data().precio +'</div><div class="item-after text-color-black">$ '+ totalproducto +'</div></div><div><button id="btnDel3"  class="delCart col button button-raised"><span  class="material-icons">backspace</span></button></div></div></div></li>');
            
            
            $$('#totalItems').html("$ " + total);
  
            $$('#cajaItems').on('click', '#btnDel3', function () {
              $$( "#listItem2" ).remove();
              if(total > 0){
                total -= totalproducto;
                $$('#totalItems').html("$ " + total);
              }else{
                total = 0;
                $$('#totalItems').html("$ " + total);
              }
             });
            // doc.data() is never undefined for query doc snapshots
               console.log(doc.data());
              // console.log(doc.id, " => ", doc.data());
              var carritoDocRef = db.collection("Personas").doc(email);
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
  
    var query = VerduRef.where("id", "==", "PV002")
    .get()
       .then(function(querySnapshot) {
           querySnapshot.forEach(function(doc) {
            var valorStepper = $$('#stepperSec14').val();
            precio = doc.data().precio;
            var totalproducto = 0; 
            totalproducto =  precio * valorStepper;
            total += totalproducto;
            $$('#cajaItems').prepend('<li  id="listItem3" class="item-content"><div class="item-inner"><div  class="item-title">'+ doc.data().nombre +'</div><div id="item1Cantidad"class="item-after text-color-black">'+ valorStepper +'</div><div id="item1Precio"class="item-after text-color-black">'+ doc.data().precio +'</div><div class="item-after text-color-black">$ '+ totalproducto +'</div></div><div><button id="btnDel4"  class="delCart col button button-raised"><span  class="material-icons">backspace</span></button></div></div></div></li>');
            
            
            $$('#totalItems').html("$ " + total);
  
            $$('#cajaItems').on('click', '#btnDel4', function () {
              $$( "#listItem3" ).remove();
              if(total > 0){
                total -= totalproducto;
                $$('#totalItems').html("$ " + total);
              }else{
                total = 0;
                $$('#totalItems').html("$ " + total)
              }
             });
            // doc.data() is never undefined for query doc snapshots
               console.log(doc.data());
              // console.log(doc.id, " => ", doc.data());
              var carritoDocRef = db.collection("Personas").doc(email);
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
  
    var query = VerduRef.where("id", "==", "PV004")
    .get()
       .then(function(querySnapshot) {
           querySnapshot.forEach(function(doc) {
            var valorStepper = $$('#stepperSec15').val();
            precio = doc.data().precio;
            var totalproducto = 0; 
            totalproducto =  precio * valorStepper;
            total += totalproducto;
            $$('#cajaItems').prepend('<li  id="listItem4" class="item-content"><div class="item-inner"><div  class="item-title">'+ doc.data().nombre +'</div><div id="item1Cantidad"class="item-after text-color-black">'+ valorStepper +'</div><div id="item1Precio"class="item-after text-color-black">'+ doc.data().precio +'</div><div class="item-after text-color-black">$ '+ totalproducto +'</div></div><div><button id="btnDel5"  class="delCart col button button-raised"><span  class="material-icons">backspace</span></button></div></div></div></li>');
            
            
            $$('#totalItems').html("$ " + total);
  
            $$('#cajaItems').on('click', '#btnDel5', function () {
              $$( "#listItem4" ).remove();
              if(total > 0){
                total -= totalproducto;
                $$('#totalItems').html("$ " + total);
              }else{
                total = 0;
                $$('#totalItems').html("$ " + total)
              }
             });
            // doc.data() is never undefined for query doc snapshots
               console.log(doc.data());
              // console.log(doc.id, " => ", doc.data());
               var carritoDocRef = db.collection("Personas").doc(email);
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
  
    var query = VerduRef.where("id", "==", "PV011")
    .get()
       .then(function(querySnapshot) {
           querySnapshot.forEach(function(doc) {
            var valorStepper = $$('#stepperSec16').val();
            precio = doc.data().precio;
            var totalproducto = 0; 
            totalproducto =  precio * valorStepper;
            total += totalproducto;
            $$('#cajaItems').prepend('<li  id="listItem5" class="item-content"><div class="item-inner"><div  class="item-title">'+ doc.data().nombre +'</div><div id="item1Cantidad"class="item-after text-color-black">'+ valorStepper +'</div><div id="item1Precio"class="item-after text-color-black">'+ doc.data().precio +'</div><div class="item-after text-color-black">$ '+ totalproducto +'</div></div><div><button id="btnDel6"  class="delCart col button button-raised"><span  class="material-icons">backspace</span></button></div></div></div></li>');
            
            
            $$('#totalItems').html("$ " + total);
  
            $$('#cajaItems').on('click', '#btnDel6', function () {
              $$( "#listItem5" ).remove();
              if(total > 0){
                total -= totalproducto;
                $$('#totalItems').html("$ " + total);
              }else{
                total = 0;
                $$('#totalItems').html("$ " + total)
              }
             });
            // doc.data() is never undefined for query doc snapshots
               console.log(doc.data());
              // console.log(doc.id, " => ", doc.data());
               var carritoDocRef = db.collection("Personas").doc(email);
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
  
    var query = VerduRef.where("id", "==", "PV005")
    .get()
       .then(function(querySnapshot) {
           querySnapshot.forEach(function(doc) {
            var valorStepper = $$('#stepperSec17').val();
            precio = doc.data().precio;
            var totalproducto = 0; 
            totalproducto =  precio * valorStepper;
            total += totalproducto;
            $$('#cajaItems').prepend('<li  id="listItem5" class="item-content"><div class="item-inner"><div  class="item-title">'+ doc.data().nombre +'</div><div id="item1Cantidad"class="item-after text-color-black">'+ valorStepper +'</div><div id="item1Precio"class="item-after text-color-black">'+ doc.data().precio +'</div><div class="item-after text-color-black">$ '+ totalproducto +'</div></div><div><button id="btnDel7"  class="delCart col button button-raised"><span  class="material-icons">backspace</span></button></div></div></div></li>');
            
            
            $$('#totalItems').html("$ " + total);
  
            $$('#cajaItems').on('click', '#btnDel7', function () {
              $$( "#listItem5" ).remove();
              if(total > 0){
                total -= totalproducto;
                $$('#totalItems').html("$ " + total);
              }else{
                total = 0;
                $$('#totalItems').html("$ " + total)
              }
             });
            // doc.data() is never undefined for query doc snapshots
               console.log(doc.data());
              // console.log(doc.id, " => ", doc.data());
               var carritoDocRef = db.collection("Personas").doc(email);
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
  
    var query = VerduRef.where("id", "==", "PV006")
    .get()
       .then(function(querySnapshot) {
           querySnapshot.forEach(function(doc) {
            var valorStepper = $$('#stepperSec18').val();
            precio = doc.data().precio;
            var totalproducto = 0; 
            totalproducto =  precio * valorStepper;
            total += totalproducto;
            $$('#cajaItems').prepend('<li  id="listItem6" class="item-content"><div class="item-inner"><div  class="item-title">'+ doc.data().nombre +'</div><div id="item1Cantidad"class="item-after text-color-black">'+ valorStepper +'</div><div id="item1Precio"class="item-after text-color-black">'+ doc.data().precio +'</div><div class="item-after text-color-black">$ '+ totalproducto +'</div></div><div><button id="btnDel8"  class="delCart col button button-raised"><span  class="material-icons">backspace</span></button></div></div></div></li>');
            
            
            $$('#totalItems').html("$ " + total);
  
            $$('#cajaItems').on('click', '#btnDel8', function () {
              $$( "#listItem6" ).remove();
              if(total > 0){
                total -= totalproducto;
                $$('#totalItems').html("$ " + total);
              }else{
                total = 0;
                $$('#totalItems').html("$ " + total)
              }
             });
            // doc.data() is never undefined for query doc snapshots
               console.log(doc.data());
              // console.log(doc.id, " => ", doc.data());
               var carritoDocRef = db.collection("Personas").doc(email);
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
  
    var query = VerduRef.where("id", "==", "PV007")
    .get()
       .then(function(querySnapshot) {
           querySnapshot.forEach(function(doc) {
            var valorStepper = $$('#stepperSec19').val();
            precio = doc.data().precio;
            var totalproducto = 0; 
            totalproducto =  precio * valorStepper;
            total += totalproducto;
            $$('#cajaItems').prepend('<li  id="listItem7" class="item-content"><div class="item-inner"><div  class="item-title">'+ doc.data().nombre +'</div><div id="item1Cantidad"class="item-after text-color-black">'+ valorStepper +'</div><div id="item1Precio"class="item-after text-color-black">'+ doc.data().precio +'</div><div class="item-after text-color-black">$ '+ totalproducto +'</div></div><div><button id="btnDel9"  class="delCart col button button-raised"><span  class="material-icons">backspace</span></button></div></div></div></li>');
            
            
            $$('#totalItems').html("$ " + total);
  
            $$('#cajaItems').on('click', '#btnDel9', function () {
              $$( "#listItem7" ).remove();
              if(total > 0){
                total -= totalproducto;
                $$('#totalItems').html("$ " + total);
              }else{
                total = 0;
                $$('#totalItems').html("$ " + total)
              }
             });
            // doc.data() is never undefined for query doc snapshots
               console.log(doc.data());
              // console.log(doc.id, " => ", doc.data());
              var carritoDocRef = db.collection("Personas").doc(email);
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

  $$('#addCartSec110').on('click',function(){
  
    var query = VerduRef.where("id", "==", "PV008")
    .get()
       .then(function(querySnapshot) {
           querySnapshot.forEach(function(doc) {
            var valorStepper = $$('#stepperSec110').val();
            precio = doc.data().precio;
            var totalproducto = 0; 
            totalproducto =  precio * valorStepper;
            total += totalproducto;
            $$('#cajaItems').prepend('<li  id="listItem8" class="item-content"><div class="item-inner"><div  class="item-title">'+ doc.data().nombre +'</div><div id="item1Cantidad"class="item-after text-color-black">'+ valorStepper +'</div><div id="item1Precio"class="item-after text-color-black">'+ doc.data().precio +'</div><div class="item-after text-color-black">$ '+ totalproducto +'</div></div><div><button id="btnDel10"  class="delCart col button button-raised"><span  class="material-icons">backspace</span></button></div></div></div></li>');
            
            
            $$('#totalItems').html("$ " + total);
  
            $$('#cajaItems').on('click', '#btnDel10', function () {
              $$( "#listItem8" ).remove();
              if(total > 0){
                total -= totalproducto;
                $$('#totalItems').html("$ " + total);
              }else{
                total = 0;
                $$('#totalItems').html("$ " + total)
              }
             });
            // doc.data() is never undefined for query doc snapshots
               console.log(doc.data());
              // console.log(doc.id, " => ", doc.data());
               var carritoDocRef = db.collection("Personas").doc(email);
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
  $$('#addCartSec111').on('click',function(){
  
    var query = VerduRef.where("id", "==", "PV012")
    .get()
       .then(function(querySnapshot) {
           querySnapshot.forEach(function(doc) {
            var valorStepper = $$('#stepperSec111').val();
            precio = doc.data().precio;
            var totalproducto = 0; 
            totalproducto =  precio * valorStepper;
            total += totalproducto;
            $$('#cajaItems').prepend('<li  id="listItem9" class="item-content"><div class="item-inner"><div  class="item-title">'+ doc.data().nombre +'</div><div id="item1Cantidad"class="item-after text-color-black">'+ valorStepper +'</div><div id="item1Precio"class="item-after text-color-black">'+ doc.data().precio +'</div><div class="item-after text-color-black">$ '+ totalproducto +'</div></div><div><button id="btnDel11"  class="delCart col button button-raised"><span  class="material-icons">backspace</span></button></div></div></div></li>');
            
            
            $$('#totalItems').html("$ " + total);
  
            
            // doc.data() is never undefined for query doc snapshots
               console.log(doc.data());
              // console.log(doc.id, " => ", doc.data());
               var carritoDocRef = db.collection("Personas").doc(email);
              carritoDocRef.update({
                carrito: firebase.firestore.FieldValue.arrayUnion(doc.data())
            });
             
           });
           valorStepper = 0;
       })
       .catch(function(error) {
           console.log("Error getting documents: ", error);
       });
  
       $$('#cajaItems').on('click', '#btnDel11', function () {
        $$( "#listItem9" ).remove();
        if(total > 0){
          total -= totalproducto;
          $$('#totalItems').html("$ " + total);
        }else{
          total = 0;
          $$('#totalItems').html("$ " + total)
        }
       });
  
  });

  $$('#addCartSec112').on('click',function(){
  
    var query = VerduRef.where("id", "==", "PV009")
    .get()
       .then(function(querySnapshot) {
           querySnapshot.forEach(function(doc) {
            var valorStepper = $$('#stepperSec112').val();
            precio = doc.data().precio;
            var totalproducto = 0; 
            totalproducto =  precio * valorStepper;
            total += totalproducto;
            $$('#cajaItems').prepend('<li  id="listItem9" class="item-content"><div class="item-inner"><div  class="item-title">'+ doc.data().nombre +'</div><div id="item1Cantidad"class="item-after text-color-black">'+ valorStepper +'</div><div id="item1Precio"class="item-after text-color-black">'+ doc.data().precio +'</div><div class="item-after text-color-black">$ '+ totalproducto +'</div></div><div><button id="btnDel12"  class="delCart col button button-raised"><span  class="material-icons">backspace</span></button></div></div></div></li>');
            
            
            $$('#totalItems').html("$ " + total);
  
            
            // doc.data() is never undefined for query doc snapshots
               console.log(doc.data());
              // console.log(doc.id, " => ", doc.data());
               var carritoDocRef = db.collection("Personas").doc(email);
              carritoDocRef.update({
                carrito: firebase.firestore.FieldValue.arrayUnion(doc.data())
            });
             
           });
           valorStepper = 0;
       })
       .catch(function(error) {
           console.log("Error getting documents: ", error);
       });
  
       $$('#cajaItems').on('click', '#btnDel12', function () {
        $$( "#listItem9" ).remove();
        if(total > 0){
          total -= totalproducto;
          $$('#totalItems').html("$ " + total);
        }else{
          total = 0;
          $$('#totalItems').html("$ " + total)
        }
       });
  
  });
  
}

 
  





angular.module('starter')

.controller('loginCtrl', function($scope, $stateParams,$firebaseArray,$timeout,Info, refUsuarioActualVal, $ionicModal) {
  $scope.loginData = {};

  if(refUsuarioActualVal.ref == null){
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;

      console.log(refUsuarioActualVal.ref);
      
      $scope.modal.show();
      
      
    });
  }
  // Hacer logueo
  $scope.loguear = function() {

    console.info($scope.loginData);
    //VALIDAR DATOS
    if($scope.loginData.user == null){
      alert("No se ingreso usuario");
      return;
    }else if ($scope.loginData.contra == null){
      alert("No se ingreso password");
      return;
    }else{

      //INICIO...
      var refUsuarios = firebase.database().ref('Usuarios/' + $scope.loginData.user);
      refUsuarios.once('value')
        .then(function(snapshot){
          infoUsuario = snapshot.val();
          if(infoUsuario != null){
            
            if(infoUsuario.contra == $scope.loginData.contra){
              alert("Bienvenido " + $scope.loginData.user);
              refUsuarioActualVal.ref = refUsuarios;
              //location.href="#/app/mapa";
              $scope.modal.hide();
            }else{
              alert("El password es incorrecto");
              return;
            }
          }else{
            alert("Este usuario no existe...");
            return;
          }
        })
        .error(function(error){
          console.info(error);
        })
    }
  }
})

.controller('registroCtrl', function($scope, $stateParams,$firebaseArray,$timeout,Info, refUsuarioActualVal) {

  $scope.regData = {};
  // Hacer logueo
  $scope.registrar = function() {

    console.info($scope.regData);
    //VALIDAR DATOS
    if($scope.regData.user == null){
      alert("No se ingreso usuario");
      return;
    }else if ($scope.regData.contra1 == null){
      alert("No se ingreso password");
      return;
    }else if ($scope.regData.contra2 == null){
      alert("No se confirmo password");
      return;
    } else if ($scope.regData.contra1 != $scope.regData.contra2){
      alert("Los passwords no coinciden");
      return;
    }else if ($scope.regData.tipo == null){
      alert("No se eligio tipo de usuario");
      return;
    }else{

      //INICIO...
      
      firebase.database().ref('Usuarios').once('value', function(snapshot){
        var flagExiste = false;
        var usuarios = snapshot.val();
        $.each(usuarios, function(i){
          if(usuarios[i].usr == $scope.regData.user){
            flagExiste = true;
          }
        })

        if(!flagExiste){      
          var refUsuarios = firebase.database().ref('Usuarios/' + $scope.regData.user);        
          refUsuarioActualVal.ref = refUsuarios;
          refUsuarios.ref.set({
            usr: $scope.regData.user,
            contra: $scope.regData.contra1,
            tipo: $scope.regData.tipo
          });
          alert("Bienvenidx " + $scope.regData.user);
          location.href="#/app/mapa";
        }else{
          alert("Este usuario ya existe...");
          return;
        }
      });  
    }
  }
});




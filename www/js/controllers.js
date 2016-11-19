angular.module('starter.controllers', [])

.factory("Info", function($firebaseArray) {
  var infosRef = new Firebase("https://triggered-4e761.firebaseio.com/SOS");
  return $firebaseArray(infosRef);
})

.factory("Ratings", function($firebaseArray) {
  var infosRef = new Firebase("https://triggered-4e761.firebaseio.com/Ratings");
  return $firebaseArray(infosRef);
})

.factory("Admin", function($firebaseArray) {
  var infosRef = new Firebase("https://triggered-4e761.firebaseio.com/Admin");
  return $firebaseArray(infosRef);
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout,Admin, $ionicPopup) {

  var admins = Admin;
  var user = firebase.auth().currentUser;
  $scope.usr = firebase.auth().currentUser;

  if(user==null){
    alert("No esta Logeado");
    location.href="#/login"; //Redireccionamiento
  };

  admins.$loaded()
    .then(function(){
        angular.forEach(admins, function(admin) {
            if(admin.$value === user.uid){
              $scope.autorizo = true;
            }
        })
    });

  // Cerrar sesion
  $scope.logout = function() {
    //alert("Sesion cerrada!");
    var myPopup = $ionicPopup.show({
           template: '<center> Sesión Cerrada! </center>',
           title: 'Logout'
        });
        $timeout(function(){
          myPopup.close();

        }, 1000);
    //Cerrar sesion DE GITHUB
    firebase.auth().signOut();
    location.href="#/login";
  };
});




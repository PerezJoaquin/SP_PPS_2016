angular.module('starter')

.controller('SOSCtrl', function($scope, $ionicPopup,$stateParams,$filter,Info, refUsuarioActualVal) {
   $scope.infos = Info;
   
    // When button is clicked, the popup will be shown...
   $scope.showPopup = function(tipo) {

      $scope.data = {}

      var usuarioActual = refUsuarioActualVal.ref.once('value', function(snapshot){
        var usr = snapshot.val();
        // Custom popup
        var myPopup = $ionicPopup.show({
           template: 'Seguro que queres mandar un SOS?',
           title: 'Enviar SOS',
           scope: $scope,
        
           buttons: [
              { text: 'Cancel' }, 
              {text: '<b>Save</b>',
               type: 'button-positive',
                    onTap: function(e) {
                      var options = {
                          enableHighAccuracy: true
                      };
                      var latlon;
                        navigator.geolocation.getCurrentPosition(function(pos) {
                           $scope.infos.$add({
                             "tipo": tipo,
                              "lat":pos.coords.latitude,
                              "lon": pos.coords.longitude,
                              "usu": usr.usr,
                              "date": $filter('date')(new Date(), 'dd/MM/yyyy')
                            });               
                        }, 
                        function(error) {                    
                            alert('Unable to get location: ' + error.message);
                        }, options);

                            
                             
                    }
              }
           ]
        });

      });

      myPopup.then(function(res) {
        
      });    
   };
});




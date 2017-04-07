(function() {
  angular
    .module('App')
    .controller('findCtrl', Controller);

    Controller.$inject =
    [
      "$scope"
    ];

    function Controller($scope){

      //Implement GeoLocation and Google Maps 
      $scope.barberShops = [
        {name: "Barbershop", location: "Pensacola", state: "FL", rating: 5},
        {name: "Haircut Mania", location: "Pace", state: "FL", rating: 5},
        {name: "Cutter's Cutts", location: "Pensacola", state: "FL", rating: 0},
        {name: "Chopp It", location: "Crestview", state: "FL", rating: 0},
        {name: "Super Cutss", location: "Pensacola", state: "FL", rating: 0},
        {name: "Sally's", location: "Pensacola", state: "FL", rating: 0}
        ];


    }



})();

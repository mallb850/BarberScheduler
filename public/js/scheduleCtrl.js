(function() {
  angular
    .module('App')
    .controller('scheduleCtrl', Controller);

    Controller.$inject =
    [
      "$scope",
      "$http"
    ];

    function Controller($scope, $http){

      $http({
            method: 'GET',
            url: '/schedule/events',
            headers: {
              'Content-Type': '*',
              'Access-Control-Allow-Origin': '*'
            }
          }).then(function successCallback(response) {
                $scope.information = response.data;
            }, function errorCallback(response) {

            });


      $(document).ready(function() {
        $('#calendar').fullCalendar({
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
          },
          defaultView: 'month' ,
          dayClick: function(date,allDay,jsEvent,view) {
              if(allDay){
                $('#calendar')
                  .fullCalendar('changeView', 'agendaDay')
                  .fullCalendar('gottoDate', date.getFullYear(),
                                date.getMonth(), date.getDate());
              }
          },
          events: [

            

          ],

          resources: [


          ]
        });
      });

      }



})();

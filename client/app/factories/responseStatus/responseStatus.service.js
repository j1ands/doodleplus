'use strict';

angular.module('doodleplusApp')
.factory('responseStatus', function () {

  var responses = [];

  var displayStatus = function(){
    $("rect").each(function() {
      selectTime.call(this);
    });
    $("rect").each(function() {
      loadStatus.call(this); 
    } );
    return generateStatus();
  }

  //manage rect classes for selected timeslots
  var selectTime =  function() {
    var mouse = d3.mouse(this)
    var x = Number(this.getAttribute('x'))
    var y = Number(this.getAttribute('y'))
    var width = Number(this.getAttribute('width'))
    var height = Number(this.getAttribute('height'))
    if(mouse[1] > y && mouse[1] < y + height + 1.5){
      if(this.classList.contains('selected')){
        this.classList.remove('selected');
      } else {
        this.classList.add('selected');
      }  
    }
  }

  //extract response data from rects of selected rows
  var loadStatus = function(){
    var UUID = this.getAttribute('UUID')
    var username = this.getAttribute('username')
    var status = this.getAttribute('status')
    var time = Number(this.getAttribute('time'))
    if (this.classList.contains('selected')){
      responses.push({username: username, status: status, UUID: UUID, time: time});
    }
  }

  //sort overall "superstatus" for each respondent
  //over all currently selected rows
  var generateStatus = function(){     
    var hash = {};
    var rows = [];
    responses.forEach(function(el){
      rows.push(el.time)
      if (!hash[el.UUID]){
        hash[el.UUID] = el;
        hash[el.UUID].superStatus = el.status;
        hash[el.UUID].num = 1;
      } else {
        if(el.status > hash[el.UUID].superStatus){
          hash[el.UUID].superStatus = el.status;
        }
        hash[el.UUID].num++;
      }
    });
    responses = [];

    //dedupe set of all times to get total num of selected rows
 var allRows = rows.reduce(function(accum, current) { 
  if (accum.indexOf(current) < 0) {
    accum.push(current);
  }
  return accum;
}, []);

 var displayResponses = [];

 //generate superstatus
 for (var keys in hash){
  if (hash[keys].num !== allRows.length){
    hash[keys].superStatus = 'unable';
  } else {
    displayResponses.push(hash[keys]);  
  }
}
return displayResponses;
}

return {
  displayStatus: displayStatus
};
});


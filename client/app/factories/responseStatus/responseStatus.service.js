'use strict';

angular.module('doodleplusApp')
.factory('responseStatus', function () {

  var responses = [];
  var numSelected =0;
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

  var loadStatus = function(){
    var UUID = this.getAttribute('UUID')
    var username = this.getAttribute('username')
    var status = this.getAttribute('status')
    var time = Number(this.getAttribute('time'))

    if (this.classList.contains('selected')){
      responses.push({username: username, status: status, UUID: UUID, time: time});
    }
  }

  var generateStatus = function(){     
    // var statusArray = ['able','ifneedbe','maybe'];
    var hash = {};
    var rows = [];
    var allRows = [];
    var displayResponses = [];

    responses.forEach(function(el){
      rows.push(el.time)
      if (!hash[el.UUID]){
        hash[el.UUID] = el;
        console.log(hash)
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
    
  allRows = rows.reduce(function(accum, current) {  //reduce times
                    if (accum.indexOf(current) < 0) {
                      accum.push(current);
                    }
                    return accum;
                  }, []);

  console.log(allRows.length)

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
    responses: responses,
    selectTime: selectTime,
    loadStatus: loadStatus,
    generateStatus: generateStatus
  };
});


$(document).ready(function(){

  //returns the number of days since dec 31 of prev year
  var getDay = function(){
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    days = Math.floor(diff / oneDay);
    return {full: Number(now.getFullYear() + '00' + days),
            year: now.getFullYear(),
            day: days
    };
  };

  //adds 3 days before, today, and 3 days after to todolist
  var updateListDays = function(){
    var retVal = {};
    var today = getDay();
    var start = today.full - 3;
    var end = today.full + 3;
    for (var i = start; i <= end; i++){
      retVal[i] = [];
      retVal[i].year = today.year;
      retVal[i].day = i;
    }
    return retVal;
  };

  var numberToDay = function(day){
    var days = {
      0: "Sunday",
      1: "Monday", 
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday"
    };
    return days[day];
  };

  var updateSuccessFeed = function(){
    _.each(todoList, function(val){
      console.log(val.day);
      var objDate = new Date(val.year, 0, val.day - 201500000);
      $('.todoSuccessFeed').append(
        "<div class='day'><span class='dayText'>" + numberToDay(objDate.getDay()) + "</span></div>"
        );
    });
    
  };

  //Global todo list object
  var todoList = updateListDays();
  updateSuccessFeed();
  





  // Inserts new todo item
  var updateTodoList = function() {
    $('.todoList').empty();
    _.each(todoList[getDay().full], function(item){
      $('.todoList').append("<li><input type='checkbox'>" + item + "</li>");
    });
  };



  //LISTENERS
    //Listens for new todo submit button
  $('#newTodoButton').on('click', function(e){
    todoList[getDay().full].push($('.newTodoInput').val());
    $('.newTodoInput').val('');
    updateTodoList();
    var eric = new Date(2015, 0, 1);
  });
getDay();

});


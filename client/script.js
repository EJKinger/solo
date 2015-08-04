$(document).ready(function(){

  //returns the number of days since dec 31 of prev year
  var getDay = function(){
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    days = Math.floor(diff / oneDay);
    return Number(now.getFullYear() + '0' + days);
  };

  //Global todo list object
  var todoList = {
  };

  var today = getDay();
  var start = today - 3;
  var end = today + 3;
  for (var i = start; i <= end; i++){
    todoList[i] = [];
  }



  // Inserts new todo item
  var updateTodoList = function() {
    $('.todoList').empty();
    _.each(todoList[today], function(item){
      $('.todoList').append("<li><input type='checkbox'>" + item + "</li>");
    });
  };



  //LISTENERS
    //Listens for new todo submit button
  $('#newTodoButton').on('click', function(e){
    todoList[today].push($('.newTodoInput').val());
    $('.newTodoInput').val('');
    updateTodoList();
    var eric = new Date(2015, 0, 1);
  });
getDay();

});


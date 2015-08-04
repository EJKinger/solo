$(document).ready(function(){
  //Global todo list object
  var today = new Date();
  var todoList = {

    20150212: [],
    20150213: [],
    20150214: [],

    20150215: [],

    20150216: [],
    20150217: [],
    20150218: []
  };



  // Inserts new todo item
  var updateTodoList = function() {
    $('.todoList').empty();
    _.each(todoList.day1, function(item){
      $('.todoList').append("<li><input type='checkbox'>" + item + "</li>");
    });
  };

  //LISTENERS
    //Listens for new todo submit button
  $('#newTodoButton').on('click', function(e){
    todoList.day1.push($('.newTodoInput').val());
    $('.newTodoInput').val('');
    updateTodoList();
    var eric = new Date(2015, 0, 1);
    console.log(eric);
  });

});


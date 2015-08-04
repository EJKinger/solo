$(document).ready(function(){
  //Global todo list object

  var todoList = {

    20150212: [],
    20150213: [],
    20150214: [],

    20150215: [],

    20150216: [],
    20150217: [],
    20150218: []
  };

  /*
    DATABASE INTERACTION FUNCTIONS
  */
  var getData = function(roomName){
    return $.ajax({
      url: "https://api.parse.com/1/classes/chatterbox",
      type: 'GET',
      contentType: 'application/json',
      success: function(data) {
        getRooms(data);
        insertMessages(data, roomName);
        boldFriendsMessages();
      },

      error: function(data) {
        console.log(data);
      }
    });
  };

  var postMessage = function(message) {
    $.ajax({
      url: "https://api.parse.com/1/classes/chatterbox",
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        //clear message and room input fields
        $('.userInput').val('');
        $('.newRoomName').val('');
        getData(message.roomname);
      },
      error: function(data) {
        console.log(data);
        alert('ERROR: Message Not Sent');
      }
    });
  };


  /*
    HELPERS
  */
  // WRITE DATA TO THE DOM
  var insertMessages = function(data, roomName) {
    // CLEAR MESSAGE AREA
    $('.messages').empty();
    for (var i = 0; i < data.results.length; i++) {
      // IF A ROOM IS SELECTED, WRITE TO THAT ROOM
      if (roomName !== undefined && roomName !== 'Select All'){
        if (data.results[i].roomname === roomName){
          $('.messages').append("<div class='message'>" +
                                  "<p><a class='userNameLink' href='#'>" + _.escape(data.results[i].username) + "</a></p>" +
                                  "<p class='" + _.escape(window.decodeURIComponent(data.results[i].username)) + "'>" + _.escape(data.results[i].text) +     "</p>" +
                                "</div>");
        }
      }
      // IF ROOM WAS NOT CHOSEN, SHOW ALL MESSAGES
      else {
        $('.messages').append("<div class='message'>" +
                                "<p><a class='userNameLink' href='#'>" + _.escape(data.results[i].username) + "</a></p>" +
                                "<p class='" + _.escape(window.decodeURIComponent(data.results[i].username)) + "'>" + _.escape(data.results[i].text) +     "</p>" +
                              "</div>");
      }
    }
  };

  // ADDS ROOMS TO DROP-DOWN LIST
  var getRooms = function(data){
    var rooms = [];
    for (var i = 0; i < data.results.length; i++){
      rooms.push(_.escape(data.results[i].roomname));
    }
    rooms = _.uniq(rooms);
    rooms.forEach(function(item){
      var append = true;
      if ($('.roomsList .user').length > 0){
        $('.roomsList .user').each(function(index, option){
          console.log('option: ' + option);
          if (option.value === item){
            append = false;
          }
        });
      } 
      if (append === true) {
        $('.roomsList').append("<option class='user'>" + item + "</option>");
      }
    });
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


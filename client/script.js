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
      var objDate = new Date(val.year, 0, val.day - 201500000);
      $('.todoSuccessFeed').append(
        "<div class='day'><span class='dayText'>" + numberToDay(objDate.getDay()) + "</span></div>"
        );
    });
  };

  //Global todo list object
  var todoList = updateListDays();
  var incentive = {
    length: 0,
    complete: 0
  };
  updateSuccessFeed();

  $(function() {
      $( "#progressbar-1" ).progressbar({
        value: 2
      });
  });
  
   // Inserts new todo item
  var updateTodoList = function() {
    $('.todoList').empty();
    _.each(todoList[getDay().full], function(item){
      $('.todoList').append("<li><input class='check' type='checkbox'>" + item + "</li>");
    });
  };



  //LISTENERS
    //Listens for new todo submit button
  $('.selection').on('click', function(e){
    $('.selection').css('border', 'solid white 4px');
    $(this).css('border', 'solid #7FFF00 4px');
    incentive.store = $(this).data("store");
  });

  $('#newTodoButton').on('click', function(e){
    todoList[getDay().full].push($('.newTodoInput').val());
    $('.newTodoInput').val('');
    incentive.length++;
    updateTodoList();
  });

  // $('.newAmount').on('change keyup paste', function(e){
  //   $('.amountDisplay').text('$' + $(this).val());
  // });

  $('.incentiveLink').on('click', function(e){
    $('.clicker').css('display', 'none');
    $('.index').css('display', 'none');
    $('.incentive').css('display', 'inline');
  });
  $('.indexLink').on('click', function(e){
    $('.incentive').css('display', 'none');
    $('.index').css('display', 'inline');
  });
  $('#confirmAmount').on('click', function(e){
    incentive.amount = $('.newAmount').val();
    if (incentive.store && incentive.amount){
      $('.incentive').css('display', 'none');
      $('.index').css('display', 'inline');
      $('.incentiveDisplay').css('display', 'none');
      $('.displayIncentive').append(
        "<div class='incentiveImage'><img class='smallIcon' src='img/" + incentive.store + ".png'><span class='amountNum'>$" + incentive.amount + "</span></div>");
    }
    else {
      alert("Please select an incentive!");
    } 
  });
  $( '.todoList' ).on( "click", ".check", function(e){
    incentive.complete++;
    $(function() {
      $( "#progressbar-1" ).progressbar({
        value: (incentive.complete / incentive.length) * 100
      });
    });
    if (incentive.complete / incentive.length === 1){
      $('.smallIcon').css('border', 'solid green 3px');
      setTimeout(function(){alert('Good Job! You earned your reward :)');}, 500);
    }
  });


getDay();

});









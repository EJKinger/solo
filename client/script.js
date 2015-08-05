$(document).ready(function(){

  //returns the number of days since dec 31 of prev year
  var todoList =  {
    y201500213: {year: 2015, day: "Saturday" , complete: true,  reward: {amount: 5, store: "amazon"}, todo: ["Laundry", "Shopping", "Finish project"]},
    y201500214: {year: 2015, day: "Sunday"   , complete: false, reward: {amount: 5, store: "steam"},  todo: ["Eat", "Sleep"]},
    y201500215: {year: 2015, day: "Monday"   , complete: true,  reward: {amount: 5, store: "newegg"}, todo: ["Workout", "Cook", "Party"]},
    y201500216: {year: 2015, day: "Tuesday"  , complete: null,  reward: {amount: 5, store: ""},       todo: []},
    y201500217: {year: 2015, day: "Wednesday", complete: null,  reward: {amount: 5, store: ""},       todo: []},
    y201500218: {year: 2015, day: "Thursday" , complete: null,  reward: {amount: 5, store: ""},       todo: []},
    y201500219: {year: 2015, day: "Friday"   , complete: null,  reward: {amount: 5, store: ""},       todo: []}
  };

  var today = "y201500216";


  var updateSuccessFeed = function(){
    $('.todoSuccessFeed').empty();
    _.each(todoList, function(val, key){
      console.log(key);
      $('.todoSuccessFeed').append(
        "<div class='day " + val.complete + "' data-key='" + key + "''><span class='dayText'>" + val.day + "</span></div>"
        );
    });
    $('.todoSuccessFeed').find('.true').append("<img class='label' src='img/check.png'>");
    $('.todoSuccessFeed').find('.false').append("<img class='label' src='img/ex.png'>");
  };

  

  //Global todo list object
  //var todoList = updateListDays();
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
    _.each(todoList[today].todo, function(item){
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
    todoList[today].todo.push($('.newTodoInput').val());
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
      todoList[today].complete = true;
      updateSuccessFeed();
      $('.smallIcon').css('border', 'solid green 3px');
      setTimeout(function(){alert('Good Job! You earned your reward :)');}, 500);
    }
  });

  $('.day').on('click', function(e){
    today = $(this).data('key');
    updateTodoList();
  });

});









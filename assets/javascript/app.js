$(document).ready(function() {
  var theme = new Audio("assets/sounds/rock.mp3");
  theme.volume = 0.5;
  theme.play(); 
  var correct;
  var wrong;
  var unanswered;
  var questionNum;
  var questions = [
        // question 1
        {
            category: "MLB",
            question: "Which player holds the record for most consecutive games played?",
            choices: ["Cal Ripken Jr.", "Pete Rose", "Stan Musial", "Lou Gherig"],
            answer: 0,
            gif: "assets/images/CalRipkin.gif"
        },
        // question 2
        {
            category: "NBA",
            question: "Which of these teams has never won a championship?",
            choices: ["Milwalkee Bucks", "Indiana Pacers", "New York Knicks", "Houston Rockets"],
            answer: 1,
            gif: "assets/images/pacers.gif"
        },
        // question 3
        {
            category: "NHL",
            question: "What jersey number did Wayne Gretzky wear?",
            choices: ["27", "1", "11", "99"],
            answer: 3,
            gif: "assets/images/gretzky.gif"
        },
        // question 4
        {
            category: "NFL",
            question: "Which team has won the most Super Bowls?",
            choices: ["San Francisco 49ers", "Dallas Cowboys", "Pittsburg Steelers", "New England Patriots"],
            answer: 0,
            gif: "assets/images/49ers.gif"
        },
        // question 5
        {
            category: "FIFA",
            question: "Which country has the most World Cup titles?",
            choices: ["Argentina", "Germany", "Spain", "Brazil"],
            answer: 3,
            gif: "assets/images/brazil.gif"
        },
        // question 6
        {
            category: "WWE",
            question: "Who was the first person inducted into the WWE Hall of Fame?",
            choices: ["Randy Savage", "Hulk Hogan", "Andre the Giant", "Vince McMahon"],
            answer: 2,
            gif: "assets/images/andre.gif"
        },
        // question 7
        {
            category: "Golf",
            question: "What color jacket is given to the winner of the Masters Tournament?",
            choices: ["Red", "Blue", "Green", "White"],
            answer: 2,
            gif: "assets/images/green.gif"
        },
        // question 8
        {
            category: "Olympics",
            question: "Which city has never hosted a Summer or Winter Olympic Games?",
            choices: ["Atlanta", "Los Angeles", "Salt Lake City", "New York City"],
            answer: 3,
            gif: "assets/images/newyork.gif"
        },
        // question 9
        {
            category: "Tennis",
            question: "Who defeated tennis player Bobby Riggs in the famous 'Battle of the Sexes'?",
            choices: ["Margaret Court", "Billy Jean King", "Chris Evert-Lloyd", "Martina Navratilova"],
            answer: 1,
            gif: "assets/images/billie.gif"
        },
        // question 10
        {
            category: "Boxing",
            question: "Which boxer was nicknamed 'Iron'?",
            choices: ["Mike Tyson", "Muhammed Ali", "Joe Frazier", "Floyd Mayweather"],
            answer: 0,
            gif: "assets/images/tyson.gif"
        }
    ];

  $('#start').append("<button class = 'btn btn-primary btn-lg startButton'>Start Game!</button>");

  $('#start').on("click", ".startButton", function() {
    $('#start').hide();
    correct = 0;
    wrong = 0;
    unanswered = 0;
    questionNum = 0;
    startGame();
  });

  var count;
  var counter;
  function startGame() {
    theme.volume = 0.2;
    $('#choices').empty();
    $('#title > h1').css('font-size', '100px');
    $('#timer').html("00 : 30");
    count=30;
    counter=setInterval(timer, 1000);
    $('#category').html(questions[questionNum].category);
    $('#question').html(questions[questionNum].question);
    for (var i = 0; i < questions[questionNum].choices.length; i++) {
      var newDiv = $("<div>");
      newDiv.addClass("pickAnswer").attr("value", i).text(questions[questionNum].choices[i]);
      $('#choices').append(newDiv);
    }
  }

  $("#choices").on("click", ".pickAnswer", function() {//create user's character
    var i = ($(this).attr('value'));
    clearTimeout(counter);
    $('#choices').empty();
    answer_chosen = questions[questionNum].choices[i];
    correct_answer = questions[questionNum].choices[questions[questionNum].answer];
    if(answer_chosen === correct_answer) {
      correct++;
      var cheer = new Audio("assets/sounds/cheer.mp3");
      cheer.volume = 0.5;
      cheer.play(); 
      $('#category').html("Correct!");
      $('#question').empty();
      $('#choices').html("<img src='"+questions[questionNum].gif+"' style='width:500px;height:300px;'>");
      setTimeout(nextQuestion, 4000);
    } else {
      wrong++;
      $('#category').html("Nope!");
      $('#question').html("The Correct answer was " + correct_answer);
      $('#choices').html("<img src='"+questions[questionNum].gif+"' style='width:500px;height:300px;'>");
      setTimeout(nextQuestion, 4000);
    }
  });

  function nextQuestion() {
    $('#timer').css('color', 'white');
    $('#choices').empty();
    questionNum++;
    if (questionNum >= 10) {
      endGame();
      return;
    }
    $(".container").children(".container").fadeIn(1000);
    $('#timer').html("00 : 30");
    count=30;
    counter=setInterval(timer, 1000);
    $('#category').html(questions[questionNum].category);
    $('#question').html(questions[questionNum].question);
    for (var i = 0; i < questions[questionNum].choices.length; i++) {
      var newDiv = $("<div>");
      newDiv.addClass("pickAnswer").attr("value", i).text(questions[questionNum].choices[i]);
      $('#choices').append(newDiv);
    }
  }

  function timer() {
    count--;
    if (count <= 0) {
      var horn = new Audio("assets/sounds/horn.mp3");
      horn.volume = 0.4;
      horn.play(); 
      $('#timer').html("00 : 00");
      clearInterval(counter);
      timesUp();
      return;
    }
    if (count >= 0 && count <10) {
      $('#timer').html("00 : 0" + count);
      $('#timer').css('color', 'red');
    }
    else {
      $('#timer').html("00 : " + count);
    }
  }

  function timesUp() {
    unanswered++;
    clearTimeout(counter);
    var correct_answer = questions[questionNum].choices[questions[questionNum].answer];
    $('#choices').empty();
    $('#category').html("You ran out of time!");
    $('#question').html("The Correct answer was " + correct_answer);
    $('#choices').html("<img src='"+questions[questionNum].gif+"' style='width:500px;height:300px;'>");
    setTimeout(nextQuestion, 4000);
  }

  function endGame() {
    $(".container").children(".container").fadeIn(1000);
    $('#timer').empty();
    $('#category').html("All Done!");
    $('#question').html("Here's how you did:");
    $('#choices').html("Correct Answers: " + correct);
    $('#choices').append("<br /> Incorrect Answers: " + wrong);
    $('#choices').append("<br /> Unanswered: " + unanswered);
    $('#start').show();
  }
});

var game = {
  zdobyte : START_SCORE,
  zycia : START_LIFES,
}

var answer = "NONE";

//LISTENERS
document.getElementById(S_PLAY).addEventListener(S_CLICK, sprawdzLitere);
document.getElementById(S_START).addEventListener(S_CLICK, startGame);
document.getElementById(S_AUTHOR).addEventListener(S_CLICK, displayAboutAuthor);
document.getElementById(S_CLOSEABOUT).addEventListener(S_CLICK, hideAboutAuthor);
console.log(game.zycia);


//FUNKCJE
function sprawdzLitere(){
  var input = document.getElementById(S_ENTERNUMBER)
  var letter = input.value.toUpperCase();
  console.log(letter);
  input.value = '';
  if (letter.length > 1)
  {
    console.log("More than one letter");
    lifeLost();
  }
  else
  {
    found = false;
    for (var i = 0; i < answer.length; i++)
    {
      if (letter == answer[i])
      {
        point(letter);
        show(letter);
        found = true;
      }
    }
    if (!found)
    {
      addElement(S_WRAP, S_SELECTED, letter, S_LETTERS);
      lifeLost();
    }
  }
}

function startGame(){
  document.getElementById(S_WRAP).style.visibility=S_VISIBLE;
  game.zdobyte = START_SCORE;
  game.zycia = START_LIFES;
  newGame();
}

function newGame()
{
  clearPrevGame();
  document.getElementById(S_LIVES).innerHTML = game.zycia;
  document.getElementById(S_SCORE).innerHTML = game.zdobyte;
  var index = getRandomInt(0, data.length);
  answer = data[index][S_COUNTRY].toUpperCase();
  console.log(answer);
  for (var i = 0; i < answer.length; i++)
  {
    var letter = answer[i];
    if (letter == ' ')
    {
      addElement(S_WRAP, S_PASS, '_', S_SPACES);
    }
    else
    {
      addElement(S_WRAP, S_PASS, letter, S_INVLETTERS);
    }
  }
}

function clearPrevGame()
{
  var wrap = document.getElementById(S_WRAP);
  var toRemove = [];
  toRemove.push(document.getElementsByClassName(S_INVLETTERS));
  toRemove.push(document.getElementsByClassName(S_SPACES));
  toRemove.push(document.getElementsByClassName(S_LETTERS));
  for (var i = 0; i < toRemove.length; i++)
  {
    while (toRemove[i][0])
    {
      wrap.removeChild(toRemove[i][0]);
    }
  }
}

function displayAboutAuthor(){
  document.getElementById(S_ABOUT).style.visibility=S_VISIBLE;
}

function hideAboutAuthor(){
  document.getElementById(S_ABOUT).style.visibility=S_HIDDEN;
}

function addElement(parent, nextElem, value, newClass)
{
  var newElement = document.createElement(S_SPAN);

  my_div = document.getElementById(parent);
  my_div.insertBefore(newElement, document.getElementById(nextElem));

  newElement.classList.add(newClass);
  newElement.classList.add(value);
  newElement.innerHTML = value;
}

function lifeLost()
{
  document.getElementById(S_LIVES).innerHTML = --game.zycia;
  if(game.zycia == 0)
  {
    alert("You lost!");
    startGame();
  }
}

function point(letter)
{
  answer = answer.replace(letter, '');
  console.log(answer);
  game.zdobyte++;
  document.getElementById(S_SCORE).innerHTML = game.zdobyte;
  if (answer.length == 0)
  {
    game.zdobyte += 5;
    game.zycia += 5;
    newGame();
  }
}

function show(id)
{
  var elements = document.getElementsByClassName(id);
  for (var i = 0; i < elements.length; i++)
  {
    elements[i].style.color=C_BLACK;
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

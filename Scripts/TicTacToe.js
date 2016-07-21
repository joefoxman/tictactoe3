"use strict";
var player = 1;
var firstPlayer = "x";
var numMoves = 0;
var lineColor = "#ddd";
var canvas;
var context;
var canvasSize = 500;
var sectionSize = canvasSize / 3;
var sectionClicked;
var board;
var boardArray = ["","","","","","","","",""]
var wonGame = false;
var isDraw = false;

$(document).ready(function () {
  newGame()
  $("#reset-game").on("click", function(){
    newGame();
  });
});

function newGame(){
  numMoves = 0;
  isDraw = false;
  firstPlayer = $("#first-player").find("option:selected").val();
  wonGame = false;
  canvas = document.getElementById("tic-tac-toe-board");
  context = canvas.getContext('2d');
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.translate(0.5, 0.5);
  board = getInitialBoard("");
  drawLines(10, lineColor);  
  getInitialBoard();
  boardArray = ["","","","","","","","",""];
  player = 1;

  canvas.removeEventListener("mouseup", mouseUpCanvas);
  canvas.addEventListener('mouseup', mouseUpCanvas);
}

function mouseUpCanvas (event) {
    if (wonGame || isDraw) {
      return;
    }  
    var canvasMousePosition = getCanvasMousePosition(event);
    addPlayingPiece(canvasMousePosition);
    drawLines(10, lineColor);
    checkIfWinner();
}

function checkIfWinner(){
  // vh (v - draw vertical line in col 1, 2 or 3)
  // vh (h - draw horizontal line in row 1, 2 or 3)
  // vh (dr - draw diagonal line from 0 to 9)
  // vh (dl - draw diagonal line from 3 to 7)

  if (boardArray[0] != "" 
    && boardArray[0] === boardArray[1] 
    && boardArray[0] === boardArray[2]) {
    wonGame = true;
    drawWinningLine("h", 1, 0);
    $("#winnerModal #winner-text").html(boardArray[0] + " has won the game!");
    $("#winnerModal").modal("show");
  }
  else if (boardArray[3] != "" 
    && boardArray[3] === boardArray[4] 
    && boardArray[3] === boardArray[5]) {
    wonGame = true;
    drawWinningLine("h", 2, 0);
    $("#winnerModal #winner-text").html(boardArray[0] + " has won the game!");
    $("#winnerModal").modal("show");
  }
  else if (boardArray[6] != "" 
    && boardArray[6] === boardArray[7] 
    && boardArray[6] === boardArray[8]) {
    wonGame = true;
    drawWinningLine("h", 3, 0);
    $("#winnerModal #winner-text").html(boardArray[0] + " has won the game!");
    $("#winnerModal").modal("show");
  }
  else if (boardArray[0] != "" 
    && boardArray[0] === boardArray[3] 
    && boardArray[0] === boardArray[6]) {
    wonGame = true;
    drawWinningLine("v", 0, 1);
    $("#winnerModal #winner-text").html(boardArray[0] + " has won the game!");
    $("#winnerModal").modal("show");
  }
  else if (boardArray[1] != "" 
    && boardArray[1] === boardArray[4] 
    && boardArray[1] === boardArray[7]) {
    wonGame = true;
    drawWinningLine("v", 0, 2);
    $("#winnerModal #winner-text").html(boardArray[0] + " has won the game!");
    $("#winnerModal").modal("show");
  }
  else if (boardArray[2] != "" 
    && boardArray[2] === boardArray[5] 
    && boardArray[2] === boardArray[8]) {
    wonGame = true;
    drawWinningLine("v", 0, 3);
    $("#winnerModal #winner-text").html(boardArray[0] + " has won the game!");
    $("#winnerModal").modal("show");
  }
  else if (boardArray[0] != "" 
    && boardArray[0] === boardArray[4] 
    && boardArray[0] === boardArray[8]) {
    wonGame = true;
    drawWinningLine("dr", 0, 0);
    $("#winnerModal #winner-text").html(boardArray[0] + " has won the game!");
    $("#winnerModal").modal("show");
  }
  else if (boardArray[2] != "" 
    && boardArray[2] === boardArray[4] 
    && boardArray[2] === boardArray[6]) {
    wonGame = true;
    drawWinningLine("dl", 0, 0);
    $("#winnerModal #winner-text").html(boardArray[0] + " has won the game!");
    $("#winnerModal").modal("show");
  }
}

function getInitialBoard (defaultValue) {
  var board = [];
  for (var x = 0;x < 3;x++) {
    board.push([]);
    for (var y = 0;y < 3;y++) {
      board[x].push(defaultValue);
    }
  }
  return board;
}

function addPlayingPiece (mouse) {
  var xCordinate;
  var yCordinate;

  // whos turn is it now
  player = (numMoves % 2) + 1;
  if (!wonGame && numMoves===9){
    isDraw = true;
    $("#itsaDawModal").modal("show");
  }
  for (var x = 0;x < 3;x++) {
    for (var y = 0;y < 3;y++) {
      xCordinate = x * sectionSize;
      yCordinate = y * sectionSize;

      if (
          mouse.x >= xCordinate && mouse.x <= xCordinate + sectionSize &&
          mouse.y >= yCordinate && mouse.y <= yCordinate + sectionSize
        ) {
        
        sectionClicked = getSectionClicked(x, y);

        if (boardArray[sectionClicked-1] === "") {
          clearPlayingArea(xCordinate, yCordinate);
          if (player === 1 && firstPlayer === "x") {
            boardArray[sectionClicked-1] = "x";
            drawX(xCordinate, yCordinate);
          } else if (player === 1 && firstPlayer === "o") {
            boardArray[sectionClicked-1] = "o";
            drawO(xCordinate, yCordinate);
          }
          else if (player === 2 && firstPlayer === "x") {
            boardArray[sectionClicked-1] = "o";
            drawO(xCordinate, yCordinate);
          }
          else if (player === 2 & firstPlayer === "o") {
            boardArray[sectionClicked-1] = "x";
            drawX(xCordinate, yCordinate);
          }
          if (player === 1) {
            player = 2;
          } else {
            player = 1;
          }
          numMoves++;
        }
        else{
          $("#noMoveModal").modal("show");
        }
      }
    }
  }
}

function getSectionClicked(x, y){
  var section;

  if (x === 0 && y === 0){
    section = 1;
  }
  else if (x === 1 && y === 0){
    section = 2;
  }
  else if (x === 2 && y === 0){
    section = 3;
  }
  else if (x === 0 && y === 1){
    section = 4;
  }
  else if (x === 1 && y === 1){
    section = 5;
  }
  else if (x === 2 && y === 1){
    section = 6;
  }
  else if (x === 0 && y === 2){
    section = 7;
  }
  else if (x === 1 && y === 2){
    section = 8;
  }
  else if (x === 2 && y === 2){
    section = 9;
  }
  return section;
}

function clearPlayingArea (xCordinate, yCordinate) {
  context.fillStyle = "#fff";
  context.fillRect(
    xCordinate,
    yCordinate,
    sectionSize,
    sectionSize
  ); 
}

function drawO (xCordinate, yCordinate) {
  var halfSectionSize = (0.5 * sectionSize);
  var centerX = xCordinate + halfSectionSize;
  var centerY = yCordinate + halfSectionSize;
  var radius = (sectionSize - 100) / 2;
  var startAngle = 0 * Math.PI; 
  var endAngle = 2 * Math.PI;

  context.lineWidth = 10;
  context.strokeStyle = "#01bBC2";
  context.beginPath();
  context.arc(centerX, centerY, radius, startAngle, endAngle);
  context.stroke();
}

function drawX (xCordinate, yCordinate) {
  context.strokeStyle = "#f1be32";

  context.beginPath();
  
  var offset = 50;
  context.moveTo(xCordinate + offset + 15, yCordinate + offset);
  context.lineTo(xCordinate + sectionSize - offset - 15, yCordinate + sectionSize - offset);

  context.moveTo(xCordinate + offset + 15, yCordinate + sectionSize - offset);
  context.lineTo(xCordinate + sectionSize - offset - 15, yCordinate + offset);

  context.stroke();
}

function drawWinningLine(vh, row, col){
  // vh (v - draw vertical line in col 1, 2 or 3)
  // vh (h - draw horizontal line in row 1, 2 or 3)
  // vh (dr - draw diagonal line from 0 to 9)
  // vh (dl - draw diagonal line from 3 to 7)
  var lineWidth = 5;
  var strokeStyle = "#FF0000";
  var lineStart = 4;
  var offset = (canvasSize / 3) / 2;
  var lineLenght = canvasSize - 5;
  var x = col * offset + (offset * (col - 1));
  var y = row * offset + (offset * (row - 1));
  context.lineWidth = lineWidth;
  context.lineCap = 'round';
  context.strokeStyle = strokeStyle;
  context.beginPath();

  if (vh === "h"){
    context.moveTo(lineStart, y);
    context.lineTo(lineLenght, y);
  }
  else if (vh == "v"){
    context.moveTo(x, lineStart);
    context.lineTo(x, lineLenght);
  }
  else if (vh == "dr") {
    context.moveTo(0, 0);
    context.lineTo(canvasSize, canvasSize);
  }
  else if (vh == "dl") {
    context.moveTo(canvasSize, 0);
    context.lineTo(0, canvasSize);
  }
  context.stroke();
  context.closePath()
}

function drawLines (lineWidth, strokeStyle) {
  var lineStart = 4;
  var lineLenght = canvasSize - 5;
  context.lineWidth = lineWidth;
  context.lineCap = 'round';
  context.strokeStyle = strokeStyle;
  context.beginPath();

  /*
   * Horizontal lines 
   */
  for (var y = 1;y <= 2;y++) {  
    context.moveTo(lineStart, y * sectionSize);
    context.lineTo(lineLenght, y * sectionSize);
  }

  /*
   * Vertical lines 
   */
  for (var x = 1;x <= 2;x++) {
    context.moveTo(x * sectionSize, lineStart);
    context.lineTo(x * sectionSize, lineLenght);
  }

  context.stroke();
  context.closePath()
}

function getCanvasMousePosition (event) {
  var rect = canvas.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
}


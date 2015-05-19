/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  // var solution = undefined; //fixme

  // iterative solution
  // iterate over board length
    // generate random column
    // if there is no conflict
      // set piece there
  var solution = new Board({n: n});
  var currentRow;
  var columnToPlace;

  debugger;

  // finds an empty column given a board and rowIndex
  // check if has any conflicts && horizontal && and vertical
  // ASSUME THERE IS A PLACE WE CAN PUT IT
  var findEmptyColumn = function(board, row) {
    // declare emptyColumnLoc
    var emptyColumnLoc;
    // iterate over each column
    for (var i = 0; i < row.length; i++) {

    }
    // if we can place a piece in that place by checking for conflicts && horizontal && vertical
      // return emptyColumnLoc
  };

  // TODO: rewrite this to avoid using recusion
  for (var i = 0; i < n; i++) {
    currentRow =  solution.get(i);
    columnToPlace = findEmptyColumn(solution, currentRow);
    solution.togglePiece(i, columnToPlace);
  }

  // debugger;

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

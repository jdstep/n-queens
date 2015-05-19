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
  var solution = new Board({n: n});

  // debugger;

  // must pass in a row and column that is not currently occupied
  // tests if current passed in row and column has any rook conflicts
  var rookConflicts = function(rowIndex, columnIndex) {
    solution.togglePiece(rowIndex, columnIndex);

    if (solution.hasAnyRowConflicts() ||
        solution.hasAnyColConflicts() ) {
      solution.togglePiece(rowIndex, columnIndex);
      return true;
    } else {
      solution.togglePiece(rowIndex, columnIndex);
      return false;
    }
  };

  // // finds an empty column given a board and rowIndex
  // // pass in entire row
  // // check if has any conflicts && horizontal && and vertical
  // // ASSUME THE ROW IS EMPTY
  // var findEmptyColumn = function(rowIndex) {
  //   // iterate over each column
  //   for (var j = 0; j < n; j++) {
  //     if (rookConflicts(rowIndex, j) === false) {
  //       // returns column index that does not cause conflicts
  //       return j;
  //     }
  //   }
  // };



  // // iterates over each row to find a conflict-free place to put a rook
  // var placeRooks = function() {
  //   for (var i = 0; i < n; i++) {
  //     columnToPlace = findEmptyColumn(i);
  //     solution.togglePiece(i, columnToPlace);
  //   }
  // };

  // placeRooks();

  // recursive solution that places rooks in the first
  // available spot
  var lazyPlacement = function(row, column) {
    // if we increment columns off the board
    if (column === n) {
      // if we're on the last row, stop recursion
      if (row === n-1) {
        return 1;
      } else {
        // move to the next row at the first column
        lazyPlacement(row+1, 0);
      }
    } // if there are no conflicts at this placement
    // add a piece at this placement, then increment
    // to the next column
    else if (rookConflicts(row, column) === false) {
      solution.togglePiece(row, column);
      lazyPlacement(row, column+1);
    }
    // if there was a conflict, still move to the next
    // column
    else {
      lazyPlacement(row, column+1);
    }

  };

  // calls recursive function that adds rook
  // at first available space
  lazyPlacement(0,0);

  // console.log(solution.rows());
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));

  // returns an array of arrays of the solution board object
  return solution.rows();
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var rookCount = 0;
  var highestRow = null;

  // for now, store an array of each row and column that has been tried
  // on each row, check if the current value has already been implemented with the current previous rows
  //   WHILE CHECKING FOR CONFLICTS
  //    how to end the checks? some sort of null or undefined?
  // pass in the data object containing what was already tried into find n rooks solution (add parameters)

  // generate all possible boards, then check which ones pass?

  var solution = new Board({n: n});


  var rookConflicts = function(rowIndex, columnIndex) {
    solution.togglePiece(rowIndex, columnIndex);

    if (solution.hasAnyRowConflicts() ||
        solution.hasAnyColConflicts()) {
      solution.togglePiece(rowIndex, columnIndex);
      return true;
    } else {
      solution.togglePiece(rowIndex, columnIndex);
      return false;
    }
  };


  // recursive solution
  // if we hit the end of a row, we have all of the possible solutions for the row state above the current row
  // work from the bottom up, stepping towards the end of the row
  // separate the problem into smaller pieces after creating the diagonal solution

  var workingBoard = new Board(findNRooksSolution(n));


  // recursive solution that places rooks in the first
  // available spot
  var lazyPlacement = function(row, column) {
    // if we increment columns off the board
    if (column === n) {
      // if we're on the last row, stop recursion
      if (row === n-1) {
        return 1;
      } else {
        // move to the next row at the first column
        lazyPlacement(row+1, 0);
      }
    } // if there are no conflicts at this placement
    // add a piece at this placement, then increment
    // to the next column
    else if (rookConflicts(row, column) === false) {
      solution.togglePiece(row, column);
      console.log(solution.get(row)[column]);
      lazyPlacement(row, column+1);
    }
    // if there was a conflict, still move to the next
    // column
    else {
      lazyPlacement(row, column+1);
    }

  };

  // calls recursive function that adds rook
  // at first available space
  // creates initial diagonal board
  // lazyPlacement(0,0);

  // returns true if a rook is placed at the end of the row
  var rookAtEndOfRow = function(row) {
    if (solution.get(row)[n-1] === 1) {
      return true;
    } else {
      return false;
    }
  };

  // clears all rows below current row
  var clearLowerRows = function(currentRow) {
    for (var i = n-1; i > currentRow; i--) {
      for (var j = n-1; j > currentRow; j--) {
        if (solution.get(i)[j] === 1) {
          solution.togglePiece(i, j);
        }
      }
    }
  };

  // returns the column that the rook is on a given row
  var findRookOnRow = function(row) {
    for (var i = 0; i < n; i++) {
      if (solution.get(row)[i] === 1) {
        return i;
      }
    }
    return -1;
  };

  var moveRookOneSpace = function(row) {
    var column = findRookOnRow(row);
    solution.togglePiece(row, column);
    solution.togglePiece(row, column+1);
  };

  var addPieceIfNoConflict = function(row, column) {
    // if (solution.get(row)[column] === 1) {
    //   return -1;
    // }
    // solution.togglePiece(row, column);
    // if (solution.hasAnyRooksConflicts) {
    //   solution.togglePiece(row, column);
    // }
    //
    solution.togglePiece(row, column);

    if (solution.hasAnyRowConflicts() ||
        solution.hasAnyColConflicts()) {
      solution.togglePiece(row, column);
    } else {
      return 1;
    }
  };

  var bottomRightOfBoard = function (row, column) {
    if (row === n-1 && column === n-1) {
      return true;
    } else {
      return false;
    }
  };


  var generateSolutions = function(row, column, highestRow){
    // debugger;

    if (solution._isInBounds(row, column) === false) {
      if (row < 0) {
        return 1;
      }
      if (column === n) {
        generateSolutions(row+1, 0, highestRow);
      }
      if (row === n) {
        solutionCount++;
        console.log(solution.rows());
        if (n === 1) {
          return 1;
        }
        if (highestRow === -1) {
          return 1;
        }
        // if we found all the solutions for the rook
        // on this row
        if (rookAtEndOfRow(highestRow)) {
          moveRookOneSpace(highestRow-1);
          clearLowerRows(highestRow-1);
          generateSolutions(highestRow, 0, highestRow-1);
        } else {
          moveRookOneSpace(highestRow);
          clearLowerRows(highestRow);
          generateSolutions(highestRow+1, 0, highestRow);
        }
      }

    } else {
      addPieceIfNoConflict(row, column);

      generateSolutions(row, column+1, highestRow);
    }


    // if (rookAtEndOfRow(row)) {

    //   console.log(solution.rows());
    //   // if the rook is at the end of the first row
    //   // end recursion
    //   if (row === 0) {
    //     return 1;
    //   }

    //   // recursively call the solution generator
    //   // starting at the beginning of the previous row
    //   generateSolutions(row-1, 0);
    // }

    // // if we increment columns off the board
    // if (column === n) {
    //   // if we're on the last row, stop recursion
    //   if (row === n-1) {
    //     return 1;
    //   } else {
    //     // move to the next row at the first column
    //     generateSolutions(row+1, 0);
    //   }
    // } // if there are no conflicts at this placement
    // // add a piece at this placement, then increment
    // // to the next column
    // else if (rookConflicts(row, column) === false) {
    //   solution.togglePiece(row, column);
    //   // console.log(solution.get(row)[column]);
    //   generateSolutions(row, column+1);
    // }
    // // if there was a conflict, still move to the next
    // // column
    // else {
    //   generateSolutions(row, column+1);
    // }
  };

    // if the rook is placed on the end of the row

    //  go to the row above it
    //    clear out all of the rooks below the above row
    //      increment this rook by one column placement
    //       generate lazy solution for all rooks below
    //        solutionCount++
    // if the rook is at the end of the row and it's the first row
    //   return 1;

  // };

  generateSolutions(0, 0, n-2);






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

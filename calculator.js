function TreeNode(name, ...children) { //passes in the name of the node and an array of its children
    this.name= name;
    this.children = children;
}

function Calculator() {
    this.tokenTypes = [
        ["NUMBER",    /^\d+/ ],
        ["ADD",       /^\+/  ],
        ["SUB",       /^\-/  ],
        ["MUL",       /^\*/  ],
        ["DIV",       /^\//  ],
        ["LPAREN",    /^\(/  ],
        ["RPAREN",    /^\)/  ]
      ];

    this.tokenStream = [];
    

}

Calculator.prototype.lexer = function(input) {
   var tokens = this.tokenTypes;
   var tokenStream = this.tokenStream;
   input.split('').forEach(function(token) {
       tokens.forEach(function(currToken) {
            if (token.match(currToken[1])) {
                tokenStream.push({name: currToken[0], value: token});
            }
       });

   });
    return this.tokenStream;
};

Calculator.prototype.peek = function() {
    var firstEl = this.tokenStream[0];
    if (!firstEl) {
        return null;
    }
    return firstEl;
};

Calculator.prototype.get = function() {
    var firstEl = this.tokenStream.shift();
    if (!firstEl) {
        return null;
    }
    return firstEl;
};

Calculator.prototype.parseExpression = function(term) {
  var newTerm = this.parseTerm();
  var a = this.parseA();
  return new TreeNode("Expression", newTerm, a);
};

Calculator.prototype.parseA = function () {
  var nextToken = this.peek();
  if(nextToken && nextToken.name === "ADD") {
    this.get();
    return new TreeNode("A", "+", this.parseTerm(), this.parseA());
  } else if(nextToken && nextToken.name == "SUB") {
    this.get();
    return new TreeNode("A", "-", this.parseTerm(), this.parseA());
  } else {
    return new TreeNode("A");
  }
};

Calculator.prototype.parseB = function() {
  var nextToken = this.peek();
  if(nextToken && nextToken.name === "MUL") {

  } else if(nextToken && nextToken.name === "DIV") {

  }
};

Calculator.prototype.parseTerm = function() {
  var nextToken = this.peek();
  if(nextToken && nextToken.name === "NUMBER") {
    this.get();
    return new TreeNode("T", nextToken.value, this.parseFactor(), this.parseB());
  }
};

Calculator.prototype.parseFactor = function() {
  var nextToken = this.peek();
  if(nextToken && nextToken.name === "LPAREN") {
    this.get();
    var expr = this.parseExpression();
    this.get();
    return new TreeNode("F", "(", expr, ")");
  } else if(nextToken && nextToken.name === "RPAREN") {
    return "please no";
  }
};

var calculator = new Calculator();
calculator.lexer('(3)');

// make a fake version of parseExpression
var fakeExpressionTreeNode = new TreeNode("Expression", "3");
console.dir(fakeExpressionTreeNode);
calculator.parseExpression = function() {
  this.get(); // remove the 3 when parseFactor runs
  return fakeExpressionTreeNode;
};

var output = calculator.parseFactor();
console.log(output);



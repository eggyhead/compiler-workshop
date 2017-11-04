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
       })
       
   }) 
    
    return this.tokenStream;
}

Calculator.prototype.calcPeek = function() {
    var firstEl = this.tokenStream[0];

    if (!firstEl) {
        return null;
    }
    return firstEl;
}

Calculator.prototype.calcGet = function() {

    var firstEl = this.tokenStream.shift();
    
        if (!firstEl) {
            return null;
        }
    return firstEl;

}


var ourCalc = new Calculator();
console.log(ourCalc.lexer('2+3'));
console.log(ourCalc.calcPeek());
console.log(ourCalc.calcGet())






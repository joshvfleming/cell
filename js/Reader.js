/* Reader
 *
 * This is the symbol representation class.
 * Changed
 */
cell.Reader = (function() {
  var _terminalSet = {
    '(': 'open',
    ')': 'close',
    '[': 'open',
    ']': 'close'
  };

  var _aliasSet = {
    '=>': 'lambda'
  };

  var _commentSet = {
    ';': 'open',
    '\n': 'close'
  };

  var _macroSet = {
    "'": 'quote'
  };

  var WHITESPACE_PATTERN = /[\s\,]+/;

  var Reader = function Reader(str) {
    this.index = 0;
    this.source = str;
    this.tokens = this.lex(str);
  };

  // Move to the next token
  Reader.prototype.moveNext = function() {
    this.index++;
  };

  // Return to the previous token
  Reader.prototype.movePrev = function() {
    this.index--;
  };

  // Return the current token, and move to the next one
  Reader.prototype.getToken = function() {
    var token = null;

    if (this.index < this.tokens.length) {
      token = this.tokens[this.index];
      this.moveNext();
    }

    return token;
  };

  // Determines whether token is an opening terminal
  var isOpenTerminal = function(token) {
    return token.type === 'terminal' && token.value === 'open';
  };

  // Determines whether token is an closing terminal
  var isCloseTerminal = function(token) {
    return token.type === 'terminal' && token.value === 'close';
  };

  // Expands the macro token and following form into an eval'able form
  // e.g. "'(1 2 3)" => "(quote (1 2 3))"
  Reader.prototype.expandMacro = function(token) {
    return new cell.Cell(new cell.Symbol(token.value),
                         new cell.Cell(this.read())); 
  };

  // Main reader method. Walks the tokens, resolving forms recursively
  // and combining the result into nested Cell lists
  Reader.prototype.read = function() {
    var expr = [];

    var token = this.getToken();
    if (token) {
      if (isOpenTerminal(token)) {
        token = this.getToken();
        while (token) {
          if (token.type === 'macro') {
            expr.push(this.expandMacro(token));
          } else if (token.type !== 'terminal') {
            expr.push(token.value);
          } else if (isOpenTerminal(token)) {
            this.movePrev();
            expr.push(this.read());
          } else if (isCloseTerminal(token)) {
            return cell.Cell.fromArray(expr);
          }

          token = this.getToken();
        }

        throw("Error: unbalanced parens");
      } else {
        // value outside parens
        if (token.type === 'macro') {
          return this.expandMacro(token);
        } else {
          return token.value;
        }
      }

      return cell.Cell.fromArray(expr);
    }
  };

  // Returns a token from the buffer
  var tokenFromBuffer = function(buffer, type) {
    var word = buffer.join('');

    word = _aliasSet[word] || word;

    if (word.match(cell.Number.PATTERN)) {
      return {type: 'number', value: new cell.Number(word)};
    }

    if (type === 'string') {
      return {type: 'string', value: new cell.String(word)};
    }

    if (word.match(cell.Keyword.PATTERN)) {
      return {type: 'keyword', value: new cell.Keyword(word)};
    }

    if (word.match(cell.Symbol.PATTERN)) {
      return {type: 'symbol', value: new cell.Symbol(word)};
    }

    return null;
  };

  // Scans the given string, and returns an array of tokens that the
  // reader can understand
  Reader.prototype.lex = function(str) {
    var tokens = [];
    var buffer = [];
    var inComment = false;
    var inString = false;

    var tokenizeAndPushBuffer = function(type) {
      if (buffer.length) {
        var token = tokenFromBuffer(buffer, type);
        if (token) {
          tokens.push(token);
        }
        buffer.length = 0;
      }
    };

    for(var i=0, l=str.length; i<l; i++) {
      var c = str[i];

      // Comment reached
      if (_commentSet[c]) {
        inComment = (_commentSet[c] === 'open');
        continue;
      }

      // Ignore contents if we're in a comment
      if (inComment) {
        continue;
      }

      // Whitespace. We can now treat the buffer as a potential token,
      // if we're not in a string
      if (c.match(WHITESPACE_PATTERN)) {
        if (!inString) {
          tokenizeAndPushBuffer();
          continue;
        }
      }

      // String boundary reached
      if (c.match(cell.String.PATTERN)) {
        if (inString) {
          tokenizeAndPushBuffer('string');
        }
        inString = !inString;
        continue;
      }

      // Beginnings of a reader macro?
      var macro = _macroSet[c];
      if (macro) {
        tokens.push({type: 'macro', value: macro});
        continue;
      }

      // Terminal
      var terminal = _terminalSet[c];
      if (terminal) {
        tokenizeAndPushBuffer();

        tokens.push({type: 'terminal', value: terminal});
        continue;
      }

      buffer.push(c);
    }

    // handle any remaining buffer contents
    tokenizeAndPushBuffer();

    return tokens;
  };

  return Reader;
})();

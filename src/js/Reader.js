/* Reader
 *
 * This is the symbol representation class.
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

  Reader.prototype.moveNext = function() {
    this.index++;
  };

  Reader.prototype.movePrev = function() {
    this.index--;
  };

  Reader.prototype.getToken = function() {
    var token = null;

    if (this.index < this.tokens.length) {
      token = this.tokens[this.index];
      this.moveNext();
    }

    return token;
  };

  var isOpenTerminal = function(token) {
    return token.type === 'terminal' && token.value === 'open';
  };

  var isCloseTerminal = function(token) {
    return token.type === 'terminal' && token.value === 'close';
  };

  Reader.prototype.read = function() {
    var token = this.getToken();
    var expr = [];

    if (token) {
      if (isOpenTerminal(token)) {

        token = this.getToken();
        while (token) {
          if (token.type === 'macro') {
            var form = new cell.Cell(new cell.Symbol(token.value),
                                     new cell.Cell(this.read())); 
            expr.push(form);
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
      }
    }
  };

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

      if (_commentSet[c]) {
        inComment = (_commentSet[c] === 'open');
        continue;
      }

      if (inComment) {
        continue;
      }

      if (c.match(WHITESPACE_PATTERN)) {
        if (!inString) {
          tokenizeAndPushBuffer();
          continue;
        }
      }

      if (c.match(cell.String.PATTERN)) {
        if (inString) {
          tokenizeAndPushBuffer('string');
        }
        inString = !inString;
        continue;
      }

      var macro = _macroSet[c];
      if (macro) {
        tokens.push({type: 'macro', value: macro});
        continue;
      }

      var terminal = _terminalSet[c];
      if (terminal) {
        tokenizeAndPushBuffer();

        tokens.push({type: 'terminal', value: terminal});
        continue;
      }

      buffer.push(c);
    }

    return tokens;
  };

  return Reader;
})();

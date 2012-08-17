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
  
  var WHITESPACE_PATTERN = /[\s\,]+/;

  var Reader = function Reader(str) {
    this.index = 0;
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
          if (token.type !== 'terminal') {
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

  var tokenFromBuffer = function(buffer) {
    var word = buffer.join('');

    if (word.match(cell.Number.PATTERN)) {
      return {type: 'number', value: new cell.Number(word)};
    }

    if (word.match(cell.Atom.String.PATTERN)) {
      return {type: 'string', value: new cell.Atom.String(word)};
    }

    if (word.match(cell.Atom.Keyword.PATTERN)) {
      return {type: 'keyword', value: new cell.Atom.Keyword(word)};
    }

    if (word.match(cell.Atom.Symbol.PATTERN)) {
      return {type: 'symbol', value: new cell.Atom.Symbol(word)};
    }

    return null;
  };

  Reader.prototype.lex = function(str) {
    var tokens = [];
    var buffer = [];

    var tokenizeAndPushBuffer = function() {
      if (buffer.length) {
        var token = tokenFromBuffer(buffer);
        if (token) {
          tokens.push(token);
        }
        buffer.length = 0;
      }
    };

    for(var i=0, l=str.length; i<l; i++) {
      var c = str[i];

      if (c.match(WHITESPACE_PATTERN)) {
        tokenizeAndPushBuffer();
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

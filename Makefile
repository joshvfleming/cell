web-repl: clean
	@echo Building web REPL...
	@mkdir build
	@cp -fr demo/* build
	@cp -fr src/* build
	@echo Done.

clean:
	@rm -fr build

test:
	./node_modules/.bin/mocha --reporter list

.PHONY: build-web clean test	

build-web: clean
	mkdir build
	cp -fr demo/* build
	cp -fr src/* build

clean:
	rm -fr build

test:
	./node_modules/.bin/mocha --reporter list

.PHONY: test	

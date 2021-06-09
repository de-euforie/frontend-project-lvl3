install:
	npm install

publish:
	npm publish --dry-run

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .

asc:
	asciinema rec

test:
	npm test	

test-coverage:
	npm test -- --coverage --coverageProvider=v8
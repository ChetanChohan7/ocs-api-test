# ocs-api-test
## Running the suite
In order to run the tests you need to open either an IDE and target the base directory and run through the terminal, or you can open a terminal within the base directory. You'll need to run the following commands:

#### 1) npm install

Then in order to run the tests you can run either of the following:

#### 2) npx codeceptjs run --steps
#### npx codeceptjs run --verbose (a complete console output of commands - useful for debugging)
#### npx codeceptjs run --grep "API" --steps (in order to run the full suite)
#### npx codeceptjs run --grep "SMOKE" --steps (in order to run a smaller set of tests, an example of defined smoke tests)

Tests tagged "@fail" are considered identified issues
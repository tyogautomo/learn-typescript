# Mastering Typescript

### 1. How to Compile a .ts file to .js file?

Simply run ```tsc filename.ts``` on your terminal, and it will compile into a .js file

### 2. How to watch a single file and automatically compile it into .js file?

Simply run ```tsc filename.ts --watch```

### 3. How to automatically compile .ts file into .js file in the entire project?

  1. You need to init the project as TS project, type this on your terminal under your project folder
      ```
      tsc init
      ```
  2. Then watch the files with
      ```
      tsc --watch
      ```
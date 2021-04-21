# Mastering Typescript

### 1. How to Compile a .ts file to .js file?

Simply run ```tsc filename.ts``` on your terminal, and it will compile into a .js file

### 2. How to watch a single file and automatically compile it into .js file?

Simply run ```tsc filename.ts --watch```

### 3. How to automatically compile .ts file into .js file in the entire project?

  1. You need to init the project as TS project, type this on your terminal under your project folder
      ```
      tsc --init
      ```
  2. Then watch the files with
      ```
      tsc --watch
      ```
     Or if you just want to compile once, just type
      ```
      tsc
      ```

### 4. How to exclude a file to not automatically compiled?

After you init the TS, you'll get the `tsconfig.json`, add a `exludes` key into that json, and type your files/folders that you want to exclude <br/>
This also works on `includes` if you want only specific files or folders that to be compiled <br/>
Or `files` for specific files, but not folders

### 5. How to set .js ES compile target?

It also can be done in `tsconfig.json`. If you want the DOM library included into the project, dont mess with the `lib` key on tsconfig.json. The default already included `"dom", "es6", "dom.iterable", "scripthost"`

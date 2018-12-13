# JSON Value-switcher
A  JavaScript program that as input takes a JSON object and returns it with all key/values switched and the (new) value reversed as a string.

**Example:**
```JSON
{
    "person": "beans",
    "employee": "diego da costa",
    "number": 1234,
    "nested-object": {
        "hi":123,
        "bye":456,
        "happy":[],
        "Christmas is here": {
            "rice":true,
            "beans":false,
            "banana": 2.15
        }
    },
    "decimal": 0.15,
    "array": [],
    "object": {},
    "boolean": 0,
    "void": null
}
``` 
Will output:
```JSON
{
    "beans": "nosrep",
    "diego da costa": "eeyolpme",
    "1234": "rebmun",
    "nested-object": {
        "123": "ih",
        "456": "eyb",
        "happy": [],
        "Christmas is here": {
            "true": "ecir",
            "false": "snaeb",
            "2.15": "ananab"
        }
    },
    "0.15": "lamiced",
    "array": [],
    "object": {},
    "0": "naeloob",
    "null": "diov"
}
```

# Runtime Environment
The project runs inside a docker container to avoid runtime environment issues.
The image used is the [node:lts-jessie-slim](https://github.com/nodejs/docker-node/blob/3e539e6925a524bf4fda47ea33ed33d0d4fb0e20/10/jessie-slim/Dockerfile), that has Node on version 10.14.2.

To run this project, you should install [docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/).

As dependencies it is used [Jest](https://jestjs.io/) to tests and [Babel](https://babeljs.io/) as a transpiler from ES6 to Common.Js.

# Setting up the container
In the project folder, run the following command:
```
docker-compose up -d
```

It will:
- Download the container image with Node.js
- Run `yarn install` inside the container
- Enter in deatached mode, so that your terminal doesn't wait for anything

After that you can run the commands directly from your host machine
```
-- from your host machine
docker exec -ti sambla_app_1 yarn start
docker exec -ti sambla_app_1 yarn test
```

Or from inside the container:
```
-- access the container
docker exec -ti sambla_app_1 bash
-- from the container
yarn start
yarn test
```

# Running the project
To execute the main file, run the command:
```
yarn start
```

# Running the tests
To run the Jest tests, run the command:
```
yarn test
```

# Input of Data
You can use an existing JSON file that is already in the `/input` folder, or you can change the content/add other files to it.

After that, to inform which JSON file you want to switch, change the value of `inputFileName` in the file `file-settings.json`.

# Output of Data
After switching the JSON, the program will create/update a file in the `/output` folder, considering the key `outputFileName` in the file `file-settings.json`.

**Important:** Files are not deleted in from the output directory


# Data Manipulation

## Key switch and value reversion data types:
Data types that allow reversion between key-value:
- Strings
- Numbers
- Booleans
- Nulls

## Special data types (roots):
Data types where there is no reverson between key-value, only used as a roots:
- Objects
- Arrays

## Key collision:
There is no prevention for object values colision when they become keys (but there is a test for that).

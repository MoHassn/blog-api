# Blog API

## Description

This is a Restful blog API. that can be used to create, read blogs, authors, and comments.

## Live Demo

This is a live demo of the blog api deployed on [heroku](https://hassan-blog-api.herokuapp.com/).

## Installation

In order to get the app working locally, you need to clone the repository and do the following:

- create .env file in the root directory
- add the monogodb connection string to the .env file as DB_HOST
- add the JWT secret to the .env file as JWT_SECRET
- run `npm install`
- run `npm start-dev` to start the development server using ts-node-dev

## Test the API with Postman

- open the postman collection provided in the repository
- set the `{host}` variable to https://hassan-blog-api.herokuapp.com/ or to the localhost version if you are running the app locally
- regiser a new user from the collection and you will get a token
- set the `{token}` variable to the token you got from the registration
- test the rest of the endpoints

## API Documentation

### Error Handling

Errors are handled by returning a JSON object with a `message` property.

```
{
  "message": "error message"
}
```

Types of errors:

- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden

### Endpoints

#### GET /blogs

- General:

  - Returns a list of blogs
  - if search query is provided, it will return only blogs with title that match the query

- Example:
  - `curl {host}/blogs`
    ```
      {
        "blogs": [
            {
                "_id": "61b67e78258e43d895428905",
                "title": "This is a blog",
                "body": "this is the body",
                "author": {
                    "_id": "61b63e69aa2db1db8f3f2dcb",
                    "name": "Hassan Mohamed",
                    "jobTitle": "Developer",
                    "email": "hassan85@gmail.com",
                    "password": "$2b$10$gCySXLneNb6a3ezo.FNNQeTCLTk/N51AlH3/aRTJxcPNdAYdwZhSC",
                    "__v": 0
                },
                "comments": [
                    "61b6879836a9d0fca5b52465",
                    "61b687dd36a9d0fca5b52468",
                    "61b687e836a9d0fca5b5246b"
                ],
                "likes": [
                    "61b63e69aa2db1db8f3f2dcb",
                    "61b63e69aa2db1db8f3f2dcb",
                    "61b63e69aa2db1db8f3f2dcb"
                ],
                "__v": 0
            },
            {
                "_id": "61b693f6152719527c0b40d4",
                "title": "A new Blog Title",
                "body": "a body of the blog",
                "author": {
                    "_id": "61b693bc152719527c0b40d2",
                    "name": "Mohamed Saeed",
                    "jobTitle": "Software Developer",
                    "email": "hassans@gmail.com",
                    "password": "$2b$10$rZNvVfiCW0j7xo.Vo.SM.e0JMo9K5Mz.XIrtjt.MEerKFxsL8fmz2",
                    "__v": 0
                },
                "comments": [],
                "likes": [],
                "__v": 0
            }
        ]
      }
    ```
  - `curl {{host}}/blogs?search=new`
    ```
      {
        "blogs": [
            {
                "_id": "61b693f6152719527c0b40d4",
                "title": "A new Blog Title",
                "body": "a body of the blog",
                "author": {
                    "_id": "61b693bc152719527c0b40d2",
                    "name": "Mohamed Saeed",
                    "jobTitle": "Software Developer",
                    "email": "hassans@gmail.com",
                    "password": "$2b$10$rZNvVfiCW0j7xo.Vo.SM.e0JMo9K5Mz.XIrtjt.MEerKFxsL8fmz2",
                    "__v": 0
                },
                "comments": [],
                "likes": [],
                "__v": 0
            }
        ]
    }
    ```

#### GET /blogs/:id

- General:
  - Returns a blog with the given id
  - If the blog is not found, it will return a 404 error

#### POST /blogs

- General:

  - Creates a new blog
  - Requires authroization
  - Requires the following properties in the body:
    - `title`
    - `body`

- Example: -`curl {host}/blogs -X POST -H "Content-Type: application/json" -d '{"title": "This is a blog", "body": "this is the body"}'`
  ```
    {
      "blog": {
          "title": "A new Blog Title",
          "body": "a body of the blog",
          "author": "61b63e69aa2db1db8f3f2dcb",
          "comments": [],
          "likes": [],
          "_id": "61b6d8430e684fa5409af1ae",
          "__v": 0
      }
    }
  ```

#### POST /blogs/:id/comments

- General:

  - Creates a new comment for the blog with the given id
  - Requires authroization
  - Requires the following properties in the body:
    - `body`

#### POST /blogs/:id/likes

- General:

  - Adds the current user to the likes of the blog with the given id
  - Requires authroization

#### GET /users

- General:
  - Returns a list of users

#### GET /users/:id

- General:
  - Returns a user with the given id
  - If the user is not found, it will return a 404 error

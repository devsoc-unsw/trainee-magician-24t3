# Routes

The various backend routes for Life Death Pro tips. Each one returns a JSON object as defined in [dataStructure.json](./dataStructure.json).

| **Route**               | **Method** | **Data**                                     | **Description**                                                             | **Returns**                                  |
| ----------------------- | ---------- | -------------------------------------------- | --------------------------------------------------------------------------- | -------------------------------------------- |
| `/users/register`       | POST       | `email`, `firstName`, `lastName`, `password` | Creates a new user account                                                  | `userId`                                     |
| `/users/login`          | POST       | `email`, `password`                          | Logins into an existing user account                                        | `userId`                                     |
| `/users/:id`            | GET        | `userId`                                     | Fetches all the data associated with a user                                 | A user object                                |
| `/users/:id`            | DELETE     | `userId`                                     | Deletes a user associated with `userId`                                     | {}                                           |
| `/users/:id/favourites` | GET        | `userId`                                     | Fetches all tip postsfavourited by the user                                 | Array of Tip objects                         |
| `/tips`                 | GET        |                                              | Fetches all tips                                                            | Array of Tip objects                         |
| `/tips/:id`             | GET        | `tipId`                                      | Fetches all tips with given id                                              | Single tip object                            |
| `/tips/:id/upvote`      | PUT        | `userId`, `tipId`                            | Upvotes a post assocaited with `postId` for user associated with `userId`   | Number of upvotes after action is complete   |
| `/tips/:id/downvote`    | PUT        | `userId`, `tipId`                            | Downvotes a post associated with `postId` for user assocaited with `userId` | Number of downvotes after action is complete |
| `/tips/:id/favourite`   | PUT        | `userId`, `tipId`                            | Favourites the tip for the user associated with `userId`                    | `{}`                                         |
| `/tips/:id/comment`     | POST       | `userId`, `tipId`                            | Posts a comment for the user on a given tip post                            | `{}`                                         |

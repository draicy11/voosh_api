<a name="_51n4xx5zpjd6"></a>API Documentation

<a name="_jl2vp0bi93uw"></a>Voosh Assignment


# <a name="_42frhaxni6k3"></a>Overview
This document provides an overview and usage guide for the Express-based API that includes user registration, authentication, and user profile management. It includes the endpoints available, their purposes, and how to interact with them.

# <a name="_6gtx3o4qvyog"></a>Assumptions
In the problem statement, there were a few details that were confusing for me so I have taken the following assumptions and made the project accordingly.

1. We had to create an API first, and then add the required user stories on top of that
1. Since there is no mentioning of a specific database, I chose mongoDB
1. Admin users can only be added from mongo’s console.

The commit <> in the repo’s commit history mark the completion of the “existing API” and moving forward are the new requirements that were needed to be implemented

# <a name="_prvv6vahha3l"></a>Explanation of the Existing API
## <a name="_ke9bopsx4866"></a>Architecture
In this API, I have used

## <a name="_oa16ty71vdm1"></a>Base URL
All API endpoints are prefixed with ***/api.***
## <a name="_fi621o758er4"></a>Endpoints
### <a name="_h18h0rvxu0is"></a>Authentication Routes (/auth)
All routes are prefixed with ***/api/auth***
#### <a name="_ynxctjvfrtgj"></a>Login
- Endpoint: /auth/login
- Method: POST
- Description: Logs in an existing user.
- Request Body:

|{<br>` `"email": "string",<br>` `"password": "string"<br>}|
| :- |

- Responses:
  - 200 OK: User logged in successfully.
  - 400 Bad Request: Incorrect email or password.
  - 500 Internal Server Error: An error occurred on the server.
#### <a name="_7ftx6ntedux8"></a>Logout
- Endpoint: /auth/logout
- Method: POST
- Description: Logs out the currently logged-in user.
- Responses:
  - 200 OK: User logged out successfully.
  - 401 Unauthorized: No user is currently logged in.
  - 500 Internal Server Error: An error occurred on the server.
#### <a name="_fd0rikkn9arh"></a>Google OAuth 2.0 Login/Signup
- Endpoint: /auth/google
- Method: GET
- Description: Initiates Google OAuth 2.0 login process.
- Responses:
  - Redirects the user to Google's OAuth 2.0 login page.
#### <a name="_esrw9fh0ztxk"></a>Google OAuth 2.0 Callback
- Endpoint: /auth/google/callback
- Method: GET
- Description: Handles the callback from Google OAuth 2.0.
- Responses:
  - 200 OK: User authenticated successfully and redirected.
  - 401 Unauthorized: Google authentication failed.
### <a name="_rbd2t5m5qp26"></a>User Management Routes (/users)
All routes are prefixed with ***/api/users***

#### <a name="_lyjcjw4yub2b"></a>Register a new user
- Endpoint: /users/register
- Method: POST
- Description: Registers a new user.
- Request Body:

|{<br>` `"name": "string",<br>` `"email": "string",<br>` `"password": "string"<br>}|
| :- |

- Responses:
  - 200 OK: User registered successfully.
  - 400 Bad Request: User already exists.
  - 500 Internal Server Error: An error occurred on the server.
#### <a name="_h9t27asxdu7n"></a>Get details of the logged in user
- Endpoint: /users/
- Method: GET
- Description: Retrieves details of the currently logged-in user.
- Responses:
  - 200 OK: User details retrieved successfully.
  - 401 Unauthorized: No user is currently logged in.
  - 500 Internal Server Error: An error occurred on the server.
#### <a name="_kksreak8shko"></a>List all users
- Endpoint: /users/all
- Method: GET
- Description: Lists all registered users. Only accessible by authenticated users.
- Responses:
  - 200 OK: List of users retrieved successfully.
  - 401 Unauthorized: User must be logged in to access this endpoint.
  - 500 Internal Server Error: An error occurred on the server.
##### <a name="_6f4wu9glu84r"></a>**Edit User Profile**
- Endpoint: /users/edit/
- Method: PUT
- Description: Edits the profile of the logged in.
- Request Body

|{<br>` `"photo": "string",<br>` `"name": "string",<br>` `"bio": "string",<br>` `"phone": "string",<br>` `"email": "string",<br>` `"password": "string",<br>}|
| :- |

- Responses:
  - 200 OK: User profile updated successfully.
  - 404 Not Found: User not found.
  - 401 Unauthorized: User must be logged in to access this endpoint.
  - 500 Internal Server Error: An error occurred on the server.
## <a name="_ab73a8lglfu0"></a>Error Handling
The API provides meaningful error messages and status codes for each endpoint to help identify the cause of any issues.
## <a name="_kiv3y1g9eiay"></a>Authentication and Authorization
- All routes, except for registration and login, require the user to be authenticated.
- Use session-based authentication with passport to maintain user sessions.
## <a name="_a6tjah184gp"></a>Security Considerations
- Ensure all sensitive data, such as passwords, are encrypted using bcrypt.
- Protect endpoints against unauthorized access by ensuring users are authenticated before accessing sensitive routes.
# <a name="_tqbcqtnhv9yl"></a>Integration of the new user stories
### <a name="_wblvb01uj7o9"></a>Users can toggle the profile from public to private
Implemented a new route in to toggle the status
### <a name="_6p0mt8lch7f"></a>Admins can see every profile, while normal users can only see private profiles
Updated the /api/users/all route with role-based logic
###



# DevTinder APIs

# authRouter
- Post /signup
- Post /login
- Post /logout

# profileRouter

- Get /profile/view
- Patch  /profile/edit
- Patch /profile/password

# connectionRequestRouter

- Post /request/send/interested/:userId
- Post /request/send/ignored/:userId
- Post /request/send/status/:userId  i.e.status can be ignored or interested

- Post /request/review/accepted/:requestedId
- Post /request/review/rejected/:requestId
 
# userRouter

- Get /user/connections
- Get /user/requests
- Get /user/feed -   Gets you the profiles of other users on platforms

Status: ignore, interested , accepted, rejected

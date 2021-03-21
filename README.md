# communication-channel-backend
Backend API for Zine Communication Channel.

.env:

```
URI=<MONGODB_URI>
JWT_SECRET=<JWT_SECRET_KEY>
ADMIN_PASSWORD=<ADMIN_PASSWORD>
```

```yarn```

```yarn start```

```PORT=3000```

#### health check
```/api```
Method: GET

sample response
```Application running```


#### signin
```/api/signin```
Method: POST
sample request
```
{
"email": "pavnesh@zine.com"
"password": "123456"
    }
```
sample response
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmZkZTkzMmFiMGM1MjRlOTU4OWYzNjYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MTI5MzkzNDgsImV4cCI6MTY0NDQ3NTM0OH0.9nqB2XOF8vl5MOWoST1NDMGY2FcBUushGJ61_cRfvKg",
    "user": {
        "_id": "5ffde932ab0c524e9589f366",
        "fullName": "Pavnesh (Zine)",
        "email": "pavnesh@zine.co.in",
        "role": "admin",
        "rollNumber": "2019kuec2037",
        "college": "MNIT"
    }
}
```


#### signup
```/api/signup```
Method: POST
sample request
```{
    "fullName": "Ramu Kaka",
	"email": "ramu90@kakaka.com",
	"password": "123456",
    "rollNumber": "2019kuec2037",
    "college": "MNIT"
}
```
sample response
```
{
    "message": "Registration Successful",
    "data": {
        "role": "fresher",
        "college": "MNIT",
        "domainOfInterest": [],
        "_id": "60238158fabaa32b66ff1eda",
        "fullName": "Ramu Kaka",
        "email": "ramu90@kakaka.com",
        "hash_password": "$2b$10$1J//YcCdgoQDEoY/q5NXdeWRBD3JHF3bTTaNEZdPo/brsFIV8Rz4m",
        "rollNumber": "2019kuec2037",
        "createdAt": "2021-02-10T06:46:48.406Z",
        "updatedAt": "2021-02-10T06:46:48.406Z",
        "__v": 0
    }
}
```


#### create room
```/api/createroom```
Method: POST
sample request
```
{
    "conversationName": "CAD"
}
```
sample response
```
{
    "message": "Succesfully created chatroom"
}
```

#### join room
```/api/joinroom```
Method: POST
sample request
```
{
    "roomId": "5ff2fbc9d0eec312cbbb6d95",
    "userId": "601adc694cb294986a37ead8"
}
```
sample response
```
{
    "message": "User already exists in that chatroom"
}
```

#### get list of all chat room of a user
```/api/rooms```
Method: POST
sample request
```
{
    "userId": "5fe85f079b965e3ade7dc13f"
}
```
sample response
```
{
    "chats": []
}
```

### get all messages from a chat room
```/api/messages```
Method: POST
sample request
```
{
    "roomId": "5ff2fbe0d0eec312cbbb6d96"
}
```
sample response
```
{
    "messages": [
        {
            "_id": "60096a4cab0c524e9589f59e",
            "senderId": "5ffe939cab0c524e9589f3a9",
            "content": "Welcome to the BME channel. The blog is available at our site. All the doubts regarding the blog will be discussed here.\n\nYour mentors for this blog are- Rahul, Devansh, Chirayu, Apoorva.\n\nIf you need to reach out to any of the mentors with regards to doubts in particular please prefer the communication channel as it may help others as well, else you can also reach out to them on mail ('mentor-name'@zine.co.in, eg: rahul@zine.co.in)",
            "conversationId": "5ff2fbe0d0eec312cbbb6d96",
            "senderName": "Rahul (Zine)",
            "createdAt": "2021-01-21T11:49:32.992Z",
            "updatedAt": "2021-01-21T11:49:32.992Z",
            "__v": 0
        },
        {
            "_id": "60099d8bab0c524e9589f59f",
            "senderId": "6001a11aab0c524e9589f4a7",
            "content": "why triangles are used in cardboard layers to finding a Planet’s surface gravity and terrain characteristics; to design a Space rover’s drive system. Is it something related to curvature of space because as we increase the weight more and more curvature we can see on the cardboard layer. when we remove any side the triangular surface  bends in the direction of applies force (gravity in this case ) to maintain its equillibrium.",
            "conversationId": "5ff2fbe0d0eec312cbbb6d96",
            "senderName": "Ram Chandel",
            "createdAt": "2021-01-21T15:28:11.660Z",
            "updatedAt": "2021-01-21T15:28:11.660Z",
            "__v": 0
        },
        {
            "_id": "6009b26cab0c524e9589f5a0",
            "senderId": "5ffe8d52ab0c524e9589f391",
            "content": "Hi Ram, the use of triangles in cardboard layers is not being related to designing a space rover here. We are only trying to show you the range of knowledge a Mechanical engineer comes across while solving problems.",
            "conversationId": "5ff2fbe0d0eec312cbbb6d96",
            "senderName": "Chirayu (Zine)",
            "createdAt": "2021-01-21T16:57:16.856Z",
            "updatedAt": "2021-01-21T16:57:16.856Z",
            "__v": 0
        },
        {
            "_id": "600b84a9ab0c524e9589f5a9",
            "senderId": "5ffed761ab0c524e9589f3fd",
            "content": "Boss the link for servo motors is not working !!",
            "conversationId": "5ff2fbe0d0eec312cbbb6d96",
            "senderName": "Aniket Deshmukh",
            "createdAt": "2021-01-23T02:06:33.637Z",
            "updatedAt": "2021-01-23T02:06:33.637Z",
            "__v": 0
        },
        {
            "_id": "600bc060ab0c524e9589f5ab",
            "senderId": "600140b2ab0c524e9589f472",
            "content": "Boss ....I m reading the blogs of  actuators and Motors....I m understanding it......but I m not able to visualize what is happening inside the motors ......also what is inrunner ,outrunner etc...",
            "conversationId": "5ff2fbe0d0eec312cbbb6d96",
            "senderName": "Sanket Banait",
            "createdAt": "2021-01-23T06:21:20.390Z",
            "updatedAt": "2021-01-23T06:21:20.390Z",
            "__v": 0
        },
        {
            "_id": "600c12c1ab0c524e9589f5ae",
            "senderId": "5ffe939cab0c524e9589f3a9",
            "content": "Hello Aniket, we have fixed the link. You can access it now.",
            "conversationId": "5ff2fbe0d0eec312cbbb6d96",
            "senderName": "Rahul (Zine)",
            "createdAt": "2021-01-23T12:12:49.987Z",
            "updatedAt": "2021-01-23T12:12:49.987Z",
            "__v": 0
        },
        {
            "_id": "600c1382ab0c524e9589f5af",
            "senderId": "5ffedaf1ab0c524e9589f40a",
            "content": "Boss, is there any doubt session today? ",
            "conversationId": "5ff2fbe0d0eec312cbbb6d96",
            "senderName": "Pranjali Srivastava",
            "createdAt": "2021-01-23T12:16:02.500Z",
            "updatedAt": "2021-01-23T12:16:02.500Z",
            "__v": 0
        },
        {
            "_id": "600c1415ab0c524e9589f5b0",
            "senderId": "5ffe939cab0c524e9589f3a9",
            "content": "Hi Pranjali, we don't have any doubt session today. You will be mailed and notified here before the session.",
            "conversationId": "5ff2fbe0d0eec312cbbb6d96",
            "senderName": "Rahul (Zine)",
            "createdAt": "2021-01-23T12:18:29.232Z",
            "updatedAt": "2021-01-23T12:18:29.232Z",
            "__v": 0
        }
    ]
}
```

#### get dm room 
Method: GET
sample request
```http://localhost:3000/api/checkroom?userId=601bb9166e69aa784e27ce89&firstUserName=No Name&secondUserName=Test```
sample response
```
{
    "exists": false,
    "room": {
        "_id": "60238785fabaa32b66ff1ede",
        "conversationName": "No Name,Test",
        "participants": [
            {
                "_id": "60238785fabaa32b66ff1edf",
                "id": "601bb9166e69aa784e27ce89"
            },
            {
                "_id": "60238785fabaa32b66ff1ee0",
                "id": "601bb8eb6e69aa784e27ce84"
            },
            {
                "_id": "60238785fabaa32b66ff1ee1",
                "info": {
                    "id": "601bb9166e69aa784e27ce89",
                    "name": "No Name"
                }
            },
            {
                "_id": "60238785fabaa32b66ff1ee2",
                "info": {
                    "id": "601bb8eb6e69aa784e27ce84",
                    "name": "Test"
                }
            }
        ],
        "createdAt": "2021-02-10T07:13:10.004Z",
        "updatedAt": "2021-02-10T07:13:10.004Z",
        "__v": 0
    }
}
```
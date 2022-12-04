# BookingHotel-backend
Project học phần Thực hành lập trình web - Server side
# API_URL 
[https://bookinghotel-backend.onrender.com/](https://bookinghotel-backend.onrender.com/)
## API
  POST "/api/auth/login"
  body:{
    username: ...,
    password: ...
    }
    
  POST "/api/auth/signup"
  
  body:{
    username: ...,
    password: ...,
    fullname: ...,
    email: ...(or phone: ...),
    }
    
  GET "api/hotel/all"
    query{
    limit: ..., //example: 2
    from: ..., //example: 1
    to: ..., //example: 3
    }
    
  GET "api/hotel/:id"
  
  GET "api/hotel/:id/rooms"
    query{
    limit: ..., //example: 2
    from: ..., //example: 1
    to: ..., //example: 3
    }

Sure! Here’s your **fully formatted `README.md` file** ready for deployment on GitHub. Just copy and paste this into a `README.md` file in your project. 🚀  

---

### 📜 **README.md**
```md
# Backend API Documentation

## 📌 Endpoints

---

## 🔹 **POST /users/register**
### 📖 Description
This endpoint is used to register a new user.

### 📩 Request Body
The request body should be a JSON object with the following fields:

- **`fullname`**: An object containing:
  - **`firstname`** (string, required) – Minimum length of 3 characters
  - **`lastname`** (string, optional) – Minimum length of 3 characters
- **`email`** (string, required) – A valid email address
- **`password`** (string, required) – Minimum length of 6 characters

### 📝 Example Request
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### ✅ **201 Created**
**Description**: User successfully registered.  
**Response Body**:
```json
{
  "token": "your_jwt_token",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### ❌ **400 Bad Request**
**Description**: Validation errors or missing required fields.  
**Response Body Example**:
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

---

## 🔹 **POST /captains/register**
### 📖 Description
This endpoint is used to register a new captain.

### 📩 Request Body
The request body should be a JSON object with the following fields:

- **`fullname`**: An object containing:
  - **`firstname`** (string, required) – Minimum length of 3 characters
  - **`lastname`** (string, required) – Minimum length of 3 characters
- **`email`** (string, required) – A valid email address
- **`password`** (string, required) – Minimum length of 6 characters
- **`vehicle`**: An object containing:
  - **`color`** (string, required) – Minimum length of 3 characters
  - **`plate`** (string, required) – Minimum length of 3 characters
  - **`capacity`** (number, required) – Minimum value of 1
  - **`vehicleType`** (string, required) – Minimum length of 3 characters

### 📝 Example Request
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### ✅ **Example Response**
```json
{
  "token": "your_jwt_token",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

### ❌ **400 Bad Request**
**Description**: Validation errors or missing required fields.  
**Response Body Example**:
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    },
    {
      "msg": "Vehicle Type must be at least 3 characters long",
      "param": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}
```

---

## 🚀 **Running the API Locally**
1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-username/your-repo-name.git
   ```
2. **Install dependencies**:
   ```sh
   cd your-repo-name
   npm install
   ```
3. **Set up environment variables (`.env` file)**:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. **Start the server**:
   ```sh
   npm start
   ```

---

## 🛠 **Technologies Used**
- **Node.js** (Backend Framework)
- **Express.js** (API Routing)
- **MongoDB** (Database)
- **Mongoose** (ODM for MongoDB)
- **JWT (JSON Web Tokens)** (Authentication)
- **Bcrypt.js** (Password Hashing)
- **Express Validator** (Request Validation)

---

## 📄 **License**
This project is licensed under the **MIT License**.

---

## 🤝 **Contributing**
1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature-branch
   ```
3. Commit your changes:
   ```sh
   git commit -m "Added new feature"
   ```
4. Push to your branch:
   ```sh
   git push origin feature-branch
   ```
5. Open a **Pull Request**!

---

## 📞 **Contact**
For any issues or suggestions, feel free to reach out:
- **GitHub:** [rashimalviyaa](https://github.com/your-username)
- **Email:** 
```

---

## ✅ **Final Notes**
- **Perfectly formatted for GitHub** ✅  
- **Syntax highlighting for JSON and shell commands** ✅  
- **Clear sectioning and headers** ✅  
- **Includes setup instructions and technologies used** ✅  

Just **copy-paste** this into your `README.md` file, and it's **ready to go**! 🚀🔥 Let me know if you need any modifications! 😊
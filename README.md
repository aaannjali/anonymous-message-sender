# Anonymous Message Sender

## 📌 Project Overview
Anonymous Message Sender is a web application that allows users to send messages anonymously. The platform ensures privacy and security while enabling seamless communication. Users can register, verify their accounts, and send or receive messages without revealing their identity.

## 🚀 Features
- User authentication with email verification
- Secure login with hashed passwords
- Send and receive messages anonymously
- Real-time message updates
- Responsive UI for a smooth user experience

## 🛠️ Tech Stack
- **Frontend:** Next.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** NextAuth.js, bcryptjs

## 📂 Project Structure
```
/src
  ├── app
  │   ├── api (Backend API Routes)
  │   ├── components (Reusable UI Components)
  │   ├── pages (Next.js Page Routes)
  ├── lib (Database & Utility Functions)
  ├── model (Mongoose Schemas)
  ├── public (Static Assets)
  ├── styles (Global Styles)
```

## 🔧 Setup & Installation
1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/anonymous-message-sender.git
   cd anonymous-message-sender
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Set up environment variables**
   Create a `.env` file and add the following:
   ```env
   NEXTAUTH_SECRET=your_secret_key
   MONGODB_URI=your_mongodb_connection_string
   ```
4. **Run the development server**
   ```sh
   npm run dev
   ```
5. **Build for production**
   ```sh
   npm run build
   ```

## 📈 Skills Gained
- Authentication & Authorization using **NextAuth.js**
- State Management & API handling in **Next.js**
- Database integration with **MongoDB (Mongoose)**
- Secure password hashing using **bcryptjs**
- UI/UX design with **Tailwind CSS**
- Error handling & debugging in a full-stack application

## 📩 Feedback & Contributions
Feel free to contribute or provide feedback! Open an issue or submit a pull request if you’d like to improve this project.



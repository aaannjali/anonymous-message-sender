import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";



export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                
                await dbConnect();
            
                console.log("🟡 Received Credentials:", credentials);
            
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier },  // ✅ Ensure this matches frontend
                            { username: credentials.identifier }
                        ]
                    });
            
                    console.log("🟢 Found User:", user);
            
                    if (!user) {
                        console.error("❌ No user found with this email/username");
                        throw new Error('No user found with this email');
                    }
            
                    if (!user.isVerified) {
                        console.error("❌ User is not verified");
                        throw new Error('Please verify your account before login');
                    }
            
                    const isPassword = await bcrypt.compare(credentials.password, user.password);
                    console.log("🔍 Password Match:", isPassword);
            
                    if (!isPassword) {
                        console.error("❌ Incorrect password");
                        throw new Error('Incorrect password');
                    }
            
                    return user;
            
                } catch (error) {
                    console.error("❌ Authorization Error:", error);
                    throw new Error('Invalid credentials');
                }
            }
            
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAcceptingMessages;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessages = token.isAcceptingMessages;
                session.user.username = token.username;
            }
            return session;
        },
    },
    pages: {
        signIn: "/sign-in"
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
};

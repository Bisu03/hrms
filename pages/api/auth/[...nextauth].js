import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import UserModel from "../../../models/user.models.js";
import { connectDB } from "../../../db/ConnectDB.js";

let isConnected = false;

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials) {
                if (!isConnected) {
                    await connectDB();
                    isConnected = true;
                }

                const { employee_id: empid, password } = credentials;

                const user = await UserModel.findOne({ employee_id: empid });
                if (!user) throw new Error("No user found");

                const isCorrectPass = await bcrypt.compare(password?.toString(), user?.password?.toString());
                if (isCorrectPass) {
                    const { password, ...info } = user._doc;
                    return info;
                } else {
                    throw new Error("Incorrect password");
                }
            },
        }),
    ],
    session: {
        jwt: true,
        maxAge: 24 * 60 * 60,
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    secret: process.env.NEXT_APP_AUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXT_APP_URL,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.role;
            return session;
        },
    },
};

export default NextAuth(authOptions);

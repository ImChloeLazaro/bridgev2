import NextAuth from "next-auth/next";
import Providers from "next-auth/providers/google";

export const authOptions = {
    providers: [
        Providers({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    scope: "https://www.googleapis.com/auth/calendar  https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
                    expire_in: 43200 // 12 hours
                },
            }
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user, account, profile }) {
            if (user) {
                token = { ...user, ...account, ...profile };
            }
            console.log("token: ", token);
            return token;
        },
        async session(session, token) {
            if (token) {
                session.user = token;
            }
            return session;
        },
    },
}
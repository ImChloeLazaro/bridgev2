import Providers from "next-auth/providers/google";

export const authOptions  = {
    providers: [
        Providers({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    scope:
                        "https://www.googleapis.com/auth/calendar  https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
                },
            },
            redirectUri: "https://main.dyk54a7v2s19.amplifyapp.com/api/auth/callback/google"
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user, account, profile }) {
            if (user) {
                token = { ...user, ...account, ...profile };
            }
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
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        try {
          const res = await fetch(
            `${process.env.API_URL ?? "https://twitter-bclj.onrender.com"}/profile/oauth`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                provider: account.provider,
                providerUserId: account.providerAccountId,
                email: profile?.email,
                name: (profile as any)?.name ?? (profile as any)?.login ?? (profile as any)?.email,
              }),
            }
          );
          const data = await res.json();
          const t = token as any;
          if (data.token) {
            t.accessToken = data.token;
            if (data.user?.name) t.name = data.user.name;
          }
        } catch (error) {
          console.error("OAuth sign-in error:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      const t = token as any;
      if (t?.accessToken) {
        session.user = { ...session.user, accessToken: t.accessToken } as any;
      }
      return session;
    },
  },
});

export const { GET, POST } = handler;

// import { createAuthClient } from "better-auth/react";
// import { inferAdditionalFields } from "better-auth/client/plugins";

// export const authClient = createAuthClient({
//   baseURL: "http://localhost:5000",

//   fetchOptions: {
//     credentials: "include",
//   },

//   plugins: [
//     inferAdditionalFields({
//       user: {
//         role: {
//           type: "string",
//         },
//         phone: {
//           type: "string",
//         },
//       },
//     }),
//   ],
// });


import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  fetchOptions: {
    credentials: "include",
  },

  plugins: [
    inferAdditionalFields({
      user: {
        role: {
          type: "string",
        },
        phone: {
          type: "string",
        },
      },
    }),
  ],
});

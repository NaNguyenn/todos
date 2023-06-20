// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   gql,
// } from "@apollo/client";

// const client = new ApolloClient({
//   uri: "https://api-callme.gtsvn.com.vn/graphql",
//   cache: new InMemoryCache(),
// });

// client
//   .query({
//     query: gql`
//       query GetLocations {
//         locations {
//           id
//           name
//           description
//           photo
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result));

//Expirementing with AWS Cognito without OIDC

// import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

// const poolData = {
//     UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
//     ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID
//   };

// export const userPool = new CognitoUserPool(poolData);

// export const getCurrentUser = () => userPool.getCurrentUser();

// export const authenticateUser = (username, password) => {
//   const authData = {
//     Username: username,
//     Password: password
//   };
  
//   const authDetails = new AuthenticationDetails(authData);
//   const userData = {
//     Username: username,
//     Pool: userPool
//   };
  
//   return new Promise((resolve, reject) => {
//     new CognitoUser(userData).authenticateUser(authDetails, {
//       onSuccess: (result) => resolve(result),
//       onFailure: (err) => reject(err)
//     });
//   });
// };

// export const handleHostedUISignIn = () => {
//   const domain = import.meta.env.VITE_COGNITO_DOMAIN;
//   const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
//   const redirectUri = encodeURIComponent(import.meta.env.VITE_REDIRECT_URI);
  
//   // Use URL object for safer construction
//   const authUrl = new URL(`https://${domain}/oauth2/authorize`);
//   authUrl.searchParams.append('client_id', clientId);
//   authUrl.searchParams.append('response_type', 'code');
//   authUrl.searchParams.append('scope', 'openid email profile');
//   authUrl.searchParams.append('redirect_uri', import.meta.env.VITE_REDIRECT_URI);
  
//   window.location.href = authUrl.toString();
// };

// export const signOut = () => {
//   const user = userPool.getCurrentUser();
//   if (user) user.signOut();
//   window.localStorage.clear();
// };
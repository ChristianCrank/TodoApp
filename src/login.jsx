// Login.jsx
import { useAuth } from "react-oidc-context";

const Login = () => {
  const auth = useAuth();

  if (auth.isLoading) return <div>Loading...</div>;
  if (auth.error) return <div>Error: {auth.error.message}</div>;

  return (
    <div className="login-container">
      <h1>Welcome to Todo App</h1>
      <button onClick={() => auth.signinRedirect()}>Sign In</button>
    </div>
  );
};

export default Login;
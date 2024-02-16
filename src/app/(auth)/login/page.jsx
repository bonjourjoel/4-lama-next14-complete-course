import {
  handleGithubLogin,
  handleLoginInternal,
} from "@/lib/auth/authServerActions";

const LoginPage = async () => {
  return (
    <div>
      <form action={handleGithubLogin}>
        <button>Login with Guthub</button>
      </form>
      <form action={handleLoginInternal}>
        <input type="text" placeholder="username" name="username" />
        <input type="password" placeholder="password" name="password" />
        <button>Login with credentials</button>
      </form>
    </div>
  );
};

export default LoginPage;

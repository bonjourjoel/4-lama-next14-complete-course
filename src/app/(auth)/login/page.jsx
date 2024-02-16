import { handleGithubLogin } from "@/lib/auth/authServerActions";

const LoginPage = async () => {
  return (
    <div>
      <form action={handleGithubLogin}>
        <button>Login with Guthub</button>
      </form>
    </div>
  );
};

export default LoginPage;

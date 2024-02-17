import { LoginForm } from "@/components/LoginForm/LoginForm";
import { handleGithubLogin } from "@/lib/auth/authServerActions";
import styles from "./login.module.css";

const LoginPage = ({ searchParams }) => {
  const callbackUrl = searchParams.callbackUrl || "/";

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form action={handleGithubLogin}>
          <input type="hidden" name="callbackUrl" value={callbackUrl} />
          <button className={styles.github}>Login with Guthub</button>
        </form>
        <br />
        <hr />
        <br />
        <LoginForm callbackUrl={callbackUrl} />
      </div>
    </div>
  );
};

export default LoginPage;

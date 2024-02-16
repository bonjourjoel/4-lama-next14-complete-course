import { LoginForm } from "@/components/loginForm/loginForm";
import { handleGithubLogin } from "@/lib/auth/authServerActions";
import styles from "./login.module.css";

const LoginPage = async () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form action={handleGithubLogin}>
          <button className={styles.github}>Login with Guthub</button>
        </form>
        <br />
        <hr />
        <br />
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;

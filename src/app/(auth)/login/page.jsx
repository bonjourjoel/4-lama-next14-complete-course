"use client";

import { LoginForm } from "@/components/loginForm/loginForm";
import { handleGithubLogin } from "@/lib/auth/authServerActions";
import styles from "./login.module.css";
import { useSearchParams } from "next/navigation";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

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
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;

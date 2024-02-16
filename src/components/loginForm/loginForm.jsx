"use client";

import { handleLoginInternal } from "@/lib/auth/authServerActions";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const LoginForm = () => {
  /**
   * useFormState handles a state after form submission, based on the return value of the form's server action
   * and also it works even if javascript is disabled
   */
  const [state, formAction] = useFormState(handleLoginInternal, undefined);
  const router = useRouter();

  // useEffect(() => {
  //   if (state?.success) {
  //     router.push("/");
  //   }
  // }, [state?.success, router]);

  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <button>Login</button>
      {state?.error && <div className={styles.error}>{state.error}</div>}
      <Link href="/register">
        {"Don't have an account?"} <b>Register</b>
      </Link>
    </form>
  );
};

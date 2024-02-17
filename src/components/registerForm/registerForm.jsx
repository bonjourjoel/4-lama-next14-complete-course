"use client";

import { handleRegisterInternal } from "@/lib/auth/authServerActions";
import styles from "./RegisterForm.module.css";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const RegisterForm = () => {
  /**
   * useFormState handles a state after form submission, based on the return value of the form's server action
   * and also it works even if javascript is disabled
   */
  const [state, formAction] = useFormState(handleRegisterInternal, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/login");
    }
  }, [state?.success, router]);

  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="username" name="username" />
      <input type="text" placeholder="email" name="email" />
      <input type="password" placeholder="password" name="password" />
      <input
        type="password"
        placeholder="repeat password"
        name="passwordRepeat"
      />
      <button>Register</button>
      {state?.error && <div className={styles.error}>{state.error}</div>}
      <Link href="/login">
        Have an account? <b>Login</b>
      </Link>
    </form>
  );
};

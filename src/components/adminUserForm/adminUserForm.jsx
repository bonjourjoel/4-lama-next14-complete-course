"use client";

import styles from "./AdminUserForm.module.css";
import { useFormState } from "react-dom";
import { saAdmAddUser } from "@/lib/admin/adminServerActions";

const AdminUserForm = () => {
  const [state, formAction] = useFormState(saAdmAddUser, undefined);

  return (
    <form action={formAction} className={styles.container}>
      <h1>Add new user</h1>
      <input type="text" name="username" placeholder="User name" required />
      <input type="text" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <input type="text" name="img" placeholder="Image url" />
      <select name="isAdmin" defaultValue="" required>
        <option value="" disabled>
          Is admin?
        </option>
        <option value="false">User</option>
        <option value="true">Admin</option>
      </select>
      <button>Add</button>
      {state && state.error}
    </form>
  );
};

export default AdminUserForm;

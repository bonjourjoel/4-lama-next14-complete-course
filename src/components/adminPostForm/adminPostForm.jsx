"use client";

import styles from "./AdminPostForm.module.css";
import { useFormState } from "react-dom";
import { saAdmAddPost } from "@/lib/admin/adminServerActions";

const AdminPostForm = ({ userId }) => {
  const [state, formAction] = useFormState(saAdmAddPost, undefined);

  return (
    <form action={formAction} className={styles.container}>
      <h1>Add new post</h1>
      <input type="hidden" name="userId" value={userId} />
      <input type="text" name="title" placeholder="Title" required />
      <input type="text" name="slug" placeholder="Slug" required />
      <input type="text" name="img" placeholder="Image url" />
      <textarea
        type="text"
        name="desc"
        placeholder="Description"
        rows={10}
        required
      />
      <button>Add</button>
      {state && state.error}
    </form>
  );
};

export default AdminPostForm;

import { data } from "@/lib/data/data";
import styles from "./AdminUsers.module.css";
import Image from "next/image";
import { saAdmDeleteUser } from "@/lib/admin/adminServerActions";

const AdminUsers = async () => {
  const users = await data.getUsers();

  return (
    <div className={styles.container}>
      <h1>Users</h1>
      {users.map((user) => (
        <div className={styles.item} key={user.id}>
          <div className={styles.detail}>
            <Image
              src={user.img || "/noAvatar.png"}
              alt=""
              width={50}
              height={50}
            />
            <span>{user.username}</span>
          </div>
          <form action={saAdmDeleteUser}>
            <input type="hidden" name="id" value={user.id} />
            <button className={styles.deleteButton}>Delete</button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default AdminUsers;

import { data } from "@/lib/data/data";
import styles from "./AdminPosts.module.css";
import Image from "next/image";
import { saAdmDeletePost } from "@/lib/admin/adminServerActions";

const AdminPosts = async () => {
  const posts = await data.getPosts();

  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div className={styles.item} key={post.id}>
          <div className={styles.detail}>
            <Image
              src={post.img || "/noAvatar.png"}
              alt=""
              width={50}
              height={50}
            />
            <span>{post.title}</span>
          </div>
          <form action={saAdmDeletePost}>
            <input type="hidden" name="slug" value={post.slug} />
            <button className={styles.deleteButton}>Delete</button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default AdminPosts;

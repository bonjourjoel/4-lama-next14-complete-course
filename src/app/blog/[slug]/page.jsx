import Image from "next/image";
import styles from "./singlePost.module.css";
import PostUser from "@/components/postUser/postUser";
import { Suspense } from "react";
import { data } from "@/lib/data/data";

export const generateMetadata = async ({ params }) => {
  const { slug } = params;
  const post = await data.getPost(slug);
  return {
    title: post.title,
    description: post.desc,
  };
};

const SinglePostPage = async ({ params }) => {
  const post = await data.getPost(params.slug);

  return (
    <div className={styles.container}>
      {post.img && (
        <div className={styles.imgContainer}>
          <Image className={styles.img} src={post.img} alt="" fill />
        </div>
      )}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userId={post.userId} />
            </Suspense>
          )}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>
              {new Date(post.createdAt).toString().slice(4, 16)}
            </span>
          </div>
        </div>
        <div className={styles.content}>{post.desc}</div>
      </div>
    </div>
  );
};

export default SinglePostPage;

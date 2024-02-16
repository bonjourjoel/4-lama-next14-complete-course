export class DataApi {
  async getPosts() {
    const res = await fetch("http://localhost:3000/api/posts", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    return res.json();
  }

  async getPost(slug) {
    const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    return res.json();
  }

  async getUsers() {
    const res = await fetch("http://localhost:3000/api/users", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    return res.json();
  }

  async getUser(id) {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    return res.json();
  }
}

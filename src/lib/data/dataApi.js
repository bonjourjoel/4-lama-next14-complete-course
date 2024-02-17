export class DataApi {
  async getPosts() {
    const res = await fetch("http://localhost:3000/api/posts", {
      next: { revalidate: 0 },
    });
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    return res.json();
  }

  async getPost(slug) {
    const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
      next: { revalidate: 0 },
    });
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    return res.json();
  }

  async addPost({ title, desc, slug, userId }) {
    const res = await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, desc, slug, userId }),
    });
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    return res.json();
  }

  async deletePost(slug) {
    const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    return res.json();
  }

  async getUsers(queryString = "") {
    const res = await fetch(`http://localhost:3000/api/users${queryString}`, {
      next: { revalidate: 0 },
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

  async findUserByUsername(username) {
    return (await this.getUsers(`?username=${username}`))[0];
  }

  async findUserByEmail(email) {
    return (await this.getUsers(`?email=${email}`))[0];
  }

  async addUser({ username, email, password, img }) {
    const res = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      body: JSON.stringify({ username, email, password, img }),
    });
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    return res.json();
  }

  async deleteUser(id) {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    return res.json();
  }
}

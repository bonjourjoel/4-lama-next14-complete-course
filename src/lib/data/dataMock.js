const users = [
  {
    id: "1",
    username: "john",
    email: "john@doe.com",
    password: "$2a$10$r5db6IHOZxa4Czf8WRyhPOWsJy.8EysrLPMbsCUF58IHhrZOU0TFa",
    img: "/noavatar.png",
    isAdmin: false,
  },
  {
    id: "2",
    username: "jane",
    email: "jane@doe.com",
    password: "$2a$10$r5db6IHOZxa4Czf8WRyhPOWsJy.8EysrLPMbsCUF58IHhrZOU0TFa",
    img: "/noavatar.png",
    isAdmin: false,
  },
];

const posts = [
  {
    id: "1",
    slug: "post-1",
    title: "Post 1",
    desc: "This is post1. ".repeat(5),
    userId: "1",
    createdAt: new Date(),
  },
  {
    id: "2",
    slug: "post-2",
    title: "Post 2",
    desc: "This is post2. ".repeat(5),
    userId: "1",
    createdAt: new Date(),
  },
  {
    id: "3",
    slug: "post-3",
    title: "Post 3",
    desc: "This is post3. ".repeat(5),
    userId: "2",
    createdAt: new Date(),
  },
  {
    id: "4",
    slug: "post-4",
    title: "Post 4",
    desc: "This is post4. ".repeat(5),
    userId: "2",
    createdAt: new Date(),
  },
];

export class DataMock {
  async getPosts() {
    return posts;
  }

  async getPost(slug) {
    return posts.find((post) => post.slug == slug);
  }

  async addPost({ title, desc, slug, userId }) {
    const id = Math.max(...posts.map((post) => parseInt(post.id))) + 1;
    posts.push({
      id,
      slug,
      title,
      desc,
      userId,
      createdAt: new Date(),
    });
  }

  async deletePost(slug) {
    const idx = posts.find((post) => post.slug === slug);
    if (idx >= 0) {
      posts.splice(idx, 1);
    }
  }

  async getUsers() {
    return users;
  }

  async getUser(id) {
    return users.find((user) => user.id == id);
  }

  async findUserByUsername(username) {
    return users.find((user) => user.username == username);
  }

  async findUserByEmail(email) {
    return users.find((user) => user.email == email);
  }

  async addUser({ username, email, password, img }) {
    const id = Math.max(...users.map((post) => parseInt(post.id))) + 1;
    users.push({
      id,
      username,
      email,
      password,
      img,
      createdAt: new Date(),
    });
  }

  async deleteUser(id) {
    const idx = users.find((post) => post.id === id);
    if (idx >= 0) {
      users.splice(idx, 1);
    }
  }
}

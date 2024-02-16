const users = [
  { id: "1", username: "John" },
  { id: "2", username: "Jane" },
];

const posts = [
  {
    slug: "post-1",
    title: "Post 1",
    body: "This is post1. ".repeat(5),
    userId: "1",
    createdAt: new Date(),
  },
  {
    slug: "post-2",
    title: "Post 2",
    body: "This is post2. ".repeat(5),
    userId: "1",
    createdAt: new Date(),
  },
  {
    slug: "post-3",
    title: "Post 3",
    body: "This is post3. ".repeat(5),
    userId: "2",
    createdAt: new Date(),
  },
  {
    slug: "post-4",
    title: "Post 4",
    body: "This is post4. ".repeat(5),
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

  async getUsers() {
    return users;
  }

  async getUser(id) {
    return users.find((user) => user.id == id);
  }
}

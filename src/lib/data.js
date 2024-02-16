// TEMPORARY DATA
const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
];

const posts = [
  { id: 1, title: "Post1", body: "This is post1. ".repeat(5), userId: 1 },
  { id: 2, title: "Post2", body: "This is post2. ".repeat(5), userId: 1 },
  { id: 3, title: "Post3", body: "This is post3. ".repeat(5), userId: 2 },
  { id: 4, title: "Post4", body: "This is post4. ".repeat(5), userId: 2 },
];

export const getPosts = async () => {
  return posts;
};

export const getPost = async (id) => {
  return posts.find((post) => post.id === parseInt(id));
};

export const getUser = async (id) => {
  return users.find((user) => user.id === parseInt(id));
};

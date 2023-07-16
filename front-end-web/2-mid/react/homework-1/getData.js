import axios from "axios";

async function getData(userID) {
  const userData = await axios(
    `https://jsonplaceholder.typicode.com/users/${userID}`
  );
  const postsData = await axios(
    `https://jsonplaceholder.typicode.com/posts?userId=${userID}`
  );

  return { ...userData.data, posts: [...postsData.data] };
}

export default getData;

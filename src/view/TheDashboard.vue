
<script setup>
import TaskCard from "@/components/TaskCard.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const title = ref("");
const done = ref(false);
const tasksArray = ref([]);
const fetchStatus = ref(false);
const userInfo = ref({});
const token = ref(null);
const router = useRouter();

// main data fetching method

const fetch_db_Data = async () => {
  try {
    const req = await fetch("api/task/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });
    const res = await req.json();
    tasksArray.value = [...res];
  } catch (error) {
    fetchStatus.value = true;
  }
};

onMounted(async () => {
  // fetch data when you load Page

  try {
    const userData = window.localStorage.getItem("user");
    const resData = JSON.parse(userData);
    userInfo.value = resData.user;
    token.value = resData.token;
    // console.log(userInfo.value.user.name);

    // fetch logged in user info
    // const userData = window.localStorage.getItem("user");
    // console.log("userData", userData);
    // if (!userData) throw new Error();
    // userInfo.value = JSON.parse(userData);
    // const userResponse = await JSON.parse(userData);
    // userInfo.value =  JSON.parse(userData)
    // user.value = userResponse;
    fetch_db_Data();
  } catch (error) {
    console.log("/DashBoard", error);
  }
});

const handleRemove = (e) => {
  console.log("HandleRemove", e);
  fetch_db_Data();
};

const handleLogout = () => {
  window.localStorage.removeItem("user");

  router.push({ name: "LandingPage" });
};
const handleSubmit = async () => {
  try {
    const newUserTask = {
      title: title.value,
      done: done.value,
    };

    const req = await fetch("api/task", {
      method: "POST",
      mode: "same-origin",
      cache: "no-cache",
      credentials: "same-origin", //
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify(newUserTask),
    });

    if (req.status === 201) {
      title.value = "";
      done.value = false;
      // Fetch fresh data after you create new tasks
      fetch_db_Data();
    }
  } catch (error) {
    alert("Error", error);
  }
};
</script>
 



<template>
  <main>
    <div id="userInfo-container">
      <p><strong>User :</strong> {{ userInfo.name }}</p>
      <p><strong>Email :</strong> {{ userInfo.email }}</p>
      <p><strong>_id :</strong> {{ userInfo._id }}</p>
      <p><strong>token :</strong> {{ token }}</p>

      <button @click="handleLogout">Log out</button>
    </div>
    <section id="form-container">
      <form @submit.prevent>
        <!-- Title -->
        <label for="title">
          Title: <br /><br />
          <input v-model.trim="title" type="text" />
        </label>
        <!-- Done -->
        <label for="done">
          Done: <br /><br />
          <input type="checkbox" v-model="done" />
        </label>
      </form>
      <button @click="handleSubmit">Submit</button>
    </section>

    <section id="lists">
      <h1>Card list here</h1>
      <div v-if="fetchStatus">
        <h3>Server Fetch Fail</h3>
        <p>Don't forget to start server / <code>yarn backend</code></p>
      </div>

      <div id="listsContainer">
        <div v-for="task in tasksArray" :key="task._id">
          <TaskCard @remove-card="handleRemove" :task="task" :token="token" />
        </div>
      </div>
    </section>
  </main>
</template>


<style scoped>
main {
  height: 100vh;
  width: 100%;
  color: white;

  /* background: #868279; */
}

#userInfo-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  word-break: break-all;
  margin-left: 10px;
  font-size: 12px;
}

#userInfo-container p {
  margin: 3px;
}

#lists {
  /* background: red; */
  color: white;
  /* height: 60%; */
}

#listsContainer {
  display: flex;
  flex-wrap: wrap;
  /* background-color: rebeccapurple; */
}

#form-container {
  /* border: 5px solid white; */
  display: flex;
  flex-direction: column;
  align-content: flex-start;

  /* height: 500px; */
  /* width: 500px; */
  position: relative;
  /* left: 15%; */
  letter-spacing: 0.056em;
  background-color: #2f2b22;
  padding: 40px 0 0 40px;
}

#form-container form {
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  /* background-color: #20415c; */
  width: fit-content;
  height: 90%;
  padding-left: 15px;
}
#form-container label {
  color: white;
  text-align: start;
  margin: 15px;
  /* min-width: 80%; */
  font-weight: 900;
}
#form-container input {
  text-align: center;
  border: 3px solid transparent;
  border-top-left-radius: 20px;
  background-color: #d89923;
  height: 30px;
  font-size: 18px;
  font-weight: bold;
  min-width: 60%;
  /* color: white; */
}

button {
  border: 3px solid rgb(255, 255, 255);
  height: 40px;
  width: 100px;
  background: transparent;
  color: white;
  margin: 5px;
  cursor: pointer;
}
</style>
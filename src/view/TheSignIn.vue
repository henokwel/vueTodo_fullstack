
<script setup>
import { ref } from "vue";

const name = ref(null);
const email = ref(null);
const password = ref(null);

const handleSubmit = async () => {
  console.log("Name", name.value);
  console.log("Name", email.value);
  console.log("Name", password.value);

  const newUser = {
    name: name.value,
    email: email.value,
    password: password.value,
  };

  try {
    const req = await fetch("api/user", {
      method: "POST",
      mode: "same-origin", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(newUser),
    });

    if (req.status === 200) {
      console.log("req", req);
    }
  } catch (error) {
    alert("Error", error);
  }
};
</script>


<template>
  <main>
    <h1>Sign In</h1>
    <section>
      <form @submit.prevent>
        <!-- Name -->
        <label for="name">
          Name: <br /><br />
          <input v-model.trim="name" type="text" />
        </label>
        <!-- Email -->
        <label for="email">
          Email: <br /><br />
          <input v-model.trim="email" type="email" />
        </label>
        <!-- Password -->
        <label for="password">
          Password: <br /><br />
          <input v-model="password" type="password" />
        </label>
      </form>
      <button @click="handleSubmit">Submit</button>
    </section>
  </main>
</template>





<style scoped>
main {
  position: relative;
  height: 100vh;
  width: 50vw;
  background-image: url("https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1608&q=80");
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire*/
}

section {
  /* border: 5px solid white; */
  display: flex;
  flex-direction: column;

  height: 500px;
  width: 100%;
  position: relative;
  left: 15%;
  letter-spacing: 0.056em;
  background-color: #0d3649;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: #20415c;
  height: 90%;
  padding-left: 15px;
}
label {
  color: white;
  text-align: start;
  margin-top: 15px;
  min-width: 80%;
  font-weight: 900;
}
input {
    text-align: center;
  border: 3px solid black;
  height: 30px;
  font-size: 18px;
  min-width: 60%;
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
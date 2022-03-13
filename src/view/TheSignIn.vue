<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();




const handleSubmit = async () => {
  const newUser = {
    email: email.value,
    password: password.value,
  };

  try {
    const req = await fetch("api/user/login", {
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

    if (req.status !== 200) throw new Error();

    // Save user info and token into local storage, for now
    // then push route to /dashboard
    const res = await req.json();

    window.localStorage.setItem("user", JSON.stringify(res));

    router.push("/dashboard");
    
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
      <button @click="handleSubmit">Sign In</button>
    </section>
  </main>
</template>





<style scoped>
h1 {
  background-color: #d89923;
  border-top-left-radius: 15px;
  padding: 5px;
}
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100vh;
  width: 100%;
}

section {
  /* border: 5px solid white; */
  display: flex;
  flex-direction: column;
  margin-left: 500px;
  height: 500px;
  width: 500px;
  position: relative;
  /* left: 15%; */
  letter-spacing: 0.056em;
  background-color: #2f2b22;
  border-top-left-radius: 40px;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  /* background-color: #20415c; */
  height: 90%;
  padding-left: 15px;
}
label {
  color: white;
  text-align: start;
  margin-top: 15px;
  /* min-width: 80%; */
  font-weight: 900;
}
input {
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
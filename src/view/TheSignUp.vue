<script >
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    // const route = useRoute();

    const handleSubmit = async () => {
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

        if (req.status !== 201) throw new Error();

        // Save user info and token into local storage, for now
        // then push route to /dashboard
        const res = await req.json();
        window.localStorage.setItem("user", JSON.stringify(res));
        router.push("/signin");
        
      } catch (error) {
        alert("Error", error);
      }
    };

    const testRouter = () => {
      router.push("/dashboard");
      // router.push({
      //   name: "signup",
      //   query: "/signup"
      // });
    };

    return { name, email, password, handleSubmit, testRouter };
  },
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
      <button @click="testRouter">Router</button>
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
  background-image: url("https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1608&q=80");
  background-position: right; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire*/
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
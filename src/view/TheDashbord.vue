
<script>
import { ref, onMounted } from "vue";
export default {
  setup() {
    const title = ref("");
    const done = ref(false);
    const tasksArray = ref([]);

    onMounted(async () => {
      console.log("Runn onMOunt");

      // fetch
      const req = await fetch("api/task");
      const res = await req.json();

      console.log("res", res);

      tasksArray.value = [...res];
    });

    const handleSubmit = async () => {
      const newUserTask = {
        title: title.value,
        done: done.value,
      };

      try {
        const req = await fetch("api/task", {
          method: "POST",
          mode: "same-origin", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(newUserTask),
        });

        if (req.status === 201) {
          // push local array state
        }

        console.log("req", req);
      } catch (error) {
        alert("Error", error);
      }
    };

    console.log("Array", tasksArray);

    return { title, done, handleSubmit, tasksArray };
  },
};
</script>
 


<template>
  <main>
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
      <ul>
        <li v-for="task in tasksArray" :key="task._id">{{ task.title }}</li>
      </ul>
    </section>
  </main>
</template>


<style scoped>
main {
  height: 100vh;
  width: 100%;
  /* background: #868279; */
}
ul {
  height: 400px;
  width: 100%;
  background: black;
}

#lists {
  background: red;
  color: white;
  height: 100%;
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
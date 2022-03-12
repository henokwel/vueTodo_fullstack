
<script>
import { ref, onMounted } from "vue";
import TaskCard from "@/components/TaskCard.vue";
export default {
  components: { TaskCard },

  setup() {
    const title = ref("");
    const done = ref(false);
    const tasksArray = ref([]);
    const fetchStatus = ref(false);

    // main data fetching method

    const fetch_db_Data = async () => {
      try {
        const req = await fetch("api/task");
        const res = await req.json();
        tasksArray.value = [...res];
      } catch (error) {
        fetchStatus.value = true;
      }
    };

    onMounted(async () => {
      // fetch data when you load Page
      fetch_db_Data();

      
    });

    const handleRemove = (e) => {
      console.log("HandleRemove", e);
      fetch_db_Data();
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

    return {
      title,
      done,
      handleSubmit,
      tasksArray,
      fetch_db_Data,
      fetchStatus,
      handleRemove,
    };
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
      <div v-if="fetchStatus">
        <h3>Server Fetch Fail</h3>
        <p>Don't forget to start server / <code>yarn backend</code></p>
      </div>

      <div id="listsContainer">
        <div v-for="task in tasksArray" :key="task._id">
          <TaskCard @remove-card="handleRemove" :task="task" />
        </div>
      </div>
    </section>
  </main>
</template>


<style scoped>
main {
  height: 100vh;
  width: 100%;

  /* background: #868279; */
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
<script>
import { ref } from "vue";
export default {
  name: "TaskCard",
  props: {
    task: {
      type: Object,
    },
    token: {
      type: String,
    },
  },

  setup(props, { emit }) {
    const title = ref(props.task.title);
    const done = ref(props.task.done);
    const _id = ref(props.task._id);
    const editToggle = ref(false);
    // fn that check prev value and compare
    // if item changed, make request
    // if not , don't waste my money!

    // onUpdated(() => {
    //   console.log("done update", done.value);
    //   console.log("props done update", props.task.done);
    // });

    const handleRequest = async (key, { load, id }, method) => {
      // handle RUD operation
      // new object with dynamic key:value
      const taskObject = { [key]: load };

      try {
        const req = await fetch(
          `api/task/${id}`,
          // If method is delete you don't send body
          {
            method: method,
            mode: "same-origin",
            cache: "no-cache",
            credentials: "same-origin", //
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${props.token}`,
            },

            body: JSON.stringify(taskObject),
          }
        );

        if (req.status === 200) {
          // Toggle back to normal after edit Finnish
          editToggle.value = false;
        } else throw new Error();
      } catch (error) {
        throw new Error(error);
      }
    };

    const handleChange = async (type) => {
      // check if both value have change
      if (title.value !== props.task.title && done.value !== props.task.done) {
        console.log("double trouble");
      }

      switch (type) {
        case "title":
          // check if value have change, if not return
          if (title.value === props.task.title) {
            return (editToggle.value = false);
          }

          try {
            await handleRequest(
              "title",
              {
                load: title.value,
                id: _id.value,
              },
              "PATCH"
            );
          } catch (error) {
            console.log("Title didn't change ");
          }
          break;

        case "done":
          if (done.value === props.task.done) return;

          try {
            await handleRequest(
              "done",
              {
                load: done.value,
                id: _id.value,
              },
              "PATCH"
            );
          } catch (error) {
            console.log("Done didn't change ");
          }

          break;
        case "delete":
          console.log("Delete");

          {
            try {
              await handleRequest("", { load: "", id: _id.value }, "DELETE");
              emit("remove-card", _id.value);
            } catch (error) {
              console.log("Delete didn't delete ");
            }
          }
          break;
        default:
          break;
      }
    };

    return { title, done, handleChange, editToggle };
  },
};
</script>
 

<template>
  <section>
    <div id="content-cont">
      <p v-show="!editToggle">
        Title=> {{ title }}
        <span>
          <button @click="editToggle = !editToggle">Edit</button>
        </span>
      </p>

      <label v-show="editToggle">
        Title =>
        <input type="text" v-model.trim="title" />
      </label>

      <br />
      <label>
        Done =>
        <input
          @change="handleChange('done')"
          type="checkbox"
          v-model="done"
          :checked="done"
        />
      </label>
    </div>
    <div id="btn-container">
      <button @click="handleChange('delete')">Remove</button>
      <!-- <button @click="$emit('remove-card', _id)">Remove</button> -->
      <button @click="handleChange('title')">Save</button>
    </div>
  </section>
</template>


<style scoped>
section {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  height: 200px;
  background: #2f2b22;
  border-top-left-radius: 20px;

  margin: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

#content-cont {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
  width: 100%;
  /* background: white; */
}

input[type="text"] {
  border: none;
  padding: 3px;
  font-size: 17px;
  /* height: 20px; */
  border-radius: 0px;
  border-top-left-radius: 6px;
}
#btn-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  /* background: grey; */
}

#btn-container button {
  border: 2px solid #2f2b22;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  /* height: 20px; */
  width: 80px;
  background: transparent;
  color: white;
  margin: 5px;
  padding: 5px;
  cursor: pointer;
}

#btn-container button:hover {
  border: 2px solid rgb(255, 255, 255);
}
</style>

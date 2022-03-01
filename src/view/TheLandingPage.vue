<template>
      <p>Welcome </p>
  <main id="landing_main">
    <section>
      <router-link to="/signin">
        <h1>Sign In</h1>
      </router-link>
    </section>
    <section>
      <router-link to="/signup">
        <h1>Sign Up</h1>
      </router-link>
    </section>
  </main>
</template>

<style scoped>
p {
  font-family: Merriweather;
  font-style: normal;
  font-weight: 900;
  font-size: 38px;
  line-height: 35px;
}

#landing_main {
  display: flex;
  justify-content: space-evenly;
  min-width: 350px;
  padding: 10px;
  margin-top: 5px;
  /* border: 2px solid; */
}

#landing_main section {
  border-radius: 15px;
  width: 150px;
  height: 80px;
  margin: 5px;
}

#landing_main section a:hover {
  text-decoration: underline;
  text-decoration-color: white;
}

#landing_main section a {
  list-style: none;
  text-decoration: none;
  color: #242520;
}
</style>
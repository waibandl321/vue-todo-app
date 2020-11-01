<template>
  <div id="app">
    <div class="container">
      <Header />
      <div class="task">
        <main>
          <Main />
        </main>
      </div>
      <Footer class="footer"/>
    </div>
  </div>
</template>

<script>
import Main from './components/Main.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Main,
    Header,
    Footer,
  },
}
</script>

<style>

#app {
  font-family: sans-serif;
  text-align: center;
  color: #2c3e50;
}
main {
  overflow-y: scroll;
}

</style>

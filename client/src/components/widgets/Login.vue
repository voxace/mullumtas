<template>
<div class="text-xs-center">
  <v-dialog v-model="loginDialog" width="500">

    <a slot="activator" @click="openDialog">
      <p class="subheading edit-label login">Login</p>
    </a>

    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Login</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog" icon>
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-form color="indigo" ref="form" v-model="valid">
          <v-text-field autofocus prepend-icon="person" name="username" v-model="username" label="DET Username" type="text" :rules="usernameRules" @keyup.enter="loginUser"></v-text-field>
          <v-text-field id="password" prepend-icon="lock" name="password" v-model="password" label="Password" type="password" :rules="passwordRules" @keyup.enter="loginUser"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="loginUser" :disabled="!valid" :loading="loading" class="white--text mr-2 mb-2">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    loading: false,
    username: '',
    usernameRules: [v => !!v || 'Username is required'],
    password: '',
    passwordRules: [v => !!v || 'Password is required'],
  }),
  computed: {
    loginDialog() {
      return this.$store.getters.loginDialog;
    },
  },
  methods: {
    closeDialog() {
      this.username = '';
      this.password = '';
      this.$store.dispatch('closeLoginDialog');
    },
    openDialog() {
      this.$store.dispatch('openLoginDialog');
    },
    loginUser() {
      if (this.valid) {
        this.loading = true;
        this.$http
          .post('/login', {
            username: this.username,
            password: this.password,
          })
          .then(response => {
            if (response.data._id.length > 0) {
              this.$store.dispatch('openSuccessBar', 'Login Successful');
              this.$store.dispatch('login', response.data);
              this.$store.dispatch('stopEditing');
              this.closeDialog();
              this.loading = false;
            }
          })
          .catch(err => {
            this.$store.dispatch('openErrorBar', 'Invalid username or password');
            this.loading = false;
          });
      }
    },
  },
};
</script>

<style>
.login:hover {
  font-weight: 700;
}

.login {
  margin-top: 20px !important;
  margin-right: 6px;
  color: white;
  text-decoration: none;
}
</style>

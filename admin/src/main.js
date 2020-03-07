import Vue from "vue";
import router from "./router";
import store from "./store";
import "./plugins/axios";
import vuetify from "./plugins/vuetify";
import VuetifyAdmin from "vuetify-admin";
import App from "./App.vue";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import i18n from "./i18n";
import PortalVue from "portal-vue";

Vue.config.productionTip = false;

Vue.use(VuetifyAdmin);
Vue.use(PortalVue);

/**
 * Register resource crud pages
 */
const files = require.context("./resources", true, /\.vue$/i);
files.keys().map(key => {
  const segments = key.split("/");
  const name = segments.pop();
  const dir = segments.pop();

  Vue.component(`${dir}${name.split(".")[0]}`, files(key).default);
});

Vue.prototype.$statusColor = s => {
  const colors = {
    published: "success",
    pending: "warning",
    denied: "error"
  };

  return colors[s];
};

new Vue({
  router: router(i18n),
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");
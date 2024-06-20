import { useSSRContext, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { u as useHead } from './index-BabADJUJ.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const _sfc_main$6 = {
  data() {
    return {
      websocketStatus: "Disconnected",
      websocket: null,
      isHidden: false,
      reconnectInterval: 3e3,
      maxReconnectAttempts: 10,
      currentReconnectAttempts: 0
    };
  },
  mounted() {
    this.connectWebSocket();
  },
  methods: {
    connectWebSocket() {
      this.websocket = new WebSocket("ws://localhost:8081");
      this.websocket.onopen = () => {
        this.websocketStatus = "Connected";
        this.currentReconnectAttempts = 0;
      };
      this.websocket.onclose = () => {
        this.websocketStatus = "Disconnected";
        if (!this.websocket || this.websocket.readyState !== WebSocket.CLOSED) {
          this.reconnectWebSocket();
        }
      };
      this.websocket.onerror = () => {
        this.websocketStatus = "Error";
        this.reconnectWebSocket();
      };
    },
    reconnectWebSocket() {
      if (this.currentReconnectAttempts < this.maxReconnectAttempts) {
        setTimeout(() => {
          this.currentReconnectAttempts++;
          this.connectWebSocket();
        }, this.reconnectInterval);
      } else {
        console.log("Exceeded maximum reconnect attempts.");
      }
    },
    toggleVisibility() {
      this.isHidden = !this.isHidden;
    }
  },
  beforeDestroy() {
    if (this.websocket) {
      this.websocket.close();
    }
  }
};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["info-field", { connected: $data.websocketStatus === "Connected", disconnected: $data.websocketStatus === "Disconnected", error: $data.websocketStatus === "Error", hidden: $data.isHidden }]
  }, _attrs))} data-v-1badad86><button class="toggle-button" data-v-1badad86><i class="${ssrRenderClass([{ "bi-chevron-down": !$data.isHidden, "bi-chevron-up": $data.isHidden }, "bi"])}" data-v-1badad86></i> ${ssrInterpolate($data.isHidden ? "Show Info" : "Hide Info")}</button><p style="${ssrRenderStyle(!$data.isHidden ? null : { display: "none" })}" data-v-1badad86>Status: ${ssrInterpolate($data.websocketStatus)}</p></div>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/InfoField.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$5], ["__scopeId", "data-v-1badad86"]]);
const _sfc_main$5 = {
  props: ["isOpen", "componentId"],
  data() {
    return {
      posX: 0,
      posY: 0,
      isDragging: false
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    startDrag(e) {
      this.isDragging = true;
      const startX = e.clientX - this.posX;
      const startY = e.clientY - this.posY;
      const moveHandler = (e2) => {
        if (this.isDragging) {
          this.posX = e2.clientX - startX;
          this.posY = e2.clientY - startY;
        }
      };
      const stopHandler = () => {
        this.isDragging = false;
        (void 0).removeEventListener("mousemove", moveHandler);
        (void 0).removeEventListener("mouseup", stopHandler);
      };
      (void 0).addEventListener("mousemove", moveHandler);
      (void 0).addEventListener("mouseup", stopHandler);
    }
  }
};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($props.isOpen) {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "modal" }, _attrs))} data-v-0a5d04a6><div class="modal-content" style="${ssrRenderStyle({ top: $data.posY + "px", left: $data.posX + "px" })}" data-v-0a5d04a6><h2 data-v-0a5d04a6>${ssrInterpolate($props.componentId)}</h2><p data-v-0a5d04a6>\u0422\u0435\u0441\u0442\u043E\u0432\u0430\u044F \u0441\u0442\u0430\u0442\u0438\u0447\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u0431\u043B\u043E\u043A\u0430 ${ssrInterpolate($props.componentId)}</p><button data-v-0a5d04a6>Close</button></div></div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Dialog.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$4], ["__scopeId", "data-v-0a5d04a6"]]);
const _sfc_main$4 = {
  props: ["isOpen", "componentId"],
  data() {
    return {
      modalTop: 0,
      modalLeft: 0,
      isDragging: false
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    startDrag(e) {
      this.isDragging = true;
      const startX = e.clientX - this.modalLeft;
      const startY = e.clientY - this.modalTop;
      const moveHandler = (e2) => {
        if (this.isDragging) {
          this.modalLeft = e2.clientX - startX;
          this.modalTop = e2.clientY - startY;
        }
      };
      const stopHandler = () => {
        this.isDragging = false;
        (void 0).removeEventListener("mousemove", moveHandler);
        (void 0).removeEventListener("mouseup", stopHandler);
      };
      (void 0).addEventListener("mousemove", moveHandler);
      (void 0).addEventListener("mouseup", stopHandler);
    }
  }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($props.isOpen) {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "modal" }, _attrs))} data-v-e03f764f><div class="modal-content" style="${ssrRenderStyle({ top: $data.modalTop + "px", left: $data.modalLeft + "px" })}" data-v-e03f764f><h2 data-v-e03f764f>${ssrInterpolate($props.componentId)}</h2><p data-v-e03f764f>\u0422\u0435\u0441\u0442\u043E\u0432\u0430\u044F \u0441\u0442\u0430\u0442\u0438\u0447\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u0431\u043B\u043E\u043A\u0430 ${ssrInterpolate($props.componentId)}</p><button class="btn btn-danger" data-v-e03f764f>Close</button></div></div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-e03f764f"]]);
const _sfc_main$3 = {
  components: {
    Modal: __nuxt_component_0
  },
  data() {
    return {
      components: [
        { id: "Part #1", color: "#6CB2EB" },
        { id: "Part #2", color: "#9FE6A0" },
        { id: "Part #3", color: "#FFC154" }
      ],
      isModalOpen: false,
      modalComponentId: "",
      originalColor: "",
      websocket: null
    };
  },
  mounted() {
    this.websocket = new WebSocket("ws://localhost:8081");
    this.websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const component = this.components.find((c) => c.id === data.elementId);
      if (component) {
        component.color = data.color;
      }
    };
  },
  methods: {
    openDialog(componentId) {
      this.isModalOpen = true;
      this.modalComponentId = componentId;
      const component = this.components.find((c) => c.id === componentId);
      if (component) {
        this.originalColor = component.color;
      }
      this.websocket.send(JSON.stringify({ elementId: componentId, color: "red" }));
    },
    closeModal() {
      this.isModalOpen = false;
      const component = this.components.find((c) => c.id === this.modalComponentId);
      if (component && this.originalColor !== "") {
        component.color = this.originalColor;
        this.websocket.send(JSON.stringify({ elementId: this.modalComponentId, color: this.originalColor }));
        this.originalColor = "";
      }
      this.modalComponentId = "";
    }
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Modal = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "mainfield" }, _attrs))} data-v-516ade20><h1 data-v-516ade20>Circuit</h1><svg width="800" height="400" data-v-516ade20><!--[-->`);
  ssrRenderList($data.components, (component, index2) => {
    _push(`<g${ssrRenderAttr("transform", "translate(" + (100 + index2 * 250) + ", 200)")} data-v-516ade20><rect x="-80" y="-60" width="120" height="120"${ssrRenderAttr("fill", component.color)} data-v-516ade20></rect><text x="-20" y="4" font-size="14" fill="black" text-anchor="middle" data-v-516ade20>${ssrInterpolate(component.id)}</text></g>`);
  });
  _push(`<!--]--></svg>`);
  _push(ssrRenderComponent(_component_Modal, {
    isOpen: $data.isModalOpen,
    componentId: $data.modalComponentId,
    onClose: $options.closeModal
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MainField.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const MainField = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-516ade20"]]);
const _sfc_main$2 = {
  methods: {
    logout() {
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "top-bar" }, _attrs))} data-v-b11713a6><div class="container" data-v-b11713a6><div class="bar" data-v-b11713a6><h1 data-v-b11713a6>Testing App</h1><div class="user-info" data-v-b11713a6><span data-v-b11713a6>User Name</span><button class="btn btn-danger" data-v-b11713a6>Logout</button></div></div></div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TopBar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const TopBar = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-b11713a6"]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app" }, _attrs))} data-v-bfa13efe><div class="sidebar" data-v-bfa13efe><div class="container" data-v-bfa13efe><div class="row" data-v-bfa13efe><div class="col-12" data-v-bfa13efe><ul class="nav-menu" data-v-bfa13efe><h3 class="sidebar-title" data-v-bfa13efe>SideBar Menu</h3><li data-v-bfa13efe><i class="bi bi-house" data-v-bfa13efe></i> Home</li></ul></div></div></div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SideBar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const SideBar = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-bfa13efe"]]);
const __default__ = {
  components: {
    MainField,
    TopBar,
    SideBar
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "\u0421\u0445\u0435\u043C\u0430"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_InfoField = __nuxt_component_0$1;
      const _component_Dialog = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-ee9317f9>`);
      _push(ssrRenderComponent(TopBar, null, null, _parent));
      _push(`<div class="d-flex" data-v-ee9317f9>`);
      _push(ssrRenderComponent(SideBar, null, null, _parent));
      _push(ssrRenderComponent(MainField, null, null, _parent));
      _push(ssrRenderComponent(_component_InfoField, null, null, _parent));
      _push(ssrRenderComponent(_component_Dialog, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ee9317f9"]]);

export { index as default };
//# sourceMappingURL=index-Cs10MEDh.mjs.map

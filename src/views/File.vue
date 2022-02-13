<template>
  <div id="container" ref="sceneContainer"></div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Stats from 'stats.js';

export default {
  name: 'File',
  data() {
    return {
      container: null,
      scene: null,
      camera: null,
      controls: null,
      renderer: null,
      stats: null,
    };
  },
  methods: {
    setup() {
      this.container = this.$refs.sceneContainer;
      this.stats = new Stats();
      this.container.appendChild(this.stats.dom);
      const fov = 30;
      const aspect = this.container.clientWidth / this.container.clientHeight;
      const near = 0.1;
      const far = 30;
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.set(0, 5, 10);
      this.camera = camera;
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color('black');
      const ambientLight = new THREE.HemisphereLight(
        0xffffff,
        0x222222,
        1,
      );
      const mainLight = new THREE.DirectionalLight(0xffffff, 4.0);
      mainLight.position.set(10, 10, 10);
      this.scene.add(ambientLight, mainLight);
      this.controls = new OrbitControls(this.camera, this.container);
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.gammaFactor = 2.2;
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.renderer.physicallyCorrectLights = true;
      this.container.appendChild(this.renderer.domElement);
      this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
      const loader = new GLTFLoader();
      loader.load(this.getFileUrl(), (gltf) => this.scene.add(gltf.scene), undefined, undefined);
      this.renderer.setAnimationLoop(() => this.render());
    },
    getFileUrl() {
      const { domain } = this.$store.state;
      const {
        userId,
        fileName,
      } = this.$route.params;
      return `${domain}/api/public/converted/${userId}/${fileName}`;
    },
    render() {
      this.renderer.render(this.scene, this.camera);
      this.stats.update();
    },
  },
  mounted() {
    this.setup();
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

#container {
  min-height: 800px;
}

</style>

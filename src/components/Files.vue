<template>
  <Panel title="Files">

    <!--  File Tables  -->
    <div
      class="file mt-2"
    >
      <v-data-table
        :headers="headers"
        :items="projects"
        class="elevation-1"
      >
        <template slot="headerCell" slot-scope="props">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
            <span v-on="on">
              {{ props.header.text }}
            </span>
            </template>
            <span>
            {{ props.header.text }}
          </span>
          </v-tooltip>
        </template>
        <template v-slot:items="props">
          <td class="">
            <a :href="getOriginFileUrl(props.item.author.id, getFileName(props.item.fileName))">
              {{ getFileName(props.item.fileName) }}
            </a>
          </td>
          <td class="">
            <a
              :href="getConvertedFileUrl(props.item.author.id, getFileName(props.item.convertedFilePath))">
              {{ getFileName(props.item.convertedFilePath) }}
            </a>
          </td>
          <td class="">{{ props.item.createdAt }}</td>
          <td>
            <!-- View -->
            <router-link
              :to="getLinkView(props)"
            >
              <v-btn
                color="primary"
                small
              >View
              </v-btn>
            </router-link>
            <!-- View -->

            <!-- Delete -->
            <v-btn
              color="error"
              small
              @click.stop="deleteProject(props.item)"
            >Delete
            </v-btn>
            <!-- /Delete -->
          </td>
        </template>
      </v-data-table>
    </div>
    <!--  /File Tables  -->

    <!--  Upload File  -->
    <v-container grid-list-lg>
      <v-text-field
        @click='onPickFile'
        v-model='fileName'
        :error-messages='error'
        prepend-icon="attach_file"
      ></v-text-field>
      <!-- Hidden -->
      <input
        type="file"
        style="display: none"
        ref="fileInput"
        accept="*/*"
        @change="onFilePicked">
      <v-btn
        color="primary"
        @click.stop="onUploadSelectedFileClick"
        :loading="loading"
      >UPLOAD
      </v-btn>
      <!--  /Upload File  -->
    </v-container>
  </Panel>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';

export default {
  components: {},
  data() {
    return {
      headers: [
        {
          text: 'File Name',
          align: 'center',
          sortable: false,
          value: 'fileName',
        },
        {
          text: 'Convert File',
          align: 'center',
          sortable: false,
          value: 'convertedFilePath',
        },
        {
          text: 'Created At',
          align: 'center',
          sortable: false,
          value: 'createdAt',
        },
        {
          align: 'center',
          sortable: false,
        },
      ],

      // file
      loading: false,
      fileName: null,
      title: null,
      size: null,
      name: null,
      type: null,
      lastModifiedDate: null,
    };
  },
  mounted() {
    this.fetchProjects();
    this.title = 'New title';
    this.setError(null);
  },
  computed: {
    ...mapState('file', [
      'newProjectName',
      'projects',
      'file',
      'error',
    ]),
  },
  methods: {
    ...mapMutations('file', [
      'setNewProjectName',
      'setEditMode',
      'unsetEditMode',
      'setNewProject',
      'setProjectTitle',
      'setError',
    ]),
    ...mapActions('file', [
      'createProject',
      'fetchProjects',
      'updateProject',
      'deleteProject',
    ]),
    getLinkView(props) {
      return ({
        name: 'file',
        params: {
          id: props.item.id,
          userId: props.item.author.id,
          fileName: this.getFileName(props.item.convertedFilePath),
        },
      });
    },
    getOriginFileUrl(userId, fileName) {
      const { domain } = this.$store.state;
      return `${domain}/api/public/origin/${userId}/${fileName}`;
    },
    getConvertedFileUrl(userId, fileName) {
      const { domain } = this.$store.state;
      return `${domain}/api/public/converted/${userId}/${fileName}`;
    },
    getFileName(path) {
      path = path.match(/(.*?[\\/:])?(([^\\/:]*?)(\.[^\\/.]+?)?)(?:[?#].*)?$/);
      return path[2];
    },
    onPickFile() {
      this.setError(null);
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const { files } = event.target;
      if (files[0] !== undefined) {
        this.fileName = files[0].name;
        // Check validity of file
        if (this.fileName.lastIndexOf('.') <= 0) {
          return;
        }
        // If valid, continue
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener('load', () => {
          this.url = fr.result;
          // eslint-disable-next-line prefer-destructuring
          this.fileObject = files[0]; // this is an file that can be sent to server...
          this.setNewProject(this.fileObject);
        });
      } else {
        this.fileName = '';
        this.fileObject = null;
        this.url = '';
      }
    },
    resetFileInput() {
      this.loading = false;
      this.title = null;
      this.size = null;
      this.name = null;
      this.type = null;
      this.lastModifiedDate = null;
    },
    // on submit
    async onUploadSelectedFileClick() {
      this.loading = true;

      // A file is not chosen!
      if (!this.fileObject) {
        this.setError('File is required');
        this.loading = false;
        return;
      }
      // DO YOUR JOB HERE with fileObjectToUpload
      // https://developer.mozilla.org/en-US/docs/Web/API/File/File
      this.name = this.fileObject.name;
      this.size = this.fileObject.size;
      this.type = this.fileObject.type;
      this.lastModifiedDate = this.fileObject.lastModifiedDate;
      // DO YOUR JOB HERE with fileObjectToUpload
      await this.createProject();
      this.resetFileInput();
    },
  },
};
</script>

<style>
.file {
  font-size: 18px;
}
</style>

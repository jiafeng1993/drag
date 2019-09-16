let logTemplate = {
  name: 'render'
  , template: `
    <div class="control-item" :class="{text: isText}">
      <p class="title">{{title}}</p>
      <p class="log-icon" v-if="isSelect"><i class="el-icon el-icon-arrow-right"></i></p>
    </div>`
  , props: {
    title: { type: String, require: true }
    , isSelect: { type: Boolean, require: true }
    , isText: { type: Boolean, require: true }
  }
};

let  cloneTemplate = {
  name: 'clone'
  , template: `
    <div v-if="title!=='空行'" class="control-item" :class="{text: isText}" @click="$emit('handleCode', numbering)">
      <p class="title">{{title}}</p>
      <p v-if="placeholder!==''" :class="{ right: isSelect, middle: !isSelect }">{{placeholder}}</p>
      <p class="log-icon" v-if="isSelect"><i class="el-icon el-icon-arrow-right"></i></p>
    </div>
    <div v-else style="height: 20px;"></div>`
  , props: {
    title: { type: String, require: true }
    , isSelect: { type: Boolean, require: true }
    , isText: { type: Boolean, require: true }
    , numbering: { type: Number, require: true }
    , placeholder: { type: String, default: '' }
  }
};




export { logTemplate, cloneTemplate };

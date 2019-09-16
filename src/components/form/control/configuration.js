let inputConf = {
    title: '输入框'
    , isSelect: false
    , isText: false
    , placeholder: ''
    , label: ''
    , required: false
    , type: 'text'
  }
  , textAreaConf = {
    title: '多行文本框'
    , isSelect: false
    , isText: true
    , placeholder: ''
    , label: ''
    , required: false
    , type: 'textarea'
  }
  , selectConf = {
    title: '选择器'
    , isSelect: true
    , isText: false
    , placeholder: ''
    , label: ''
    , required: false
    , type: 'select'
    , values: Array.apply(null, {length: 3})
      .map((k, v) => {
        return {
          label: '选项-' + (v + 1)
          , value: ''
        }
      })
  }
  , radioConf = {
    title: '单选框'
    , isSelect: false
    , isText: false
    , label: ''
    , required: false
    , type: 'radio'
    , values: Array.apply(null, {length: 3})
      .map((k, v) => {
        return {
          label: '选项-' + (v + 1)
          , value: ''
        }
      })
  }
  , checkboxConf = {
    title: '多选框'
    , isSelect: false
    , isText: false
    , required: false
    , type: 'checkbox'
    , values: Array.apply(null, {length: 3})
      .map((k, v) => {
        return {
          label: '选项-' + (v + 1)
          , value: ''
        }
      })
  }
  , dateConf = {
    title: '时间选择器'
    , isSelect: true
    , isText: false
    , placeholder: ''
    , label: ''
    , required: false
    , type: 'date'
    , format: ''
  }
  , blankConf = {
    title: '空行'
    , isSelect: false
    , isText: false
  }
;

export let form_list = [
  inputConf
  , textAreaConf
  , selectConf
  , radioConf
  , checkboxConf
  , dateConf
  , blankConf
];

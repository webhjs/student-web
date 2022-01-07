<template>
  <div :id="id" :init="init" :disabled="disabled"></div>
</template>
<script>
import tinyMCE from "tinymce/tinymce"; //tinymce默认hidden
import "tinymce/themes/silver/theme"; //编辑器主题
import "tinymce/icons/default"; //引入编辑器图标icon

import "tinymce/plugins/advlist"; //高级列表
import "tinymce/plugins/autolink"; //自动链接
import "tinymce/plugins/link"; //超链接
import "tinymce/plugins/image"; //插入编辑图片
import "tinymce/plugins/lists"; //列表插件
import "tinymce/plugins/charmap"; //特殊字符
import "tinymce/plugins/table";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/imagetools";
import "tinymce/plugins/preview";
import "tinymce/plugins/code";
import "tinymce/plugins/help";
// import "tinymce/plugins/media"; //插入编辑媒体
// import "tinymce/plugins/wordcount"; // 字数统计
// import "tinymce/plugins/textcolor"; //颜色

// "autolink lists link image searchreplace emoticons media help paste wordcount codesample hr"

import Vue from "vue";
export default {
  name: "DefaultTinymce",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    id: {
      type: String,
      default: "id"
    },
    //内容
    value: {
      type: String,
      default: ""
    },
    //是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    //插件
    plugins: {
      type: [String, Array],
      default:
        "advlist autolink link image lists charmap table fullscreen imagetools preview code help"
      // print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave bdmap indent2em autoresize formatpainter axupimgs
    },
    //工具栏
    toolbar: {
      type: [String, Array],
      default:
        "FillBtn | custom-more | bold italic underline strikethrough | forecolor backcolor removeformat | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent | subscript superscript | hr | charmap emoticons | link image media codesample | code preview help"
      // "undo redo | lists | fullscreen"
    },
    placeholder: {
      type: String,
      default: "请这里输入好帅哦~"
    },
    fillBtn: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    //监听内容变化
    value: {
      handler(newValue) {
        this.myValue = newValue || "";
      },
      immediate: true
    },
    myValue(newValue) {
      this.$emit("change", newValue);
    }
  },
  data() {
    return {
      myValue: "",
      init: {
        selector: `#${this.id}`,
        language_url: "/static/tinymce/langs/zh_CN.js", //汉化路径是自定义的，一般放在public或static里面
        language: "zh_CN",
        skin_url: "/static/tinymce/skins/ui/oxide", //皮肤
        inline: false, // 开启内联模式
        menubar: false || "my1", // 菜单显示
        // menu: {
        //   file: {title: '文件', items: 'newdocument'},
        //   edit: {title: '编辑', items: 'undo redo | cut copy paste pastetext | selectall'},
        //   insert: {title: '插入', items: 'link media | template hr'},
        //   view: {title: '查看', items: 'visualaid'},
        //   format: {title: '格式', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat'},
        //   table: {title: '表格', items: 'inserttable tableprops deletetable | cell row column'},
        //   tools: {title: '工具', items: 'spellchecker code'},
        //   my1: {title: '我的菜单', items: 'copy paste' }
        // },
        plugins: this.plugins, //插件
        toolbar: this.toolbar, //工具栏
        toolbar_location: "/",
        fontsize_formats:
          "12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px", //字体大小
        font_formats:
          "Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; AkrutiKndPadmini=Akpdmi-n;宋体=宋体;黑体=黑体;仿宋=仿宋;微软雅黑=Microsoft YaHei;楷体-GB2312=楷体-GB2312", //引入字体如['宋体=宋体','微软雅黑=微软雅黑'],
        height: "100%", //高度
        // toolbar_mode: "wrap", // 是否出現省略號
        setup: editor => {
          if (this.fillBtn) {
            const str = '<svg-icon class="inline" icon-class="fill" />';
            // 创建构造器
            const svgIcon = Vue.extend({
              template: str
            });
            // 创建一个 svgIcon 实例并返回 dom 节点
            const component = new svgIcon().$mount();
            editor.ui.registry.addIcon("language", component.$el.outerHTML);
            // 注册一个自定义的按钮
            editor.ui.registry.addButton("FillBtn", {
              icon: "language",
              onAction: () => {
                const str = `&nbsp;<span style="text-decoration: underline;">&nbsp;&nbsp;(${1})&nbsp;&nbsp;</span>&nbsp;`
                editor.insertContent(str);
              }
            });
          }
          // // 注册一个icon
          // editor.ui.registry.addIcon(
          //   "shopping-cart",
          //   '<svg viewBox="0 0 1024 1024" data-icon="shopping-cart" width="1.5em" height="1.5em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z"></path></svg>'
          // );
          // // 注册一个icon
          // editor.ui.registry.addIcon("language", 'shopping-cart');
          // // 自定义文本按钮
          // editor.ui.registry.addMenuButton("custom-more", {
          //   icon: "language",
          //   tooltip: "文本",
          //   fetch: callback => {
          //     // 下拉框
          //     var items = [
          //       {
          //         type: "menuitem",
          //         icon: "user",
          //         text: "Menu item 1",
          //         onAction: () => {}
          //       }
          //     ];
          //     callback(items);
          //   }
          // });

          // const { buttons, menuItems } = editor.ui.registry.getAll();
          // console.log("全部工具栏:", buttons, "全部菜单项:", menuItems);
        },
        images_upload_handler: (blobInfo, success, failure, progress) => {
          const file_type = blobInfo.blob().type;
          //格式校验
          const isAccept = [ "image/jpeg", "image/png", "image/GIF", "image/jpg", "image/BMP" ].includes(file_type);
          //大小校验
          if (blobInfo.blob().size / 1024 / 1024 > 2) {
            failure("上传失败，图片大小请控制在 2M 以内");
            this.$message.warning("上传失败，图片大小请控制在 2M 以内");
          } else if (!isAccept) {
            this.$message.warning("图片格式错误");
            failure("图片格式错误");
          } else {
            const reader = new FileReader(); //new一个FileReader实例
            reader.onload = e => {
              success(e.target.result);
            };
            reader.readAsDataURL(blobInfo.blob());
          }
        },

        file_picker_types: 'file image media',
        file_picker_callback: function(callback, value, meta) {
          const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', '.pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4');
            input.click();
          input.onchange = function() {
            var file = this.files[0];
            const reader = new FileReader();
            reader.onload = function() {
              const id = "blobid" + new Date().getTime();
              const blobCache = tinyMCE.activeEditor.editorUpload.blobCache;
              const base64 = reader.result.split(",")[1];
              const blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);
              callback(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
            // callback('movie.mp4', {source2: 'alt.ogg', poster: 'image.jpg', text: 'My text', alt: 'My alt text'});
          }
        },
        placeholder: this.placeholder,
        branding: false, //隐藏右下角技术支持
        auto_focus: true, // 自动聚焦
        init_instance_callback: editor => { // 初始化监听 或 setup: editor => { editor.on("init") }
          editor.setContent(this.myValue)
          editor.on("change", e => {
            this.myValue = e.level.content;
          });
          editor.on("keyup", e => {
            this.myValue = e.target.innerHTML;
          });
          editor.on("change keypress", () => {
            if (this.fillBtn) {
              this.$nextTick(() => {
                let number = 0;
                const content = editor.getContent();
                const string = content.replace(/(.*?\().*?(\).*?)/g, (matched, capture1, capture2) => (capture1 + (++number) + capture2))
                this.$emit("changeNum", number)
                var bm = editor.selection.getBookmark(2,true);
                editor.setContent(string)
                editor.selection.moveToBookmark(bm);
              })
            }
            // editor.execCommand('selectAll');
            // editor.selection.getRng().collapse(false);
            // editor.selection.select(editor.getBody(), true); // 光标最后位置 editor === tinyMCE.activeEditor
            // editor.selection.collapse(false);
            // editor.selection.getContent()
            // editor.selection.collapse(false);
          });
          editor.on(
            "keyup Undo Redo ExecCommand NodeChange SetContent Blur",
            (e) => {
              // console.log(e);
            }
          );
        }
      }
    };
  },
  mounted() {
    this.initTiny();
  },
  beforeDestroy() {
    tinyMCE.editors[this.id].destroy();
  },
  methods: {
    initTiny() {
      tinyMCE.init(this.init);
    }
  }
};
</script>

<style lang="stylus">
.inline
  font-size 20px;
</style>
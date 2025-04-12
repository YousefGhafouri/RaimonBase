import { IAllProps } from "@tinymce/tinymce-react";
import axios from "axios";

export const EditorProps:IAllProps['init'] = {
  // skin: (window.matchMedia('(prefers-color-scheme: dark)').matches ? {oxide_dark} : {oxide}),
  // content_css:{writer},
  automatic_uploads: false,
  images_reuse_filename: true,
  height: '100%',
  menubar: 'file edit view insert format tools table tinycomments help',
  plugins: 'link responsiveImage autolink lists media  table image imagetools advlist anchor autosave code charmap codesample directionality textpattern fullpage fullscreen help hr insertdatetime legacyoutput media noneditable pagebreak paste preview print quickbars save searchreplace spellchecker tabfocus template textpattern toc visualblocks visualchars wordcount nonbreaking',
  toolbar: 'formatselect| table image media|link charmap codesample | alignleft aligncenter alignright alignjustify|numlist bullist|ltr rtl|fullpage searchreplace fullscreen preview| mobile tablet desktop',

  file_browser_callback_types: 'image',
  file_picker_types: 'image',
  media_live_embeds: true,
  font_formats: "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats;هما=homa;يكان=yekan;دستنويس=dastnevis;ایران سانس=iransans;وزير=vazir;",
  nonbreaking_force_tab: true,
  content_style: `
   @font-face {
     font-family: homa;
     src: url(/fonts/homa.ttf) format('truetype');
   }
   @font-face {
     font-family: yekan;
     src: url(/fonts/yekan.ttf) format('truetype');
   }
   @font-face {
     font-family: dastnevis;
     src: url(/fonts/dastnevis.ttf) format('truetype');
   }
   @font-face {
     font-family: iransans;
     src: url(/fonts/woff/IRANSansX-Regular.woff) format('woff1');
     src: url(/fonts/woff2/IRANSansX-Regular.woff2) format('woff2');
   }
   @font-face {
     font-family: vazir;
     src: url(/fonts/vazir-fd.ttf) format('truetype');
   }`,


  // noneditable_noneditable_class: 'mceNonEditable',
  quickbars_selection_toolbar: 'image quicktable | link hr pagebreak',
  quickbars_insert_toolbar: 'bold italic | link h2 h3 blockquote image quicktable',
  toolbar_mode: 'sliding',
  contextmenu: 'link image imagetools table',

  fullscreen_native: true,
  resize: 'both',
  // /* enable title field in the Icon dialog*
  image_title: true,
  // /* enable automatic uploads of images represented by blob or oman URIs*
  image_advtab: true,
  // /*
  // URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
  // images_upload_url: 'postAcceptor.php',
  // here we add custom filepicker only to Icon dialog
  // *
  paste_postprocess: function (pl, o) {
    o.node.innerHTML = o.node.innerHTML.replace(/&nbsp;/ig, " ");
  },
  video_template_callback: function (data) {
    return '<video width="' + data.width + '" height="' + data.height + '"' + (data.poster ? ' poster="' + data.poster + '"' : '') + ' controls="controls">\n' + '<source src="' + data.source + '"' + (data.sourcemime ? ' type="' + data.sourcemime + '"' : '') + ' />\n' + (data.altsource ? '<source src="' + data.altsource + '"' + (data.altsourcemime ? ' type="' + data.altsourcemime + '"' : '') + ' />\n' : '') + '</video>';
  },
  branding: false,

  // images_upload_url:'',
  audio_template_callback: function (data) {
    console.log(data)
    return '<audio controls>' + '\n<source src="' + data.source + '"' + (data.sourcemime ? ' type="' + data.sourcemime + '"' : '') + ' />\n' + (data.altsource ? '<source src="' + data.altsource + '"' + (data.altsourcemime ? ' type="' + data.altsourcemime + '"' : '') + ' />\n' : '') + '</audio>';
  },
  // /* and here's our custom image picker*
  file_picker_callback: function (cb, value, meta) {
    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    if (meta.filetype === 'image') {
      input.setAttribute('accept', 'image/*');
    }else {
      input.setAttribute('accept', '*');
    }

    // /*
    // Note: In modern browsers input[type="file"] is functional without
    // even adding it to the DOM, but that might not be the case in some older
    // or quirky browsers like IE, so you might want to add it to the DOM
    //   just in case, and visually hide it. And do not forget do remove it
    //   once you do not need it anymore.
    //   *

    input.onchange = function () {
      //@ts-ignore
      var file = this.files[0];

      var reader = new FileReader();
      reader.onload = function () {
        // /*
        // Note: Now we need to register the blob in TinyMCEs image blob
        // registry. In the next release this part hopefully won't be
        // necessary, as we are looking to handle it internally.
        // *
        var id = 'blobid' + (new Date()).getTime();
        //@ts-ignore
        var blobCache = window.tinymce.activeEditor.editorUpload.blobCache;
        //@ts-ignore
        var base64 = reader.result.split(',')[1];
        var blobInfo = blobCache.create(id, file, base64);
        blobCache.add(blobInfo);

        // /* call the callback and populate the Title field with the file name *
        if (meta.filetype === 'image') {
          // JustifyCenter
          cb(blobInfo.blobUri(), {title: file.name, width: '50%'});
        }else{
          console.log("image Files")
          cb(blobInfo.blobUri(), {title: file.name});
        }
      };
      reader.readAsDataURL(file);
      //@ts-ignore
      window.tinyMCE.activeEditor.execCommand('justifycenter')
    };

    input.click();
  },

  //   setup: function(ed) {
  //     ed.onClick.add(function(ed, evt) {
  //         ed.selection.select(evt.target);
  //     });
  //  }
}


export function createUploadHandler() {
  return function handler(blobInfo:any, progress:any) {
    const formData = new FormData();
      formData.append('file', blobInfo.blob(), blobInfo.filename());
      return new Promise<string>(async (resolve,reject)=>{
        const config = {
          onUploadProgress: (e:any) => progress(Math.floor(e.loaded / e.total * 100))
        }
        try {
          const {data} =  await axios.post<string>("file/upload_public_file",formData,config)
          resolve(data)
        } catch (error) {
          reject(error)
        }
      })
  }
}
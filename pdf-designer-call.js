/**
 * Created by mlc on 21/03/2017.
 */

(function(window) {
  var Analyst = null;
  var pdfFile = null;
  window.myExtObject = window.myExtObject || {};
  window.myExtObject = {
    getAnalyst : function(){
      return Analyst;
    },
    getPdfFile : function(){
      return pdfFile;
    },
    onChangeFile : function (file) {
        var Stream = new Uint8Array(file);

        Analyst = new TPDFAnalyst();

        try {

          Analyst.LoadFromStream(Stream);

          if (Analyst.Encrypt) {
          } else {
          }
        } catch (e) {
          Analyst = null;
        }
    },

    run : function (pages) {
      // var begin  = document.getElementById("begin").value;
      // var end    = document.getElementById("end").value;
      //
      // // エラーチェック
      // // ※明示的にブラウザのValidation機能(HTML5)を発動させています。
      // if (!document.getElementById("begin").checkValidity()){
      //   return true;
      // }
      //
      // if (!document.getElementById("end").checkValidity()){
      //   return true;
      // }
      //
      // // スワップ
      // begin = parseInt(begin,10);
      // end   = parseInt(end,10);
      //
      // if (begin > end){
      //   begin = parseInt(document.getElementById("end").value,10);
      //   end   = parseInt(document.getElementById("begin").value,10);
      // }

      var PDFKnife = new TPDFKnife();

      if (Analyst != null) {
        try {
          pdfFile = PDFKnife.SaveToFile(PDF_GetDateTime_Now() + '.pdf', Analyst,pages);

        } catch (e) {
          Analyst[0] = null;
          Analyst[1] = null;

          document.getElementById("errmsg").innerHTML =
            'failed in the convert of the PDF file. ';
        }
      } else {
        document.getElementById("errmsg").innerHTML =
          'Please select a file.';
      }
      return pdfFile;
    }

  }

})(this);

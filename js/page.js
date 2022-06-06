
$(document).ready(function() {

    //gerar a arte
    $("#btngenerate").on("click", function() {

        
        let texto = "";
        texto = $("#input-text").val();
        //alert (texto);

        $("#content-section").css("display", "none");
        $("#output-section").css("display", "flex");
        $("#btngenerate").css("display", "none");
        $("#btngoback").css("display", "inline-flex");
        $("#btnexport").css("display", "inline-flex");
    });

    //voltar atras
    $("#btngoback").on("click", function() {
        
        $("#content-section").css("display", "flex");
        $("#output-section").css("display", "none");
        $("#btngenerate").css("display", "inline-flex");
        $("#btngoback").css("display", "none");
        $("#btnexport").css("display", "none");
    });

    //exportar a imagem
    function saveMyCanvas() {
        saveCanvas("#output-section", ["jpg"], ["jpg"]);
      }
      
    $("#btnexport").on("click", function() {
        saveMyCanvas(["inkblotyper"], ["1"]);
    
    });

    //carregar no the project
    $("#theproject").on("click", function() {
        $('.card').toggleClass('inactive');
        $('.card2').addClass('inactive');

        
        //$("#wrapper").css("display", "flex");
        
    });

    $("#theteam").on("click", function() {
        $('.card2').toggleClass('inactive');
        $('.card').addClass('inactive');
        
        
    });

    //clicar no x da gaveta
 
    $(".iconify").on("click", function() {
        $('.card').addClass('inactive');
        $('.card2').addClass('inactive');
        
    });


  


}); //doc  finish
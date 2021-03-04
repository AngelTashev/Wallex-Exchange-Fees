$(document).ready(function() {
    $("#from-curr").change(function() {
        var val = $(this).val();
        if (val == "usd" || val == "eur") {
            $("#to-curr").html("<option value='btc'>BTC</option>" + 
            "<option value='eth'>ETH</option>" +
            "<option value='bch'>BCH</option>");
        } else if (val == "btc" || val == "eth" || val == "bch") {
            $("#to-curr").html("<option value='eur'>EUR</option>" + 
            "<option value='usd'>USD</option>");
        }
    });

    $("#custom-rate-check").click(function() {
        if($(this).prop("checked")) {
            $("#custom-rate").removeProp("disabled");
            $("#custom-rate").prop("required", true);
        } else {
            $("#custom-rate").empty();
            $("#custom-rate").removeProp("required");
            $("#custom-rate").prop("disabled", true);
        }
    });
});
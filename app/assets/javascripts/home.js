function display_historical_options() {
	if ($('#chart_type_one').is(':checked')) {
		$('#hidden_options').show();
	} else {
		$('#hidden_options').hide();
	}
}

jQuery(function(){
    // For each radio button whose name is 'chart_type':
    jQuery("input[type='radio'][name='chart_type']").each(function(index, button){
        // Give the button a certain click behaviour:
        jQuery(button).click(function(){
            display_historical_options();
        });
    });
    jQuery("label[type='radio'][name='chart_type']").each(function(index, button){
        // Give the button a certain click behaviour:
        jQuery(button).click(function(){
            display_historical_options();
        });
    });
});
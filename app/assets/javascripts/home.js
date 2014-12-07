function display_historical_options() {
	if ($('#chart_type_one').is(':checked')) {
		$('#hidden_options').show();
	} else {
		$('#hidden_options').hide();
	}
}

function display_custom_times() {
	if ($('#time_select').val() == 6) {
		$('#custom_time').show();
	} else {
		$('#custom_time').hide();
	}
}

function restrict_end_date() {
	if (new Date($('#date_end').val()) < new Date($('#date_start').val())) {
		$('#date_end').val($('#date_start').val());
	}
	if (new Date($('#date_end').val()) == new Date($('#date_start').val()) && 
		new Date('May 1, 2000' + $('#time_end').val()) < new Date('May 1, 2000' + $('#time_start').val())) {
		$('#time_end').val($('#time_start').val());
	}
}

function restrict_start_date() {
	if (new Date($('#date_start').val()) > new Date($('#date_end').val())) {
		$('#date_start').val($('#date_end').val());
	}
	if (new Date($('#date_end').val()) == new Date($('#date_start').val()) && 
		new Date('May 1, 2000' + $('#time_start').val()) > new Date('May 1, 2000' + $('#time_end').val())) {
		$('#time_start').val($('#time_end').val());
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
    jQuery("select[name='time_select']").each(function(index, button){
        // Give the button a certain click behaviour:
        jQuery(button).click(function(){
            display_custom_times();
        });
    });
    jQuery("input[type='date'][name='date[start]']").each(function(index, button){
        // Give the button a certain click behaviour:
        jQuery(button).focusout(function(){
            restrict_end_date();
        });
    });
    jQuery("input[type='time'][name='time[start]']").each(function(index, button){
        // Give the button a certain click behaviour:
        jQuery(button).focusout(function(){
            restrict_end_date();
        });
    });
    jQuery("input[type='date'][name='date[end]']").each(function(index, button){
        // Give the button a certain click behaviour:
        jQuery(button).focusout(function(){
            restrict_start_date();
        });
    });
    jQuery("input[type='time'][name='time[end]']").each(function(index, button){
        // Give the button a certain click behaviour:
        jQuery(button).focusout(function(){
            restrict_start_date();
        });
    });
    /*
    jQuery("input[type='date']").each(function(index, button){
        // Give the button a certain click behaviour:
        jQuery(button).datepicker({
        	defaultDate: 0,
        	maxDate: 0,
        	// TODO: update this before production, remember that month is zero based
        	minDate: new Date(2014, 11, 6)
        });
    });
	*/
});
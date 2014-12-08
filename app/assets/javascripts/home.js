var chart;

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

function update_chart(data) {
	$('#tmp').html(data.title);
	$('#tmp').show();
	var chart_data = {
	    labels: ["January", "February", "March", "April", "May", "June", "July"],
	    datasets: [
	        {
	            label: "My First dataset",
	            fillColor: "rgba(220,220,220,0.5)",
	            strokeColor: "rgba(220,220,220,0.8)",
	            highlightFill: "rgba(220,220,220,0.75)",
	            highlightStroke: "rgba(220,220,220,1)",
	            data: [65, 59, 80, 81, 56, 55, 40]
	        },
	        {
	            label: "My Second dataset",
	            fillColor: "rgba(151,187,205,0.5)",
	            strokeColor: "rgba(151,187,205,0.8)",
	            highlightFill: "rgba(151,187,205,0.75)",
	            highlightStroke: "rgba(151,187,205,1)",
	            data: [28, 48, 40, 19, 86, 27, 90]
	        }
	    ]
	};
	var ctx = $('#chart').get(0).getContext('2d');
	if (data.type == 'b') {
		if (typeof chart !== 'undefined') {
			chart.destroy();
			chart = new Chart(ctx).Bar(chart_data, {});
		} else {
			chart = new Chart(ctx).Bar(chart_data, {});
		}
	} else {
		if (typeof chart !== 'undefined') {
			chart.destroy();
			chart = new Chart(ctx).Line(chart_data, {});
		} else {
			chart = new Chart(ctx).Line(chart_data, {});
		}
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
    jQuery("input[type='submit']").each(function(index, button){
        jQuery(button).click(function(){
        	if ($('#chart_type_all').is(':checked')) {
	            $.ajax({
				    type: "POST",
				    url: "create.json",
				    dataType: "json",
				    success: function(data) {
				        update_chart(data);
				    }
				});
	        } else {
	        	$.ajax({
				    type: "POST",
				    url: "create/" + $('#resource_select').val() + "/" + $('#time_select').val() + ".json",
				    dataType: "json",
				    success: function(data) {
				        update_chart(data);
				    }
				});
	        }
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
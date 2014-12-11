var chart;
var labels = ["Hall Light", "Bath Light", "Bedroom Outlets", "Main Room Lights", "Outdoor Outlets", "Daikin Hydrobox", 
				"Main Room Outlets", "Disposal", "Office Outlets", "Air Handler", "JACE, Webbox, RIO", "Smoke Alarms",
				"ERV, Dining Light", "Solar Thermal Hot Water", "Refrigerator", "Washer", "Microwave", "Bath",  "Kitchen Outlets W", 
				"Kitchen Outlets E", "Veris", "Dishwasher", "Dryer", "Hot Water Tank", "Oven", "Outdoor Daikin", "Cooktop",
				"Voltage", "Total Power", "Solar Power"];
$( document ).ready(function() {
	request_default_chart();
});

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

function request_default_chart() {
	$.ajax({
	    type: "POST",
	    url: "create.json",
	    dataType: "json",
	    success: function(data) {
	        update_chart(data);
	    }
	});
}

function update_chart(data) {
	var chart_data;
	var ctx = $('#chart').get(0).getContext('2d');
	if ($('#chart_type_all').is(':checked')) {
		if (typeof data.err != 'undefined') alert('Missing data');
		else {
			chart_data = {
				labels: labels,
				datasets: [{
					label: "Current Values",
					fillColor: "rgba(220,220,220,0.5)",
		            strokeColor: "rgba(220,220,220,0.8)",
		            highlightFill: "rgba(220,220,220,0.75)",
		            highlightStroke: "rgba(220,220,220,1)",
		            data: [data.ch0, data.ch1, data.ch2, data.ch3, data.ch4, data.ch5, data.ch6, data.ch7, data.ch8, data.ch9, data.ch10,
		            	data.ch11, data.ch12, data.ch13, data.ch14, data.ch15, data.ch16, data.ch17, data.ch18, data.ch20, data.ch21, 
		            	data.ch22, data.ch24, data.ch25, data.ch28, data.ch29, data.ch33, data.volt, data.tot_pwr, data.sol_pwr]
					}]
			};
			if (typeof chart !== 'undefined') {
				chart.destroy();
				chart = new Chart(ctx).Bar(chart_data, {});
			} else {
				chart = new Chart(ctx).Bar(chart_data, {});
			}	
		}
	} else {
		if (typeof data.err != 'undefined') alert('Missing data');
		else {
			switch ($('#time_select').val()) {
				case '1':
					alert("hola");
					chart_data = {
						labels: data.labels,
						datasets: [{
							label: "Current Values",
							fillColor: "rgba(220,220,220,0.5)",
				            strokeColor: "rgba(220,220,220,0.8)",
				            highlightFill: "rgba(220,220,220,0.75)",
				            highlightStroke: "rgba(220,220,220,1)",
				            data: data.vals
						}]
					};
					break;
				case 2:
				case 3:
				case 4:
				case 5:
				default:
			}
			if (typeof chart !== 'undefined') {
				chart.destroy();
				chart = new Chart(ctx).Line(chart_data, {});
			} else {
				chart = new Chart(ctx).Line(chart_data, {});
			}
		}
	}
	$('#tmp').html(data.err + ", " + data.timestamp + ", " + data.labels + ", " + data.vals);
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
	            request_default_chart();
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
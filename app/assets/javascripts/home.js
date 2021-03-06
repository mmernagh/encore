var chart;
var seenTimeRangeWarning = 0;
var labels = ["Bath Light", "Hall Light", "Main Room Lights", "Bedroom Outlets", "Daikin Hydrobox", "Outdoor Outlets", 
				"Disposal", "Main Room Outlets", "Air Handler", "Office Outlets", "Smoke Alarms",
				"JACE, Webbox, RIO", "Solar Thermal Hot Water", "ERV, Dining Light", "Washer", "Refrigerator", "Bath",  "Microwave", 
				"Kitchen Outlets W", "Veris", "Kitchen Outlets E", "Dishwasher", "Hot Water Tank", "Dryer", "Outdoor Daikin", "Oven", "Cooktop",
				"Voltage", "Total Power", "Solar Power"];
$( document ).ready(function() {
	request_default_chart();
});

function display_historical_options() {
	if ($('#chart_type_one').is(':checked')) {
		$('#hidden_options').show();
	} else {
		$('#hidden_options').hide();
		request_default_chart();
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
	alert_time_range();
}

function restrict_start_date() {
	if (new Date($('#date_start').val()) > new Date($('#date_end').val())) {
		$('#date_start').val($('#date_end').val());
	}
	if (new Date($('#date_end').val()) == new Date($('#date_start').val()) && 
		new Date('May 1, 2000' + $('#time_start').val()) > new Date('May 1, 2000' + $('#time_end').val())) {
		$('#time_start').val($('#time_end').val());
	}
	alert_time_range();
}

function alert_time_range() {
	if (new Date($('#date_end').val()) - new Date($('#date_start').val()) > 60 * 60 * 24  * 7 && seenTimeRangeWarning == 0) {
		alert("Plots of more than a week may not be representative, since data points are sampled, not averaged.");
		seenTimeRangeWarning = 1;
	}
}

function update_req_time(time) {
	var d = new Date(time);
	d.setHours((d.getHours() + d.getTimezoneOffset()/60) % 24);
	$('#up_time').html(d.toDateString().substring(0, 4) + d.toLocaleTimeString());
}

function request_default_chart() {
	$.ajax({
	    type: "POST",
	    url: "create.json",
		contentType: "application/json",
	    dataType: "json",
	    success: function(data) {
	        update_chart(data);
	    }
	});
}

function update_chart(data) {
	var chart_data;
	var ctx = $('#chart').get(0).getContext('2d');
	chart_data = {
		labels: labels,
		datasets: [{
			label: "Values",
			fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: []
			}]
	};
	if ($('#chart_type_all').is(':checked')) {
		if (typeof data.err != 'undefined') alert('Missing data');
		else {
			chart_data.datasets[0].data = [data.ch0, data.ch1, data.ch2, data.ch3, data.ch4, data.ch5, data.ch6, data.ch7, data.ch8, data.ch9, data.ch10,
		            	data.ch11, data.ch12, data.ch13, data.ch14, data.ch15, data.ch16, data.ch17, data.ch19, data.ch20, data.ch21, 
		            	data.ch23, data.ch24, data.ch25, data.ch28, data.ch29, data.ch32, data.volt, data.tot_pwr, data.sol_pwr];
			if (typeof chart !== 'undefined') {
				chart.destroy();
				chart = new Chart(ctx).Bar(chart_data, {});
			} else {
				chart = new Chart(ctx).Bar(chart_data, {});
			}
			$('#title').html('enCORE Present Values');
			update_req_time(data.timestamp);
		}
	} else {
		if (typeof data.err != 'undefined') alert('Missing data');
		else {
			chart_data.labels = data.labels;
			chart_data.datasets[0].data = data.vals;
			if (typeof chart !== 'undefined') {
				chart.destroy();
				chart = new Chart(ctx).Line(chart_data, {});
			} else {
				chart = new Chart(ctx).Line(chart_data, {});
			}
			$('#title').html('enCORE Historical Values');
			update_req_time(jQuery.now());
		}
	}
}

jQuery(function(){
    jQuery("input[type='radio'][name='chart_type']").each(function(index, button){
        jQuery(button).click(function(){
            display_historical_options();
        });
    });
    jQuery("label[type='radio'][name='chart_type']").each(function(index, button){
        jQuery(button).click(function(){
            display_historical_options();
        });
    });
    jQuery("select[name='time_select']").each(function(index, button){
        jQuery(button).focusout(function(){
            display_custom_times();
        });
        jQuery(button).click(function(){
            display_custom_times();
        });
    });
    jQuery("input[type='date'][name='date[start]']").each(function(index, button){
        jQuery(button).focusout(function(){
            restrict_end_date();
        });
    });
    jQuery("input[type='time'][name='time[start]']").each(function(index, button){
        jQuery(button).focusout(function(){
            restrict_end_date();
        });
    });
    jQuery("input[type='date'][name='date[end]']").each(function(index, button){
        jQuery(button).focusout(function(){
            restrict_start_date();
        });
    });
    jQuery("input[type='time'][name='time[end]']").each(function(index, button){
        jQuery(button).focusout(function(){
            restrict_start_date();
        });
    });
    jQuery("input[type='submit'][id='update']").each(function(index, button){
        jQuery(button).click(function(){
        	if ($('#chart_type_all').is(':checked')) {
	            request_default_chart();
	        }else if ($('#time_select').val() == 6) {
	        	$.ajax({
				    type: "POST",
				    url: "create/" + $('#resource_select').val().replace("/", "-") + "/" + $('#date_start').val() +  "%20" + $('#time_start').val()  + "/" +
				    	$('#date_end').val().replace("/", "-") +  "%20" + $('#time_end').val()  +".json",
				    contentType: "application/json",
				    dataType: "json",
				    success: function(data) {
				        update_chart(data);
				    }
				});
	        } else {
	        	$.ajax({
				    type: "POST",
				    url: "create/" + $('#resource_select').val() + "/" + $('#time_select').val() + ".json",
				    contentType: "application/json",
				    dataType: "json",
				    success: function(data) {
				        update_chart(data);
				    }
				});
	        }
        });
    });
    jQuery("button[type='button'][id='down']").each(function(index, button){
        jQuery(button).click(function(){
        	if ($('#chart_type_all').is(':checked')) {
	            var url = "down.csv"
	        } else if ($('#time_select').val() == 6) {
	        	var url = "down/" + $('#resource_select').val() + "/" + $('#date_start').val() +  "%20" + $('#time_start').val()  + "/" +
				    	$('#date_end').val() +  "%20" + $('#time_end').val() + ".csv";
	        } else {
	      		var url = "down/" + $('#resource_select').val() + "/" + $('#time_select').val() + ".csv";
	        }
	        $('#href').attr('href', url);
	        $('#href').click();
        });
    });
    if (!Modernizr.inputtypes.date) {
	    jQuery("input[type='date']").each(function(index, button){
	        // Give the button a certain click behaviour:
	        jQuery(button).datepicker({
	        	defaultDate: 0,
	        	maxDate: 0,
	        	// TODO: update this before production, remember that month is zero based
	        	minDate: new Date(2014, 11, 6)
	        });
	    });
	}
});
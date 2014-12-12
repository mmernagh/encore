class MainController < ApplicationController
  def home
  end
  def create
  	respond_to do |format|
        format.html
        if params.key?(:resource)
	        case params[:resource]
	        when "42"
	        	channel = "volt"
	        when "43"
	        	channel = "tot_pwr"
	        when "44"
	        	channel = "sol_pwr"
	        else
	        	channel = "ch" + params[:resource]
	        end
	    end
        if params.key?(:time)
	        case params[:time]
	        when "1"
	        	@data = getData(channel, 30, 60 * 2, Time.now, "%l:%M %p");
	        when "2"
	        	@data = getData(channel, 24, 60 * 60, Time.now, "%a, %l %p");
	        when "3"
	        	@data = getData(channel, 28, 60 * 60 * 6, Time.now, "%a, %l %p");
	        when "4"
	        	@data = getData(channel, 30, 60 * 60 * 24, Time.now, "%-m-%d");
	        when "5"
	        	@data = getData(channel, 24, 60 * 60 * 24 * 15, Time.now, "%-m-%-d-%Y");
	        end
	    elsif params.key?(:start_time)
	    	start = Time.parse(params[:start_time])
	    	stop = Time.parse(params[:end_time])
	    	nr_points = 30
	    	case stop - start
	    	when 0..30
	    		start = stop - 30
	    		time_str = "%H:%M:%S"
	    	when 31..1800
	    		# less than 30 min
	    		time_str = "%H:%M:%S"
	    	when 1801..18000
	    		# less than 5 hrs
	    		time_str = "%H:%M"
	    	when 18001..604800
	    		# less than a week
	    		time_str = "%a, %l %p"
	    	when 604801..7776000
	    		# less than 3 months
	    		time_str = "%-m-%-d"
	    	else
	    		time_str = "%-m-%-d-%Y"
	    	end
	    	@data = getData(channel, nr_points, (stop - start) / nr_points, stop, time_str);
	    else
	    	@data = Record.last
        	if (@data == nil) 
        		@data = {err: '1'}
        	end
        end
        format.json {
        	render :json => @data
        }
    end
  end

  def getData(res, num, step, stop, format)
  	labels = Array.new(num)
  	vals = Record.retrieve(res, num, step, stop.strftime("%Y-%m-%d %H:%M:%S"))
  	return {err: '1'} if vals == nil
  	for i in 0...num
  		time = stop - (num - i) * step
  		labels[i] = time.strftime format
  	end
  	Hash[[[:labels, labels], [:vals, vals]]]
  end

  private :getData
end
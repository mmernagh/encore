class MainController < ApplicationController
  def home
  end
  def create
  	respond_to do |format|
        format.html
        if params.key?(:time)
	        case params[:time]
	        when "1"
	        	@data = getData("ch" + params[:resource], 30, 60 * 2, Time.now);
	        end
	    elsif params.key?(:start_time)
	    else
	    	@data = getCurrentData;
        	if (@data == nil) 
        		@data = {err: '1'}
        	end
        end

        format.json {
        	render :json => @data
        }
=begin
        if params[:resource] == "1" 
	        format.json {
	            render :json => {'type' => 'l'}
	        }
	    else 
	    	format.json {
	            render :json => {'type' => "b"}
	        }
	    end
=end
    end
  end

  def getCurrentData
  	Record.last
  end

  def getData(res, num, step, stop)
  	labels = Array.new(num)
  	vals = Array.new(num)
  	for i in 0...num
  		time = stop - (num - i) * step
  		vals[i] = Record.retrieve(res, time.strftime("%Y-%m-%d %H:%M:%S"))
  		return {err: '1'} if vals[i] == nil
  		labels[i] = time.strftime "%H:%M"
  	end
  	Hash[[[:labels, labels], [:vals, vals]]]
  end

  private :getCurrentData, :getData
end

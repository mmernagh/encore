class MainController < ApplicationController
  def home
  end
  def create
  	respond_to do |format|
        format.html
        if params[:resource] == "1" 
	        format.json {
	            render :json => {'type' => 'l'}
	        }
	    else 
	    	format.json {
	            render :json => {'type' => "b"}
	        }
	    end
    end
  end
end

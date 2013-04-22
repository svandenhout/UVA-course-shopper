class CoursesController < ApplicationController
  def index	
  	@courses = Course.search(params[:query])
  end

  def show
  	@course = Course.find(params[:id])

  	respond_to do |format|
    	format.html  # show.html.erb
    	format.json  { render :json => @course }
  	end
  end
  
  def following_list
  	
  end
  
  def shopping_list
  	
  end
end
class CoursesController < ApplicationController
  def index	
  	@courses = Course.search(params[:query])
  	@coursees = Course.all
  end

  def show
  	@course = Course.find(params[:id])
  	
  	respond_to do |format|
    	format.html  # show.html.erb
    	format.json  { render :json => @course }
  	end
  end
end
class CoursesController < ApplicationController
  def index	
  	@courses = Course.search(params[:query])
  end

  def show
  end

  def new
  end

  def edit
  end
end
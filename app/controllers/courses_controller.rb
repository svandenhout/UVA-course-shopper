class CoursesController < ApplicationController
  def index
  	@courses = Course.search(params[:search])
  end

  def show
  end

  def new
  end

  def edit
  end
end

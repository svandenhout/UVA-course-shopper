class Course < ActiveRecord::Base
  attr_accessible :catalog_number, :description, :ects, :institute, :name, :participant_count, :programmes, :staff
end

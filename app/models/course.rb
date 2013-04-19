class Course < ActiveRecord::Base
  attr_accessible :course_id,
                  :catalog_number,
                  :description,
                  :ects,
                  :institute,
                  :name,
                  :participant_count,
                  :programmes,
                  :staff
	
	def self.search(search)
  	if search
  	  find(:all, :conditions => [
  	  	'name LIKE ? OR catalog_number LIKE ? OR staff LIKE ? OR description LIKE ?',
  	  	"%#{search}%", "%#{search}%", "%#{search}%", "%#{search}%"
  	  ])
  	else
  	  find(:all)
  	end
	end
end
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
    	where('name LIKE ?', "%#{search}%")
		else
		  find(:all)
		end
	end
	
end
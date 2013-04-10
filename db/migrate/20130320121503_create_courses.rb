class CreateCourses < ActiveRecord::Migration
  def change
    create_table :courses do |t|
      t.string :catalog_number
      t.string :name
      t.int :ects
      t.string :institute
      t.string :staff
      t.string :programmes
      t.string :description
      t.string :participant_count

      t.timestamps
    end
  end
end

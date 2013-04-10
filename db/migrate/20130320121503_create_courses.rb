class CreateCourses < ActiveRecord::Migration
  def change
    create_table :courses do |t|
      t.string :catalog_number
      t.string :name
      t.integer :ects
      t.string :institute
      t.text :staff
      t.string :programmes
      t.text :description
      t.integer :participant_count
    end
  end
end

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'nokogiri'

def parseXmlToDB(fileName)
  f = File.open(fileName)
  table = Hash.new
  doc = Nokogiri::XML(f)
  
  # geen xpath om xml te parsen dan.....
  doc.xpath('courses/course').each do |course|
    
    table['catalog_number'] = course.xpath('@sgid').text.strip
    table['description'] = course.xpath('description').text.strip
    table['ects'] = course.xpath('ects').text.strip
    table['institute'] = course.xpath('institute').text.strip
    table['name'] = course.xpath('name').text.strip
    table['participant_count'] = course.xpath('participant_count').text.strip
    table['programmes'] = course.xpath('programmes').text.strip
    table['staff'] = course.xpath('staff_list/staff/name').text.strip
    
    Course.create(table)
    
  end
  
  f.close
end

parseXmlToDB('db/courses.xml')


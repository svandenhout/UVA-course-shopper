require 'nokogiri'

def parseXml(fileName)
  f = File.open(fileName)
  table = Hash.new
  doc = Nokogiri::XML(f)
  
  # geen xpath om xml te parsen dan.....
  doc.xpath('courses/course').each do |course|
    table['course_id'] = course.xpath('@sgid').text.strip
    table['description'] = course.xpath('description').text.strip
    table['ects'] = course.xpath('ects').text.strip
    table['institute'] = course.xpath('institute').text.strip
    table['name'] = course.xpath('name').text.strip
    table['participant_count'] = course.xpath('participant_count').text.strip
    table['programmes'] = course.xpath('programmes').text.strip
    table['staff'] = course.xpath('staff_list/staff/name').text.strip
    puts table
  end
  
  
  f.close
end

parseXml("courses.xml")
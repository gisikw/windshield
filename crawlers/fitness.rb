require 'rest-client'
require 'fileutils'
require 'nokogiri'
require 'yaml'

DIARY_URL = 'http://www.myfitnesspal.com/reports/printable_diary/cheerskevin'
TD_ORDER = %w(calories carbs fat protein cholesterol sodium sugars fiber)
DATA_FILE =
  File.join(File.dirname(__FILE__), '..', 'archive', 'myFitnessPal', 'data.yml')

def get_entries(from, to)
  RestClient.post(DIARY_URL,
    from: from.to_s,
    show_food_diary: 1,
    to: to.to_s,
  )
end

def get_data(from, to)
  Nokogiri::HTML(get_entries(from, to))
    .css('table')
    .each_with_object([]) do |table, memo|
      memo.push(
        table
          .css('tfoot td')[1..-1]
          .map { |td| td.text.gsub(/[^\d]/, '').to_i }
          .each_with_object({})
          .with_index { |(n, data), i| data[TD_ORDER[i]] = n }
          .merge('name' => Date.parse(table.previous_element.text).to_s)
      )
    end.to_yaml
end

FileUtils.mkdir_p(File.dirname(DATA_FILE))
File.write(DATA_FILE, get_data(*ARGV))

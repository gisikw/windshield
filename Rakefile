require 'json'
require 'yaml'

FETCH_DATE_RANGE = 30
DISPLAY_DATE_RANGE = 15
DATA_DIR = File.join(File.dirname(__FILE__), 'archive')
OUTPUT_FILE = File.join(File.dirname(__FILE__), 'public', 'data.json')

def data_for(crawler)
  YAML::load_file(File.join(DATA_DIR, crawler, 'data.yml'))
end

task :aggregate do
  Rake::Task['crawlers:run:all'].invoke
  File.write(OUTPUT_FILE, {
    nutrition: data_for('myFitnessPal').last(DISPLAY_DATE_RANGE),
  }.to_json)
end

namespace :crawlers do
  namespace :run do
    desc "Run all crawlers"
    task :all do
      Rake::Task['crawlers:run:fitness'].invoke
    end

    desc "Fetch data from MyFitnessPal for the last 30 days"
    task :fitness do
      `ruby crawlers/fitness.rb #{Date.today - FETCH_DATE_RANGE} #{Date.today}`
    end
  end
end

task :default => :aggregate

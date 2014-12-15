class Record < ActiveRecord::Base
	def self.retrieve(channel, nr, step, time) 
        config   = Rails.configuration.database_configuration
        host     = config[Rails.env]["host"]
        database = config[Rails.env]["database"]
        username = config[Rails.env]["username"]
        password = config[Rails.env]["password"]
        client = Mysql2::Client.new(:host => host, :port => 8888, :username => username, :password => password, :database => database, :flags => Mysql2::Client::MULTI_STATEMENTS)
        client.query("set @col = '#{channel}'")
        client.query("set @nr = #{nr}")
        client.query("set @step = #{step}")
        client.query("set @time = '#{time}'")
        val = client.query("call get(@col, @nr, @step, @time)", :as => :array)
        val.to_a
	end
end

class Record < ActiveRecord::Base
	def self.retrieve(channel, time) 
		self.connection.execute("set @col = '" + channel + "'")
		self.connection.execute("set @time = '" + time +"'")
		self.connection.execute("call get_nearest(@col, @time, @val)")
		val = self.connection.execute("select @val")
		val.first[0]
	end
end

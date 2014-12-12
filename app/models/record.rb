class Record < ActiveRecord::Base
	def self.retrieve(channel, nr, step, time) 
		self.connection.execute("set @col = '#{channel}'")
		self.connection.execute("set @nr = #{nr}")
		self.connection.execute("set @step = #{step}")
		self.connection.execute("set @time = '#{time}'")
		val = self.connection.execute("call get(@col, @nr, @step, @time)")
		val.to_a
	end
end

class Record < ActiveRecord::Base
	@@labels = ["Hall Light", "Bath Light", "Bedroom Outlets", "Main Room Lights", "Outdoor Outlets", "Daikin Hydrobox", 
				"Main Room Outlets", "Disposal", "Office Outlets", "Air Handler", "JACE, Webbox, RIO", "Smoke Alarms",
				"ERV, Dining Light", "Solar Thermal Hot Water", "Refrigerator", "Washer", "Microwave", "Bath",  "Kitchen Outlets W", 
				"Kitchen Outlets E", "Veris", "Dishwasher", "Dryer", "Hot Water Tank", "Oven", "Outdoor Daikin", "Cooktop",
				"Voltage", "Total Power", "Solar Power"]
	def self.retrieve(channel, nr, step, time) 
		self.connection.execute("set @col = '#{channel}'")
		self.connection.execute("set @nr = #{nr}")
		self.connection.execute("set @step = #{step}")
		self.connection.execute("set @time = '#{time}'")
		val = self.connection.execute("call get(@col, @nr, @step, @time)")
		val.to_a
	end
end

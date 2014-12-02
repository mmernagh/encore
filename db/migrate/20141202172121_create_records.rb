class CreateRecords < ActiveRecord::Migration
  def change
    create_table :records do |t|
      t.integer :ch0
      t.integer :ch1
      t.integer :ch2
      t.integer :ch3
      t.integer :ch4
      t.integer :ch5
      t.integer :ch6
      t.integer :ch7
      t.integer :ch8
      t.integer :ch9
      t.integer :ch10
      t.integer :ch11
      t.integer :ch12
      t.integer :ch13
      t.integer :ch14
      t.integer :ch15
      t.integer :ch16
      t.integer :ch17
      t.integer :ch18
      t.integer :ch19
      t.integer :ch20
      t.integer :ch21
      t.integer :ch22
      t.integer :ch23
      t.integer :ch24
      t.integer :ch25
      t.integer :ch26
      t.integer :ch27
      t.integer :ch28
      t.integer :ch29
      t.integer :ch30
      t.integer :ch31
      t.integer :ch32
      t.integer :ch33
      t.integer :ch34
      t.integer :ch35
      t.integer :ch36
      t.integer :ch37
      t.integer :ch38
      t.integer :ch39
      t.integer :ch40
      t.integer :ch41
      t.integer :volt
      t.integer :tot_pwr
      t.integer :sol_pwr
      t.timestamp :timestamp
    end
  end
end

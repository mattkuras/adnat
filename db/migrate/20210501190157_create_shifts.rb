class CreateShifts < ActiveRecord::Migration[6.0]
  def change
    create_table :shifts do |t|
      t.belongs_to :organization
      t.belongs_to :user
      t.datetime :start_time
      t.datetime :end_time
      t.integer :break_length, array: true, default: []

      t.timestamps
    end
  end
end

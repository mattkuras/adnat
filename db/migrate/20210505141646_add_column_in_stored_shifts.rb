class AddColumnInStoredShifts < ActiveRecord::Migration[6.0]
  def change
    add_column :stored_shifts, :user_id, :integer, optional: true
  end
end

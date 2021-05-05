class EditColumnInStoredShifts < ActiveRecord::Migration[6.0]
  def change
    remove_column :stored_shifts, :user_id
  end
end

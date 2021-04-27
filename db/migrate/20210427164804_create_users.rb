class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.references :organization, :null => true, foreign_key: true
      t.string :name
      t.string :email_address
      t.string :password_digest

      t.timestamps
    end
  end
end

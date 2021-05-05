class User < ApplicationRecord
  has_secure_password
  has_many :shifts
  has_many :jobs
  has_many :organizations, through: :jobs

  validates :name, :email_address, :password, presence: true
  validates :email_address, uniqueness: true

  def generate_password_token!
    self.reset_password_token = generate_token
    self.reset_password_sent_at = Time.now.utc
    save!
   end
   
   def password_token_valid?
    (self.reset_password_sent_at + 4.hours) > Time.now.utc
   end
   
   def reset_password!(password)
    self.reset_password_token = nil
    self.password = password
    save!
   end
   
   private
   
   def generate_token
    SecureRandom.hex(10)
   end
end

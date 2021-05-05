class Organization < ApplicationRecord
    has_many :jobs
    has_many :users, through: :jobs
    has_many :shifts 

    validates :name, :hourly_rate, :description, presence: true
    validates :hourly_rate, format: { with: /\A\d+\z/, message: "Integer only" }

  
end

class Organization < ApplicationRecord
    has_many :jobs
    has_many :users, through: :jobs
    has_many :shifts 

    validates :name, :hourly_rate, :desciption, presence: true
end

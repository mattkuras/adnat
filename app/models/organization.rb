class Organization < ApplicationRecord
    has_many :users, through: :jobs
end

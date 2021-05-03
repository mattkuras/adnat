class OrganizationSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :hourly_rate
  has_many :shifts 
  byebug
end

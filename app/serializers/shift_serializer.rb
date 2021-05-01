class ShiftSerializer < ActiveModel::Serializer
  attributes :id, :start, :end, :break_length, :employee
  belongs_to :user

  def start
    object.start_time.strftime("%-l:%M%P") 
  end

  def employee
    object.user.name
  end


  def end
    object.end_time.strftime("%-l:%M%P") 
  end
end

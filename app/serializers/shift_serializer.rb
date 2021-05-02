class ShiftSerializer < ActiveModel::Serializer
  attributes :id, :start, :end, :employee, :hours_worked, :date, :shift_cost, :breaks
  belongs_to :user

  def start
    object.start_time.strftime("%-l:%M%P") 
  end

  def employee
    object.user.name
  end

  def date 
    object.end_time.strftime("%m/%d/%Y")

  end

  def end
    object.end_time.strftime("%-l:%M%P") 
  end

  def breaks 
    if object.break_length.length == 1 
      return  object.break_length.to_s
    else 
      x = ''
      object.break_length.map{|i| x << i.to_s + ', '}
      return x
    end
  end

end

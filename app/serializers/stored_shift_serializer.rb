class StoredShiftSerializer < ActiveModel::Serializer
  attributes :id, :start, :end, :hours_worked, :date, :shift_cost, :breaks, :overnight, :organization_id

  def start
    object.start_time.strftime("%-l:%M%P") 
  end



  def date 
    object.end_time.strftime("%m/%d/%Y")

  end

  def end
    object.end_time.strftime("%-l:%M%P") 
  end

  def breaks 
    if object.break_length.length == 1 
      return  object.break_length[0].to_s
    else 
      x = ''
      object.break_length.map{|i| x << i.to_s + ', ' }
       2.times {x.chop!}
       return x
    end
  end
end

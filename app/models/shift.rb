class Shift < ApplicationRecord
    belongs_to :user
    belongs_to :organization

    def start
        self.start_time.strftime("%-l:%M%P") 
    end

    def end
        self.end_time.strftime("%-l:%M%P") 
    end

    def hours_worked
        ((self.end_time - self.start_time) / 3600).to_i
    end
    
    def shift_cost 
        x = ((hours_worked - breaks_to_hours) * self.organization.hourly_rate)
        '%.2f' % x

    end

    def breaks_to_hours
        if break_length.count == 1
            x = break_length[0]/60.to_f
            x.round(2)
        else
            i = 0
            sum = 0 

            while i < break_length.length do 
                sum += break_length[i]
                i += 1
        end
            sum/60.to_f
        end
    end

    def set_breaks(string)
        clearn_up_sting_to_i = string.gsub(/\s+/, "").split(',').map{|i| i.to_i}
        self.break_length = clearn_up_sting_to_i
    end

    def breaks 
        if self.break_length.length == 1 
          return  self.break_length.to_s
        else 
          x = ''
          self.break_length.map{|i| x << i.to_s + ', ' }
           2.times {x.chop!}
           return x
        end
    end

end

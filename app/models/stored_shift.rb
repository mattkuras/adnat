class StoredShift < ApplicationRecord
    belongs_to :organization
    
    belongs_to :organization

    validates :start_time, :end_time, :break_length, :organization_id, :user_id, presence: true


    def hours_worked
        x = ((self.end_time - self.start_time) / 3600)
        x > 0 ? x.round(2) : (24 + x).round(2)
    end
    
    def shift_cost 
        new_end_time = end_time - breaks_to_hours.hours
        sun_hours = sunday_hours(new_end_time)
        hours = ((new_end_time - self.start_time) / 3600)
        hours >= 0 ? x = hours.to_f : x = (24 + hours).to_f
        not_sunday_hours = x - sun_hours
        x = (not_sunday_hours * organization.hourly_rate) + (sun_hours * 2 * organization.hourly_rate)
        '%.2f' % x
    end

    def overnight
        start_time.hour > end_time.hour ? 'yes' : 'no'
    end

    def set_time_and_breaks(date, s_time, start, e_time, string)
        set_date(date, s_time, start)
        set_date(date, e_time)
        if overnight == 'yes'
            self.end_time = end_time + 1.day 
        end
        set_breaks(string)
        self
    end

    def store 
        shift = {organization_id: organization_id, user_id: nil, start_time: start_time, end_time: end_time, break_length: break_length}
        StoredShift.new(shift)
    end

    def pickup(u_id)
        shift = {organization_id: organization_id, user_id: u_id, start_time: start_time, end_time: end_time, break_length: break_length}
        Shift.new(shift)
    end


    private 


    def sunday_hours(e_time)
        total_time = e_time.strftime("%H:%M")
        hours = (total_time.split(':')[0].to_i)
        mins = (total_time.split(':')[1].to_i)
        if start_time.sunday? == false && e_time.sunday? == false 
            0
        elsif start_time.sunday? == true && e_time.sunday? == false 
            ((hours * 60) + mins) / 60.0
        elsif start_time.sunday? == false && e_time.sunday? == true 
            ((hours * 60) + mins) / 60.0
        elsif start_time.sunday? == true && e_time.sunday? == true 
            x = ((e_time - self.start_time) / 3600).to_i
            x > 0 ? x.to_f : (24 + x).to_f
        end    
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

    def set_date(date, time, start_or_end = nil)
        if date.include?('/') 
            data = date.split('/').map{|e| e.to_i}
            date = []
            date.push(data[2], data[0], data[1])
            time = time.split(':').map{|e| e.to_i}
        else 
            date = date.split(',').map{|e| e.to_i} 
            time = time.split(',').map{|e| e.to_i}
        end
            x = DateTime.new(date[0], date[1], date[2], time[0], time[1])
        start_or_end == 'start' ? self.start_time = x : self.end_time = x  
    end

   
end

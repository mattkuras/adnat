class Shift < ApplicationRecord
    belongs_to :user
    belongs_to :organization

    def start
        self.start_time.strftime("%-l:%M%P") 
    end

    def end
        self.end_time.strftime("%-l:%M%P") 
    end

end

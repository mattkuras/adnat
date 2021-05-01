class ShiftsController < ApplicationController
  def create
    shift = Shift.new(shift_params)
    shift.break_length << shift_params[:break_length].to_i
    if shift.save 
      render json: {shift: shift}
    else 
      render json: {error: 'shift couldnt be created'}
    end
  end

  def index
  end

  def update
  end

  def destroy
  end

  private 

  def shift_params
    params.require(:shift).permit(
      :organization_id,
      :user_id, 
      :start_time,
      :end_time,
      :break_length
    )
  end

end

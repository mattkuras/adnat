class ShiftsController < ApplicationController
  def create
    byebug
    shift = Shift.new(shift_params)
    shift.set_breaks(shift_params[:break_length])
    if shift.save 
      render json: {shift: shift, success: 'ok'}
    else 
      render json: {error: 'shift couldnt be created'}
    end
  end

  def index
    shifts = Shift.all 
    render json: shifts
  end

  def update
    shift = Shift.find_by(id: shift_params[:id])
    shift.update(shift_params)
    if shift.save 
        render json: {success: 'ok', shift: shift}
    else
        render json: {error: 'there was an error updating this shift'}
    end
  end

  def destroy
    shift = Shift.find_by(id: params[:id])
    if shift.destroy 
        render json: {success: 'ok', message: ''}
    else
        render json: {error: 'there was an error destroying this shift'}
    end
  end

  private 

  def shift_params
    params.require(:shift).permit(
      :organization_id,
      :user_id, 
      :start_time,
      :end_time,
      :break_length,
      :id
    )
  end

end

class ShiftsController < ApplicationController
  before_action :require_user_login

  def create
    shift = Shift.new(shift_params)
    shift.set_time_and_breaks( params[:date][:shift_date], shift_params[:start_time], 'start', shift_params[:end_time], shift_params[:break_length])
    if shift.save 
      org = OrganizationSerializer.new(shift.organization)
      render json: {org: org , success: 'ok', shift: shift}
    else 
      render json: {error: 'shift couldnt be created'}
    end
  end

  def index
    shifts = Shift.all 
    render json: shifts
  end

  # def update
  #   shift = Shift.find_by(id: shift_params[:id])
  #   shift.update(shift_params)
  #   byebug
  #   shift.set_time_and_breaks( params[:date][:shift_date], shift_params[:start_time], 'start', shift_params[:end_time], shift_params[:break_length])
    
  #       org = OrganizationSerializer.new(shift.organization)
  #   render json: {success: 'ok', org: org}
  #   else
  #       render json: {error: 'there was an error updating this shift'}
  #   end
  # end

  def destroy
    shift = Shift.find_by(id: params[:id])
    if shift.destroy 
        render json: {success: 'ok', message: ''}
    else
        render json: {error: 'there was an error destroying this shift'}
    end
  end

  def store
    shift = Shift.find_by(id: shift_params[:id])
    stored_shift = shift.store
    if stored_shift.save && shift.destroy
      org = OrganizationSerializer.new(stored_shift.organization)

      render json: {success: 'ok', stored_shift: stored_shift, org: org}
    else 
      render json: {error: stored_shift.errors}
    end
  end

  def open_shifts 
    shifts = StoredShift.all
      open_shifts = shifts.map{|s| StoredShiftSerializer.new(s)} 
      render json: {success: 'ok', shifts: open_shifts}
  end

  def pickup
    shift = Shift.find_by(id: shift_params[:id])
    # shift = StoredShift.all.where(id: shift_params[:id]).first
    byebug
    pickedup_shift = shift.pickup(shift_params[:user_id])
    if pickedup_shift.save
      render json: {success: 'ok', shifts: open_shifts}
    else 
      render json: {error: pickedup_shift.errors}
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

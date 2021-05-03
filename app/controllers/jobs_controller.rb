class JobsController < ApplicationController
  before_action :require_user_login

    def create
        job = Job.new(job_params)
        if job.save 
            render json: {success: 'joined', org: job.organization }
        else
            render json: {error: 'there was an error joining this organization'}
        end
    end

    def leave
         job = Job.where(user_id: job_params[:user_id]).where(organization_id: job_params[:organization_id]).first
         id = job.organization_id
         if job.destroy
            render json: {success: 'left', id: id}
         else
            render json: {error: 'there was an error leaving and deleting the Job'}
         end
    end

    private

    def job_params
        params.require(:job).permit(:organization_id, :user_id)
    end

end 
class JobsController < ApplicationController
    def create
        job = Job.new(job_params)
        if job.save 
            render json: {success: job}
        else
            render json: {error: 'there was an error joining this organization'}
        end
    end

    private

    def job_params
        params.require(:job).permit(:organization_id, :user_id)
    end

end 
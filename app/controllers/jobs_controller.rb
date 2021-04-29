class JobsController < ApplicationController
    def create
        job = Job.new(job_params)
        if job.save 
            render json: {job: job}
        else
            render json: {error: 'there was an error signing up for this organization'}
        end
    end

    private

    def job_params
        params.require(:job).permit(:organization_id, :user_id)
    end

end 
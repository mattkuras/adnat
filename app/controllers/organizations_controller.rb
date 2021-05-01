class OrganizationsController < ApplicationController

    def index 
        organizations = Organization.all 
        render json: organizations.to_json(include: [:shifts])
    end
    
    def create
        organization = Organization.new(organization_params)
        if organization.save 
            render json: {organization: organization}
        else
            render json: {error: 'there was an error creating this org'}
        end
    end

    def update
        org = Organization.find_by(id: organization_params[:id])
        org.update(organization_params)
        if org.save 
            render json: {success: 'ok', organization: org}
        else
            render json: {error: 'there was an error updating this org'}
        end
    end

    def destroy
        org = Organization.find_by(id: params[:id])
        if org.jobs.destroy_all && org.destroy 
            render json: {success: 'ok', message: ''}
        else
            render json: {error: 'there was an error destroying this org'}
        end
    end

    private

    def organization_params
        params.require(:organization).permit(:name, :description, :hourly_rate, :id)
    end

end 
class OrganizationsController < ApplicationController
  before_action :require_user_login


    def index 
        # get orgs
        organizations = Organization.all 
        organizations = organizations.map{|o| OrganizationSerializer.new(o)} 
        # get shifts
        shifts = StoredShift.all
        stored_shifts = shifts.map{|s| StoredShiftSerializer.new(s)} 
        
        render json: {organizations: organizations, stored_shifts: stored_shifts }
    end
    
    def create
        organization = Organization.new(organization_params)
        if organization.save 
            render json: {success: 'success', organization: organization}
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
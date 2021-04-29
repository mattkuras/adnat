class OrganizationsController < ApplicationController
    def create
        organization = Organization.new(organization_params)
        if organization.save 
            render json: {organization: organization}
        else
            render json: {error: 'there was an error creating this org'}
        end
    end

    private

    def organization_params
        params.require(:organization).permit(:name, :description, :hourly_rate)
    end

end 
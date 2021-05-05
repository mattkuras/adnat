class UsersController < ApplicationController
    # before_action :require_user_login, except: [:show, :update]
    before_action :require_user_login, except: [:create]
  
    def index
      users = User.all
      render json: users
    end
  
    def show
      user = User.find(params[:id])
      render json: user
    end
  
    def create
      user = User.new(user_params)
        if user_params[:password] === user_params[:password_confirmation] && user.save 
          render json: {success: 'ok', user: user, user_orgs: user.organizations}
      else
        render json: { errors: user.errors }
      end
    end
  
    def destroy
      user = User.find(params[:id])
      if user.destroy
        render json: { success: "user has been deleted" }
      else
        render json: { error: user.error }
      end
    end
  
    def update
      user = User.find_by(email: params[:user][:email])
      if params[:user][:password] == params[:user][:confirm_password]
        user.update(password: params[:user][:password])
        if user.save 
          render json: {success: 'your password has been updated'}
        else 
          render json: {failure: 'there was an error updating your password'}
        end
      else
        render json: {failure: 'passwords dont match. please try again'}
      end
    end
  
    private
  
    def user_params
      params.require(:user).permit(
        :name,
        :email_address,
        :password,
        :password_confirmation
      )
    end
  end
  
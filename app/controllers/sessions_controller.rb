class SessionsController < ApplicationController
    def auto_login

      if user = session_user
        render json: {success: 'ok', user: user, user_orgs: user.organizations}
      else
        render json: { errors: "no admin logged in" }
      end
    end
  
    def login
      user = User.find_by(email_address: params[:user][:email_address])
      if user&.authenticate(params[:user][:password])
        payload = { user_id: user.id }
        token = encode_token(payload)
        # render json: {user: user.to_json(include: [:organizations]), jwt: token, success: "hey dude" }
        render json: {user: user, user_orgs: user.organizations, jwt: token, success: "hey dude" }
      else
        render json: { failure: "there was an error logging in. check your email and password" }
      end
    end
  
  end
  
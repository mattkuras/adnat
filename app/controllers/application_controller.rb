class ApplicationController < ActionController::Base

    TOKEN_SECRET_KEY = 'adnatlogintoken'

    skip_before_action :verify_authenticity_token
      
  
      def user_logged_in?
        !!session_user
      end
      
  
      def require_user_login
        render json: {message: 'please login'}, status: :unauthorized unless user_logged_in?
      end
    
  
      def encode_token(payload)
        JWT.encode(payload, TOKEN_SECRET_KEY)
      end
       
      def session_user
        decoded_hash = decoded_token
        if decoded_hash
          id = decoded_hash[0]['user_id']
          @user = User.find_by(id: id) 
        else
          nil
        end
      end
     
  
      def auth_header 
        request.headers['Authorization']
      end
  
      def decoded_token
        if auth_header
          token = auth_header.split(' ')[1]
          begin 
            JWT.decode(token, TOKEN_SECRET_KEY, true, algorithm: 'HS256')
          rescue JWT::DecodeError
            []
          end
        end
      end 
  
  end
  
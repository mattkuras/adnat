class PasswordsController < ApplicationController
    def forgot
        if params[:email_address].blank? 
            
          return render json: {error: 'Email not present'}
        end
        user = User.find_by(email_address: params[:email_address]) # if present find user by email

        if user
          user.generate_password_token! #generate pass token
          render json: {message: 'An email has been sent', status: 'ok'}
          # PasswordMailer.send_password_reset_email(user).deliver_now
        else
          render json: {error: 'Email address not found. Please check and try again.'}
        end
      end
    
      def reset
        @user = User.find_by(reset_password_token: params[:id])
        if @user.reset_password_sent_at < 2.hour.ago
          flash[:notice] = 'Password reset has expired'
          redirect_to new_password_reset_path
        elsif @user.update(user_params)
          flash[:notice] = 'Password has been reset!'
          redirect_to '/'
        else
          render :edit
        end
      end



      def page 
        @user = User.find_by(reset_password_token: (params[:id]))
      end

private
      def user_params
        params.require(:user).permit(:password)
      end

end 